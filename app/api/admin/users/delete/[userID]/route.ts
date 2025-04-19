import { NextRequest, NextResponse } from "next/server";
import { adminAuth, adminDb } from "@/lib/firebase/admin";
import { revalidateTag } from "next/cache";
import { getServerSession } from "next-auth";
import { authOptions } from "@/auth";

export async function DELETE(
   request: NextRequest,
   { params }: { params: Promise<{ userID: string }> }
) {
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

      const { userID } = await params;

      if (!userID) {
         return NextResponse.json(
            {
               success: false,
               message: "User ID not found",
            },
            { status: 404, statusText: "Not Found" }
         );
      }

      const userRef = adminDb.collection("users").doc(userID);
      const userSnap = await userRef.get();

      if (!userSnap.exists) {
         return NextResponse.json(
            {
               success: false,
               message: "User not found",
            },
            { status: 404, statusText: "Not Found" }
         );
      }

      await userRef.delete();
      await adminAuth.deleteUser(userID).catch(() => null);

      revalidateTag("user_table");

      return NextResponse.json(
         {
            success: true,
            message: "User deleted successfully",
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
