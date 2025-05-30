"use client";

import { ChevronRight, type LucideIcon } from "lucide-react";

import {
   Collapsible,
   CollapsibleContent,
   CollapsibleTrigger,
} from "@/components/ui/collapsible";
import {
   SidebarGroup,
   SidebarGroupLabel,
   SidebarMenu,
   SidebarMenuAction,
   SidebarMenuButton,
   SidebarMenuItem,
   SidebarMenuSub,
   SidebarMenuSubButton,
   SidebarMenuSubItem,
} from "@/components/ui/sidebar";
import Link from "next/link";
import { IconProp } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import clsx from "clsx";
import { usePathname } from "next/navigation";

export function NavMain({
   items,
}: {
   items: {
      title: string;
      url: string;
      icon: IconProp;
      isActive?: boolean;
      items?: {
         title: string;
         url: string;
      }[];
   }[];
}) {
   const pathname = usePathname();

   return (
      <SidebarGroup>
         <SidebarGroupLabel>Menu</SidebarGroupLabel>
         <SidebarMenu>
            {items.map((item) => (
               <Collapsible
                  key={item.title}
                  asChild
                  defaultOpen={item.isActive}
               >
                  <SidebarMenuItem>
                     <SidebarMenuButton asChild tooltip={item.title}>
                        <Link
                           className={clsx({
                              "bg-accent":
                                 item.url === "/admin"
                                    ? pathname === "/admin"
                                    : pathname.startsWith(item.url),
                           })}
                           href={item.url}
                        >
                           <FontAwesomeIcon icon={item.icon} />
                           <span>{item.title}</span>
                        </Link>
                     </SidebarMenuButton>
                     {item.items?.length ? (
                        <>
                           <CollapsibleTrigger asChild>
                              <SidebarMenuAction className="data-[state=open]:rotate-90">
                                 <ChevronRight />
                                 <span className="sr-only">Toggle</span>
                              </SidebarMenuAction>
                           </CollapsibleTrigger>
                           <CollapsibleContent>
                              <SidebarMenuSub>
                                 {item.items?.map((subItem) => (
                                    <SidebarMenuSubItem key={subItem.title}>
                                       <SidebarMenuSubButton asChild>
                                          <Link href={subItem.url}>
                                             <span>{subItem.title}</span>
                                          </Link>
                                       </SidebarMenuSubButton>
                                    </SidebarMenuSubItem>
                                 ))}
                              </SidebarMenuSub>
                           </CollapsibleContent>
                        </>
                     ) : null}
                  </SidebarMenuItem>
               </Collapsible>
            ))}
         </SidebarMenu>
      </SidebarGroup>
   );
}
