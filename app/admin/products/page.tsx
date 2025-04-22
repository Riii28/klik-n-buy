import ProductTable from "@/components/admin/products/ProductTable";
import { Suspense } from "react";
import Loading from "@/components/global/LoadingPage";
import Setting from "@/components/admin/Setting";
import ProductSetting from "@/components/admin/products/ProductSetting";

export default function Page() {
   return (
      <div className="min-h-[100vh] p-4 flex-1 rounded-xl md:min-h-min">
         <div className="flex justify-between items-center relative">
            <h1 className="text-2xl">Data produk</h1>
            <Setting title="Products">
               <ProductSetting />
            </Setting>
         </div>
         <Suspense  fallback={<Loading />}>
            <ProductTable />
         </Suspense>
      </div>
   );
}
