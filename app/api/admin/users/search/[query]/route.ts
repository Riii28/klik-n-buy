import { NextResponse, NextRequest } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/auth";
import { adminDb } from "@/lib/firebase/admin";

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
               message: "Sign In required to perform this action.",
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
         .collection("users")
         .where("email", ">=", query)
         .where("email", "<=", query + "\uf8ff")
         .limit(100)
         .get();

      const users = snapshot.docs.map((doc) => ({
         id: doc.id,
         ...doc.data(),
      }));

      return NextResponse.json(
         {
            success: true,
            message: `${users.length} user(s) found.`,
            data: users,
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
