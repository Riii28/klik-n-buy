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
            <div className="flex flex-1 flex-col gap-4 p-4">{children}</div>
            {/* <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
               <div className="grid auto-rows-min gap-4 md:grid-cols-3">
                  <div className="aspect-video rounded-xl bg-muted/50" />
                  <div className="aspect-video rounded-xl bg-muted/50" />
                  <div className="aspect-video rounded-xl bg-muted/50" />
               </div>
               <div className="min-h-[100vh] flex-1 rounded-xl bg-muted/50 md:min-h-min" />
            </div> */}
         </SidebarInset>
      </SidebarProvider>
   );
}
