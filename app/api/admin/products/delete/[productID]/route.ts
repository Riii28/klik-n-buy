import { authOptions } from "@/auth";
import { adminDb } from "@/lib/firebase/admin";
import { getServerSession } from "next-auth/next";
import { NextResponse, NextRequest } from "next/server";

export async function DELETE(
   request: NextRequest,
   { params }: { params: Promise<{ productID: string }> }
) { 
   try {
      const session = await getServerSession(authOptions);

      if (!session) {
         return NextResponse.json(
            { 
               success: false,
               message: "Sign In required to perform this action."
            },
            { status: 401 }
         );
      }

      const { productID } = await params;

      if (!productID) {
         return NextResponse.json(
            {
               success: false,
               message: "Product ID is required for deletion."
            },
            { status: 400 }
         );
      }

      const productRef = adminDb.collection("products").doc(productID);
      const productSnap = await productRef.get();

      if (!productSnap.exists) {
         return NextResponse.json(
            {
               success: false,
               message: "Product not found. It may have already been deleted."
            },
            { status: 404 }
         );
      }

      await productRef.delete();

      return NextResponse.json(
         {
            success: true,
            message: "Product successfully deleted."
         },
         { status: 200 }
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