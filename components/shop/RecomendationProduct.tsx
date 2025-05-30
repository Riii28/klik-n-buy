import { getProducts } from "@/lib/firebase/service/get_products";
import { Product } from "@/types/product";
import Carousel from "./Carousel";
import ProductCard from "./ProductCard";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/auth";

export default async function RecomendationProduct({
   page,
   limit,
}: {
   page?: number;
   limit?: number;
}) {
   try {
      const session = await getServerSession(authOptions);
      const products: Product[] = (await getProducts(page, limit)) as Product[];

      return (
         <Carousel className="mt-8">
            {products.map((product) => (
               <ProductCard
                  session={session}
                  key={product.id}
                  product={product}
               />
            ))}
         </Carousel> 
      );
   } catch (err) {
      const message =
         err instanceof Error
            ? err.message
            : "Something went wrong. Please try again later.";
      return (
         <div className="h-68 w-full mt-6 flex justify-center items-center border-1 border-light-300 rounded-lg">
            <p className="text-sm text-dark-300 text-center">{message}</p>
         </div>
      );
   }
}
