import { getPopularProducts } from "@/lib/firebase/service/get_popular_products";
import Carousel from "./Carousel";
import { Product } from "@/types/product";
import ProductCard from "./ProductCard";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/auth";

export default async function PopularProduct() {
   try {
      const session = await getServerSession(authOptions);

      const popularProducts: Product[] =
         (await getPopularProducts()) as Product[];

      return (
         <Carousel className="mt-8">
            {popularProducts.map((product) => (
               <ProductCard
                  key={product.id}
                  product={product}
                  session={session}
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
