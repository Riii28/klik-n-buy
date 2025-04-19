import { authOptions } from "@/auth";
import { adminDb } from "@/lib/firebase/admin";
import { getServerSession } from "next-auth/next";
import { NextResponse } from "next/server";

export async function GET() {
   try {
      const snapshot = await adminDb.collection("users").get();
      const users = snapshot.docs.map((doc) => ({
         id: doc.id,
         ...doc.data(),
      }));

      return NextResponse.json(
         {
            success: true,
            message: "Success get all users",
            data: users,
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
