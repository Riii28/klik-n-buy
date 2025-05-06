import { adminDb } from "@/lib/firebase/admin";
import { NextResponse } from "next/server";

export async function GET() {
   try {
      const snapshot = await adminDb.collection("products").get();

      const products = snapshot.docs.map((doc) => ({
         id: doc.id,
         ...doc.data(),
      }));

      return NextResponse.json(
         {
            success: true,
            message: "Success get all products",
            data: products,
         },
         { status: 200, statusText: "OK" }
      );
   } catch (err) {
      return NextResponse.json(
         {
            success: false,
            message: "Internal server error",
         },
         { status: 500, statusText: "Internal Server Error" }
      );
   }
}
