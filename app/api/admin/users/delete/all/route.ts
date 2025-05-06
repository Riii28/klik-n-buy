import { adminDb, adminAuth } from "@/lib/firebase/admin";
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
            { status: 401 }
         );
      }

      if (session.user.role !== "Admin") {
         return NextResponse.json(
            {
               success: false,
               message: "Access denied",
            },
            { status: 403 }
         );
      }

      const userRef = adminDb.collection("users");
      const userSnap = await userRef.get();

      if (userSnap.empty) {
         return NextResponse.json(
            {
               success: false,
               message: "Users not found",
            },
            { status: 404 }
         );
      }

      const batch = adminDb.batch();
      const deletePromises: Promise<any>[] = [];

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
            message: "Success",
         },
         { status: 200 }
      );
   } catch (err) {
      console.error(err);
      return NextResponse.json(
         {
            success: false,
            message: "Internal server error",
         },
         { status: 500 }
      );
   }
}
