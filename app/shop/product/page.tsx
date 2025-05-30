import Image from "next/image";
import { getProductByCategory } from "@/lib/firebase/service/get_product_by_category";
import { Product } from "@/types/product";
import ProductCard from "@/components/shop/ProductCard";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/auth";
import Carousel from "@/components/shop/Carousel";
import Footer from "@/components/shop/Footer";

export default async function Page({
   searchParams,
}: {
   searchParams: Promise<{ category: string }>;
}) {
   try {
      const session = await getServerSession(authOptions);
      const { category } = await searchParams;

      if (!category) {
         return (
            <section className="p-7 bg-white border border-light-300 rounded-xl">
               <div className="w-full h-82 mt-6 flex flex-col justify-center items-center border border-light-300 rounded-lg">
                  <Image
                     src="/not-found.svg"
                     alt="Not Found"
                     width={200}
                     height={200}
                  />
                  <p className="text-sm text-dark-300 text-center mt-4">
                     The product you're looking for was not found.
                  </p>
               </div>
            </section>
         );
      }

      const products: Product[] = (await getProductByCategory(
         decodeURIComponent(category)
      )) as Product[];

      return (
         <div className="flex flex-col gap-3.5">
            <section className="p-7 bg-white border-1 border-light-300 rounded-xl">
               <h1 className="font-semibold text-xl">Products in {decodeURIComponent(category)}</h1>
               <Carousel className="mt-8">
                  {products.map((product) => (
                     <ProductCard
                        session={session}
                        key={product.id}
                        product={product}
                     />
                  ))}
               </Carousel>
            </section>
            <Footer />
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
