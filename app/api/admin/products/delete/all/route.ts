import { authOptions } from "@/auth";
import { adminDb } from "@/lib/firebase/admin";
import { getServerSession } from "next-auth/next";
import { NextResponse, NextRequest } from "next/server";

export async function DELETE(request: NextRequest) {
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

      const productRef = adminDb.collection("products");
      const productSnap = await productRef.get();

      if (productSnap.empty) {
         return NextResponse.json(
            {
               success: false,
               message: "No products found to delete.",
            },
            { status: 404 }
         );
      }

      const batch = adminDb.batch();
      const deleteCount = productSnap.size;

      productSnap.docs.forEach((doc) => {
         batch.delete(doc.ref);
      });

      await batch.commit();

      return NextResponse.json(
         {
            success: true,
            message: "All products successfully deleted.",
            data: {
               count: deleteCount
            }
         },
         { status: 200 }
      );
   } catch (err) {
      return NextResponse.json(
         {
            success: false,
            message: "Internal server error occurred while attempting to delete products.",
         },
         { status: 500 }
      );
   }
}