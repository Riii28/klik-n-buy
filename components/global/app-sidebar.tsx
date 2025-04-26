"use client";

import {
   BookOpen,
   Bot,
   Command,
   Frame,
   LifeBuoy,
   Map,
   PieChart,
   Send,
   Settings2,
   SquareTerminal,
} from "lucide-react";

import { NavMain } from "@/components/global/nav-main";
import { NavProjects } from "@/components/global/nav-projects";
import { NavSecondary } from "@/components/global/nav-secondary";
import { NavUser } from "@/components/global/nav-user";
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
import { faHome, faLayerGroup, faUserGroup } from "@fortawesome/free-solid-svg-icons";
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
         url: "/admin/products",
         icon: faLayerGroup,
      },
      {
         title: "Users",
         url: "/admin/users?page=1",
         icon: faUserGroup,
      },
      {
         title: "Settings",
         url: "#",
         icon: faHome,
         items: [
            {
               title: "General",
               url: "#",
            },
            {
               title: "Team",
               url: "#",
            },
            {
               title: "Billing",
               url: "#",
            },
            {
               title: "Limits",
               url: "#",
            },
         ],
      },
   ],
   navSecondary: [
      {
         title: "Support",
         url: "#",
         icon: faHome,
      },
      {
         title: "Feedback",
         url: "#",
         icon: faHome,
      },
   ],
   projects: [
      {
         name: "Design Engineering",
         url: "#",
         icon: faHome,
      },
      {
         name: "Sales & Marketing",
         url: "#",
         icon: faHome,
      },
      {
         name: "Travel",
         url: "#",
         icon: faHome,
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
                     <Link href="/">
                        <div className="bg-sidebar-primary text-sidebar-primary-foreground flex aspect-square size-8 items-center justify-center rounded-lg">
                           <Image src={'/vercel.svg'} width={20} height={20} alt="brand"/>
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
            {/* <NavProjects projects={data.projects} />
            <NavSecondary items={data.navSecondary} className="mt-auto" /> */}
         </SidebarContent>
         <SidebarFooter>
            <NavUser
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
