import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";

export async function middleware(request: NextRequest) {
   try {
      const { pathname } = request.nextUrl;
      const token = await getToken({
         req: request,
         secret: process.env.AUTH_SECRET,
      });

      if (pathname.startsWith("/admin")) {
         if (token?.role !== "Admin") {
            return NextResponse.redirect(new URL("/", request.url));
         }
      }

      if (token && ["/auth/sign-in", "/auth/sign-up"].includes(pathname)) {
         return NextResponse.redirect(new URL("/", request.url));
      }

      return NextResponse.next();
   } catch (err) {
      return new NextResponse("Internal Server Error", { status: 500 });
   }
}

export const config = {
   matcher: ["/admin/:path*", "/auth/sign-in", "/auth/sign-up"],
};
