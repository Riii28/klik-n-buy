import { ResponseWithUser } from "@/types/response";
import fetcher from "./fetcher";
import { getAuthSession } from "./get_auth_session";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/auth";

export default async function getUserById(id: string) {
   try {
      const session = await getServerSession(authOptions);

      const response: ResponseWithUser = await fetcher(
         `${process.env.NEXT_PUBLIC_BASE_URL}/api/admin/users/${id}`,
         {
            method: "GET",
            headers: {
               "Content-Type": "application/json",
            },
            timeout: 10000,
         }
      );

      if (!response.success) {
         throw new Error(response.message);
      }

      return response.data;
   } catch (err) {
      if (err instanceof Error) {
         throw err;
      }
      throw new Error("Unknown error occurred");
   }
}
