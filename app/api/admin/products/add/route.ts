import { NextResponse, NextRequest } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/auth";
import { productSchema } from "@/lib/zod/validation";
import { adminDb } from "@/lib/firebase/admin";
import { generateID } from "@/helpers/generate_id";

export async function POST(request: NextRequest) {
   try {
      const session = await getServerSession(authOptions);

      if (!session) {
         return NextResponse.json(
            {
               success: false,
               message: "Unauthorized access",
            },
            { status: 401 }
         );
      }

      // if (session.user.role !== "Admin") {
      //    return NextResponse.json(
      //       {
      //          success: false,
      //          message: "Access denied",
      //       },
      //       { status: 403, statusText: 'Access Denied' }
      //    );
      // }

      const body = await request.json();
      const bodyParsed = productSchema.safeParse(body);

      if (!bodyParsed.success) {
         return NextResponse.json(
            {
               success: false,
               message: "",
            },
            { status: 403 }
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
            id: hashedId,
            isAvaible: false,
            createdAt,
            updatedAt: createdAt,
         };

         await productRef.set(newProduct);

         return NextResponse.json(
            {
               success: true,
               message: "Berhasil menambah",
            },
            { status: 200 }
         );
      }
   } catch (err) {
      return NextResponse.json(
         {
            sucess: false,
            mesasge: "Internal server error",
         },
         { status: 500 }
      );
   }
}
