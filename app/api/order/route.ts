import { NextRequest, NextResponse } from "next/server";
import { adminDb } from "@/lib/firebase/admin";
import { FieldValue } from "firebase-admin/firestore";
import { generateID } from "@/helpers/generate_id";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/auth";
import { OrderData } from "@/types/order-data";
import { validateProductsAndStock } from "@/lib/firebase/service/validate_product_and_stock";
import { validateOrderData } from "@/helpers/validate_order_data";
import { sanitizeOrderData } from "@/helpers/sanitaze_order_data";
import { validateTotalAmount } from "@/helpers/validate_total_amount";

export async function POST(req: NextRequest) {
   try {
      const session = await getServerSession(authOptions);

      if (!session) {
         return NextResponse.json(
            {
               success: false,
               message: "Authentication required to perform this action",
            },
            { status: 401 }
         );
      }

      const rawData = await req.json();
      const requestData = sanitizeOrderData(rawData);

      const validation = validateOrderData(requestData);

      if (!validation.isValid) {
         return NextResponse.json(
            { success: false, message: validation.error },
            { status: 400 }
         );
      }

      const {
         userId,
         totalAmount,
         status,
         shippingAddress,
         paymentMethod,
         paymentStatus,
         items,
      }: OrderData = requestData;

      if (!validateTotalAmount(items, totalAmount)) {
         return NextResponse.json(
            {
               success: false,
               message: "Total amount does not match item calculations",
            },
            { status: 400 }
         );
      }

      const stockValidation = await validateProductsAndStock(items);
      if (!stockValidation.isValid) {
         return NextResponse.json(
            { success: false, message: stockValidation.error },
            { status: 400 }
         );
      }

      const orderId = generateID(`order_${userId}_${Date.now()}`);
      const orderRef = adminDb.collection("orders").doc(orderId);
      const timestamp = new Date().toISOString();

      const orderData = {
         userId,
         totalAmount,
         status,
         shippingAddress,
         paymentMethod,
         paymentStatus,
         itemCount: items.length,
         totalQuantity: items.reduce((sum, item) => sum + item.quantity, 0),
         createdAt: timestamp,
         updatedAt: timestamp,
      };

      const batch = adminDb.batch();

      batch.set(orderRef, orderData);

      items.forEach((item, index) => {
         const orderItemId = generateID(
            `${orderId}-${item.productId}-${index}`
         );

         const orderItemRef = adminDb
            .collection("order_items")
            .doc(orderItemId);

         batch.set(orderItemRef, {
            orderId,
            productId: item.productId,
            name: item.name,
            quantity: item.quantity,
            price: item.price,
            subtotal: item.price * item.quantity,
            createdAt: timestamp,
         });

         const productRef = adminDb.collection("products").doc(item.productId);
         batch.update(productRef, {
            stock: FieldValue.increment(-item.quantity),
            sold: FieldValue.increment(item.quantity),
            updatedAt: timestamp,
         });
      });

      await batch.commit();

      return NextResponse.json(
         {
            success: true,
            message: "Order created successfully",
         },
         { status: 200 }
      );
   } catch (err) {
      return NextResponse.json(
         {
            success: false,
            message: "Internal server error: Unable to process your request",
         },
         { status: 500 }
      );
   }
}
