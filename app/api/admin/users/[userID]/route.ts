import { authOptions } from "@/auth";
import { adminDb } from "@/lib/firebase/admin";
import { getServerSession } from "next-auth/next";
import { cookies } from "next/headers";
import { NextResponse, NextRequest } from "next/server";

export async function GET(
   request: NextRequest,
   { params }: { params: Promise<{ userID: string }> }
) {
   try {
      const { userID } = await params;

      if (!userID) {
         return NextResponse.json(
            {
               success: false,
               message: "Pengguna tidak ditemukan",
            },
            { status: 404, statusText: "Not Found" }
         );
      }

      const userRef = await adminDb.collection("users").doc(userID).get();

      if (!userRef.exists) {
         return NextResponse.json(
            {
               success: false,
               message: "Pengguna tidak ditemukan",
            },
            { status: 404, statusText: "Not Found" }
         );
      }

      return NextResponse.json(
         {
            success: true,
            message: "Berhasil mengambil data pengguna",
            data: {
               id: userRef.id,
               ...userRef.data(),
            },
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
