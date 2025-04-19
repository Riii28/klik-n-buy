import { revalidateTag } from "next/cache";
import { NextResponse } from "next/server";

export async function POST() {
   revalidateTag("user_table");
   return NextResponse.json(
      {
         success: true,
         message: "Berhasil di revalidate",
      },
      { status: 200, statusText: "OK" }
   );
}
