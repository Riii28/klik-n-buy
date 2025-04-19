import { NextResponse, NextRequest } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/auth";
import { productSchema } from "@/lib/zod/validation";
import { adminDb } from "@/lib/firebase/admin";

export async function POST(request: NextRequest) {
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

      const body = await request.json();
      const bodyParsed = productSchema.safeParse(body);

      if (!bodyParsed.success) {
         return NextResponse.json(
            {
               success: false,
               message: "",
            },
            { status: 403, statusText: "Forbidden" }
         );
      }

      const product = bodyParsed.data;

      await adminDb.collection("products").add({
         ...product,
         isAvailable: true,
         createdAt: new Date().toISOString(),
         updatedAt: new Date().toISOString(),
      });

      return NextResponse.json(
         {
            success: true,
            message: "Berhasil menambah",
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
