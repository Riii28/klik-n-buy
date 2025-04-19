import { authOptions } from "@/auth";
import { getServerSession } from "next-auth/next";

export function getAuthSession() {
   return getServerSession(authOptions);
}
