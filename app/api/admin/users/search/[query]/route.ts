import { NextResponse, NextRequest } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/auth";
import { adminDb } from "@/lib/firebase/admin";

export async function GET(
   request: NextRequest,
   { params }: { params: { query: string } }
) {
   const session = await getServerSession(authOptions);

   if (!session) {
      return NextResponse.json(
         { success: false, message: "Unauthorized" },
         { status: 401 }
      );
   }

   const { query } = params;

   if (!query) {
      return NextResponse.json(
         { success: false, message: "Missing name" },
         { status: 400 }
      );
   }

   const snapshot = await adminDb
      .collection("users")
      .where("username", ">=", query)
      .where("username", "<=", query + "\uf8ff")
      .get();

   const users = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
   }));

   return NextResponse.json(
      {
         success: true,
         message: "Success",
         data: users,
      },
      { status: 200 }
   );
}
