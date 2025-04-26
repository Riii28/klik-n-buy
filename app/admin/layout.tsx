import { AppSidebar } from "@/components/global/app-sidebar";
import Breadcrumb from "@/components/admin/Breadcrumb";
import {
   SidebarInset,
   SidebarProvider,
   SidebarTrigger,
} from "@/components/ui/sidebar";
import { ReactNode } from "react";

export default function Layout({ children }: { children: ReactNode }) {
   return (
      <SidebarProvider>
         <AppSidebar />
         <SidebarInset className="overflow-x-hidden">
            <header className="flex items-center gap-x-4 p-4 text-sm border-b-1">
               <SidebarTrigger />
               <Breadcrumb />
            </header>
            <div className="relative p-4 md:p-6">{children}</div>
         </SidebarInset>
      </SidebarProvider>
   );
}
