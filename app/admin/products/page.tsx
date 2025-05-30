export const dynamic = "force-dynamic";

import ProductTable from "@/components/admin/products/ProductTable";
import { Suspense } from "react";
import Setting from "@/components/global/Setting";
import ProductSetting from "@/components/admin/products/ProductSetting";
import Spinner from "@/components/ui/spinner";
import PaginationComponent from "@/components/global/Pagination";
import { countTotalProducts } from "@/lib/firebase/service/count_total_products";
import ProductSearchWrapper from "@/components/admin/products/ProductSearchWrapper";

const LIMIT = 15;

export default async function Page({
   searchParams,
}: {
   searchParams: Promise<{ page?: string }>;
}) {
   try {
      const { page } = await searchParams;

      const totalProducts = await countTotalProducts();
      const totalPages = Math.ceil(totalProducts / LIMIT);

      return (
         <>
            <ProductSearchWrapper />
            <div className="flex justify-between items-center relative mt-6">
               <h1 className="text-2xl">Products</h1>
               <Setting title="Products">
                  <ProductSetting />
               </Setting>
            </div>
            <div className="bg-muted/50 relative p-4 mt-4 rounded-lg md:p-6 h-180">
               <Suspense
                  fallback={
                     <Spinner className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
                  }
               >
                  <ProductTable
                     totalProducts={totalPages}
                     LIMIT={LIMIT}
                     page={page}
                  />
               </Suspense>
               <div className="absolute bottom-0 left-1/2 -translate-x-1/2 p-4">
                  <PaginationComponent totalPages={totalPages} />
               </div>
            </div>
         </>
      );
   } catch (err) {
      const message =
         err instanceof Error
            ? err.message
            : "Something went wrong. Please try again later.";
      return (
         <div className="h-68 w-full flex justify-center items-center border-1 border-light-300 rounded-lg">
            <p className="text-sm text-dark-300 text-center">{message}</p>
         </div>
      );
   }
}
