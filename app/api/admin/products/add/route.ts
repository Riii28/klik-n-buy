import { NextResponse, NextRequest } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/auth";
import { productSchema } from "@/lib/zod/validation";
import { adminDb } from "@/lib/firebase/admin";
import { generateID } from "@/helpers/generate_id";

export async function POST(request: NextRequest) {
   try {
      const session = await getServerSession(authOptions);

      if (!session || session.user.role !== "Admin") {
         return NextResponse.json(
            {
               success: false,
               message: "Unauthorized: Admin access required.",
            },
            { status: 401 }
         );
      }

      const body = await request.json();
      const bodyParsed = productSchema.safeParse(body);

      if (!bodyParsed.success) {
         return NextResponse.json(
            {
               success: false,
               message: "Validation failed: Please check your product data.",
               errors: bodyParsed.error.errors,
            },
            { status: 400 }
         );
      }

      const product = bodyParsed.data;
      const hashedId = generateID(product.name);
      const productRef = adminDb.collection("products").doc(hashedId);
      const productDoc = await productRef.get();

      if (!productDoc.exists) {
         const createdAt = new Date().toISOString();
         const newProduct = {
            ...product,
            stock: Number(product.stock),
            price: Number(product.price),
            id: hashedId,
            createdAt,
            updatedAt: createdAt,
         };

         await productRef.set(newProduct);

         return NextResponse.json(
            {
               success: true,
               message: "Product created successfully.",
               data: { id: hashedId },
            },
            { status: 201 }
         );
      }
      
      return NextResponse.json(
         {
            success: false,
            message: "Product with this name already exists.",
         },
         { status: 409 }
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
