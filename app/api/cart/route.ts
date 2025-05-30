import { authOptions } from "@/auth";
import { generateID } from "@/helpers/generate_id";
import { adminDb } from "@/lib/firebase/admin";
import { validateProductsAndStock } from "@/lib/firebase/service/validate_product_and_stock";
import { OrderItem } from "@/types/order-item";
import { getServerSession } from "next-auth/next";
import { NextResponse, NextRequest } from "next/server";

export async function POST(request: NextRequest) {
   try {
      const session = await getServerSession(authOptions);

      if (!session) {
         return NextResponse.json(
            {
               success: false,
               message: "Sign In required to perform this action.",
            },
            { status: 401 }
         );
      }

      const { productId, cartId, quantity, action } = await request.json();

      if (!cartId || !productId) {
         return NextResponse.json(
            { success: false, message: "Missing cartId or productId." },
            { status: 400 }
         );
      }

      const parsedQty = quantity !== undefined ? parseInt(quantity, 10) : 1;
      if (isNaN(parsedQty) || parsedQty <= 0) {
         return NextResponse.json(
            { success: false, message: "Quantity must be at least 1." },
            { status: 400 }
         );
      }

      const cartDoc = await adminDb.collection("carts").doc(cartId).get();
      if (!cartDoc.exists) {
         return NextResponse.json(
            { success: false, message: "Cart not found." },
            { status: 404 }
         );
      }

      const cartItemId = generateID(`${cartId}-${productId}`);
      const cartItemRef = adminDb.collection("cart_items").doc(cartItemId);
      const cartItemDoc = await cartItemRef.get();

      const cartItemData = {
         id: cartDoc.id,
         productId,
         quantity: parsedQty,
         ...cartItemDoc.data(),
      } as OrderItem;

      const stockValidation = await validateProductsAndStock([cartItemData]);
      if (!stockValidation.isValid) {
         return NextResponse.json(
            { success: false, message: stockValidation.error },
            { status: 400 }
         );
      }

      const timestamp = new Date().toISOString();

      if (cartItemDoc.exists) {
         const currentQty = cartItemDoc.data()?.quantity || 0;
         const updatedQty =
            action === "add" ? currentQty + parsedQty : parsedQty;

         await cartItemRef.update({
            quantity: updatedQty,
            updatedAt: timestamp,
         });
      } else {
         await cartItemRef.set({
            cartId,
            productId,
            quantity: parsedQty,
            createdAt: timestamp,
            updatedAt: timestamp,
         });
      }

      return NextResponse.json(
         { success: true, message: "Cart updated successfully." },
         { status: 201 }
      );
   } catch (err) {
      return NextResponse.json(
         {
            success: false,
            message: "Internal server error: Unable to process your request.",
         },
         { status: 500 }
      );
   }
}
