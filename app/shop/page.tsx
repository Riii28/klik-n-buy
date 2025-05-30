import Banner from "@/components/shop/Banner";
import Category from "@/components/shop/Category";
import Footer from "@/components/shop/Footer";
import PopularProduct from "@/components/shop/PopularProduct";
import RecomendationProduct from "@/components/shop/RecomendationProduct";
import BannerSkeleton from "@/components/skeleton/BannerSkeleton";
import CategorySkeleton from "@/components/skeleton/CategorySkeleton";
import ProductSkeleton from "@/components/skeleton/ProductSkeleton";
import { Suspense } from "react";

export default function Page() {
   return (
      <div className="flex flex-col gap-3.5">
         <section className="p-7 bg-white border-1 border-light-300 rounded-xl">
            <Suspense fallback={<BannerSkeleton />}>
               <Banner />
            </Suspense>
            <Suspense fallback={<CategorySkeleton />}>
               <Category />
            </Suspense>
         </section>
         <section className="p-7 bg-white border-1 border-light-300 rounded-xl">
            <h1 className="font-semibold text-xl">
               See What Everyone's Buying
            </h1>
            <Suspense fallback={<ProductSkeleton />}>
               <PopularProduct />
            </Suspense>
         </section>
         <section className="p-7 bg-white border-1 border-light-300 rounded-xl">
            <h1 className="font-semibold text-xl">Recomendation For You</h1>
            <Suspense fallback={<ProductSkeleton />}>
               <RecomendationProduct page={1} limit={10} />
            </Suspense>
            <Suspense fallback={<ProductSkeleton />}>
               <RecomendationProduct page={2} limit={10} />
            </Suspense>
            <Suspense fallback={<ProductSkeleton />}>
               <RecomendationProduct page={3} limit={10} />
            </Suspense>
         </section>
         <Footer />
      </div>
   );
}
