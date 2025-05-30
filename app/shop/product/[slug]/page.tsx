import { authOptions } from "@/auth";
import ProductDetail from "@/components/shop/ProductDetail";
import { getProductById } from "@/lib/firebase/service/get_product_by_id";
import { Product } from "@/types/product";
import { getServerSession } from "next-auth/next";

export default async function Page({
   params,
}: {
   params: Promise<{ slug: string }>;
}) {
   try {
      const session = await getServerSession(authOptions)
      const { slug } = await params;

      if (!slug) {
         throw new Error("Product not found.");
      }

      const decodeURL = slug.split("-").at(-1);
 
      if (!decodeURL) {
         throw new Error("Invalid product ID.");
      }

      const product: Product = (await getProductById(decodeURL)) as Product;

      return (
         <div className="flex flex-col gap-3.5">
            <section className="p-7 bg-white border-1 border-light-300 rounded-xl">
               <ProductDetail product={product} session={session}/>
            </section>
            <section className="p-7 bg-white border-1 border-light-300 rounded-xl">
               <h1 className="font-semibold text-xl">Description</h1>
               <p className="text-dark-300 mt-6 max-w-180">{product.description}</p>
            </section>
         </div>
      );
   } catch (err) {
      const message =
         err instanceof Error
            ? err.message
            : "Something went wrong. Please try again later.";
      return (
         <section className="p-7 bg-white border-1 border-light-300 rounded-xl">
            <div className="h-68 w-full mt-6 flex justify-center items-center border-1 border-light-300 rounded-lg">
               <p className="text-sm text-dark-300 text-center">{message}</p>
            </div>
         </section>
      );
   }
}
