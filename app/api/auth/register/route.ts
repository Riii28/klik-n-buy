import { adminAuth } from "@/lib/firebase/admin";
import { createUser } from "@/lib/firebase/service";
import { registerSchema } from "@/lib/zod/validation";
import { revalidateTag } from "next/cache";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
   try {
      const body = await req.json();
      const parsed = registerSchema.safeParse(body);

      if (!parsed.success) {
         return NextResponse.json(
            {
               success: false,
               message: "Validasi gagal",
            },
            { status: 400, statusText: "Bad Request" }
         );
      }

      const { email, username, password } = parsed.data;

      const existing = await adminAuth.getUserByEmail(email).catch(() => null);
      if (existing) {
         return NextResponse.json(
            {
               success: false,
               message: "Email sudah terdaftar",
            },
            { status: 409, statusText: "Conflict" }
         );
      }

      // Create Firebase Auth user
      const userRecord = await adminAuth.createUser({
         email,
         password,
         displayName: username,
         photoURL: `https://ui-avatars.com/api/?name=${encodeURIComponent(
            username
         )}&background=random`,
      });

      await createUser(userRecord.uid, {
         email,
         username,
         profileImage: userRecord.photoURL || null,
      });

      revalidateTag("user_table");

      return NextResponse.json(
         {
            success: true,
            message: "Akun berhasil dibuat.",
         },
         { status: 201, statusText: "Created" }
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
