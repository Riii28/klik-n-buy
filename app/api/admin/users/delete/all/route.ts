import { adminDb, adminAuth } from "@/lib/firebase/admin";
import { NextResponse, NextRequest } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/auth";

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

      const userRef = adminDb.collection("users");
      const userSnap = await userRef.get();

      if (userSnap.empty) {
         return NextResponse.json(
            {
               success: false,
               message: "No users found to delete.",
            },
            { status: 404 }
         );
      }
      const batch = adminDb.batch();
      const deletePromises: Promise<any>[] = [];
      const deleteCount = userSnap.size;

      userSnap.docs.forEach((doc) => {
         const data = doc.data();
         if (data.role !== "Admin" && data.uid) {
            batch.delete(doc.ref);
            deletePromises.push(adminAuth.deleteUser(data.uid));
         }
      });

      await Promise.all(deletePromises);
      await batch.commit();

      return NextResponse.json(
         {
            success: true,
            message: "All users successfully deleted.",
            data: {
               count: deleteCount,
            },
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
