import { ResponseWithProduct } from "@/types/response";
import fetcher from "./fetcher";

export default async function getAllProducts() {
   try {
      const response: ResponseWithProduct = await fetcher(
         `${process.env.NEXT_PUBLIC_BASE_URL}/api/admin/products`,
         {
            method: "GET",
            next: {
               tags: ["product_table"],
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
