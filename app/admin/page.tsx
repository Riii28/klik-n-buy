import PendingOrder from "@/components/admin/dashboard/PendingOrder";
import Revenue from "@/components/admin/dashboard/Revenue";
import Spinner from "@/components/ui/spinner";
import { Suspense } from "react";

export default function Page() {
   return (
      <>
         <section className="rounded-lg bg-gradient-to-r from-primary to-accent h-36 p-4 flex items-center">
            <div>
               <h1 className="text-light-200 text-xl md:text-3xl font-semibold">
                  Welcome to our Dashboard
               </h1>
               <h3 className="text-light-200 text-sm">
                  KlikNBuy | Find What You Need
               </h3>
            </div>
         </section>

         <h1 className="font-semibold text-xl mt-8">Dashboard</h1>
         <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-6">
            <Suspense fallback={<Spinner />}>
               <Revenue />
            </Suspense>
            <Suspense fallback={<Spinner />}>
               <PendingOrder />
            </Suspense>
            <div className="bg-white hover:shadow-none duration-200 border-1 flex justify-center items-center border-light-300 shadow-sm rounded-lg p-4 md:p-6 min-h-38">
               <h4 className="text-sm text-dark-300 text-center">
                  Other features are currently under development.
               </h4>
            </div>
         </section>
      </>
   );
}
