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
               message: "Sign in required to perform this action.",
            },
            { status: 401 }
         );
      }

      const { query } = await params;

      if (!query) {
         return NextResponse.json(
            {
               success: false,
               message: "Query is required for searching product.",
            },
            { status: 400 }
         );
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
            message: `${products.length} product(s) found.`,
            data: products,
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
