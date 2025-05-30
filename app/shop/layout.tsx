import Navbar from "@/components/shop/Navbar";
import NavbarSkeleton from "@/components/skeleton/NavbarSkeleton";
import { ReactNode, Suspense } from "react";

export default function Layout({ children }: { children: ReactNode }) {
   return (
      <>
         <Suspense fallback={<NavbarSkeleton />}>
            <Navbar />
         </Suspense>
         <main className="max-w-[1200px] mx-auto px-4 sm:px-6 md:px-0 mt-28">
            {children}
         </main>
      </>
   );
}
