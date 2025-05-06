import { authOptions } from "@/auth";
import { adminDb } from "@/lib/firebase/admin";
import { getServerSession } from "next-auth/next";
import { NextResponse, NextRequest } from "next/server";

export async function GET(
   request: NextRequest,
   { params }: { params: Promise<{ query: string }> }
) {
   try {
      const session = await getServerSession(authOptions);

      if (!session) {
         return NextResponse.json(
            {
               success: false,
            },
            { status: 401, statusText: "Unauthorized" }
         );
      }

      const { query } = await params;

      if (!query) {
         return;
      }

      const snapshot = await adminDb
         .collection("products")
         .where("name", ">=", query)
         .where("name", "<=", query + "\uf8ff")
         .limit(100)
         .get();

      const products = snapshot.docs.map((doc) => ({
         id: doc.id,
         ...doc.data(),
      }));

      return NextResponse.json(
         {
            success: true,
            data: products,
         },
         { status: 200, statusText: "OK" }
      );
      
   } catch (err) {}
}
