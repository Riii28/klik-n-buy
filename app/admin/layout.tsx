import Breadcrumb from "@/components/admin/Breadcrumb";
import SideNav from "@/components/admin/SideNav";
import { ReactNode } from "react";

export default function Layout({ children }: { children: ReactNode }) {
   return (
      <main className="flex h-screen py-4 flex-col md:flex-row md:overflow-hidden">
         <div className="w-full flex-none md:w-64">
            <SideNav />
         </div>
         <div className="flex-grow mt-4 md:overflow-y-auto md:p-12 md:mt-0">
            <Breadcrumb />
            <div className="mt-6">{children}</div>
         </div>
      </main>
   );
}
