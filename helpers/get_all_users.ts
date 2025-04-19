import fetcher from "./fetcher";
import { ResponseWithUser } from "@/types/response";

export default async function getAllUsers() {
   try {
      const response: ResponseWithUser = await fetcher(
         `${process.env.NEXT_PUBLIC_BASE_URL}/api/admin/users`,
         {
            method: "GET",
            next: {
               tags: ["user_table"],
            },
            cache: "force-cache",
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
