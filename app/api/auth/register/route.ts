import { adminAuth } from "@/lib/firebase/admin";
import { createUser } from "@/lib/firebase/service/create_user";
import { signUpSchema } from "@/lib/zod/validation";
import { NextRequest, NextResponse } from "next/server";
import { generateID } from "@/helpers/generate_id";

export async function POST(req: NextRequest) {
   try {
      const body = await req.json();
      const parsed = signUpSchema.safeParse(body);

      if (!parsed.success) {
         return NextResponse.json(
            {
               success: false,
               message:
                  "The data you entered is invalid. Please double-check and try again.",
               errors: parsed.error.errors,
            },
            { status: 400 }
         );
      }

      const { email, username, password } = parsed.data;

      const existing = await adminAuth.getUserByEmail(email).catch(() => null);

      if (existing) {
         return NextResponse.json(
            {
               success: false,
               message:
                  "This email is already registered. Please use a different one.",
            },
            { status: 409 }
         );
      }

      const hashedId = generateID(email);

      const userRecord = await adminAuth.createUser({
         uid: hashedId,
         email,
         password,
         displayName: username,
         photoURL: `https://ui-avatars.com/api/?name=${encodeURIComponent(
            username
         )}&background=random`,
      });

      await createUser(hashedId, {
         email,
         username,
         profileImage: userRecord.photoURL || null,
      });

      return NextResponse.json(
         {
            success: true,
            message: "Your account has been successfully created.",
         },
         { status: 201 }
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
