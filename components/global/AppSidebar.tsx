"use client";

import { NavMain } from "@/components/global/NavMain";
import { NavUser } from "@/components/global/NavUser";
import {
   Sidebar,
   SidebarContent,
   SidebarFooter,
   SidebarHeader,
   SidebarMenu,
   SidebarMenuButton,
   SidebarMenuItem,
} from "@/components/ui/sidebar";
import { useSession } from "next-auth/react";
import Link from "next/link";
import {
   faHome,
   faLayerGroup,
   faUserGroup,
} from "@fortawesome/free-solid-svg-icons";
import Image from "next/image";

const data = {
   navMain: [
      {
         title: "Dashboard",
         url: "/admin",
         icon: faHome,
         isActive: true,
      },
      {
         title: "Products",
         url: "/admin/products?page=1",
         icon: faLayerGroup,
      },
      {
         title: "Customers",
         url: "/admin/customers?page=1",
         icon: faUserGroup,
      },
   ],
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
   const { data: session } = useSession();

   return (
      <Sidebar variant="inset" {...props}>
         <SidebarHeader>
            <SidebarMenu>
               <SidebarMenuItem>
                  <SidebarMenuButton size="lg" asChild>
                     <Link href="/shop">
                        <div className="bg-light-400 border-1 border-light-300 text-sidebar-primary-foreground flex aspect-square size-8 items-center justify-center rounded-lg">
                           <Image
                              src={"/favicon.svg"}
                              width={20}
                              height={20}
                              alt="brand"
                           />
                        </div>
                        <div className="grid flex-1 text-left text-sm leading-tight">
                           <span className="truncate font-medium">
                              KlikNBuy
                           </span>
                           <span className="truncate text-xs">Enterprise</span>
                        </div>
                     </Link>
                  </SidebarMenuButton>
               </SidebarMenuItem>
            </SidebarMenu>
         </SidebarHeader>
         <SidebarContent>
            <NavMain items={data.navMain} />
         </SidebarContent>
         <SidebarFooter>
            <NavUser
               session={session}
               user={{
                  name: session?.user.username!,
                  email: session?.user.email!,
                  avatar: session?.user.profile!,
               }}
            />
         </SidebarFooter>
      </Sidebar>
   );
}
