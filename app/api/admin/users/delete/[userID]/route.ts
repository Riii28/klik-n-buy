import { NextRequest, NextResponse } from "next/server";
import { adminAuth, adminDb } from "@/lib/firebase/admin";
import { getServerSession } from "next-auth/next";
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
               message: "Sign In required to perform this action.",
            },
            { status: 401 }
         );
      }

      const { userID } = await params;

      if (!userID) {
         return NextResponse.json(
            {
               success: false,
               message: "User ID is missing.",
            },
            { status: 404 }
         );
      }

      const userRef = adminDb.collection("users").doc(userID);
      const userSnap = await userRef.get();

      if (!userSnap.exists) {
         return NextResponse.json(
            {
               success: false,
               message: "User not found.",
            },
            { status: 404 }
         );
      }

      if (userSnap.data()?.role === "Admin") {
         return NextResponse.json(
            {
               success: false,
               message: "Cannot delete a user with Admin role.",
            },
            { status: 403 }
         );
      }

      await userRef.delete();
      await adminAuth.deleteUser(userID).catch(() => null);

      return NextResponse.json(
         {
            success: true,
            message: "User deleted successfully",
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
