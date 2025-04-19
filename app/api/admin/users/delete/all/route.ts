import { adminDb } from "@/lib/firebase/admin";
import { revalidateTag } from "next/cache";
import { NextResponse, NextRequest } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/auth";

export async function DELETE(request: NextRequest) {
   try {
      const session = await getServerSession(authOptions);
      if (!session) {
         return NextResponse.json(
            {
               success: false,
               message: "Unauthorized access",
            },
            { status: 401, statusText: "Unauthorized" }
         );
      }

      if (session.user.role !== "Admin") {
         return NextResponse.json(
            {
               success: false,
               message: "Access denied",
            },
            { status: 403, statusText: "Forbidden" }
         );
      }

      const userRef = adminDb.collection("users");
      const userSnap = await userRef.get();

      if (userSnap.empty) {
         return NextResponse.json(
            {
               success: false,
               message: "Tidak ada data di koleksi",
            },
            { status: 404, statusText: "Not Found" }
         );
      }

      const batch = adminDb.batch();

      userSnap.docs.forEach((doc) => {
         const data = doc.data();
         if (data.role !== "Admin") {
            batch.delete(doc.ref);
         }
      });

      await batch.commit();
      revalidateTag("user_table");

      return NextResponse.json(
         {
            success: true,
            message: "Berhasil menghapus semua user non-admin",
         },
         { status: 200, statusText: "OK" }
      );
   } catch (err) {
      return NextResponse.json(
         {
            sucess: false,
            mesasge: "Internal server error",
         },
         { status: 500, statusText: "Internal Server Error" }
      );
   }
}
