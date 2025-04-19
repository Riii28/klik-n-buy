"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import clsx from "clsx";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
   faHome,
   faUserGroup,
   faObjectGroup,
} from "@fortawesome/free-solid-svg-icons";
import type { IconProp } from "@fortawesome/fontawesome-svg-core";

interface Link {
   name: string;
   href: string;
   icon: IconProp;
}

const links: Link[] = [
   { name: "Dashboard", href: "/admin", icon: faHome },
   { name: "Products", href: "/admin/products", icon: faObjectGroup },
   { name: "Users", href: "/admin/users", icon: faUserGroup },
];

export default function NavLinks() {
   const pathname = usePathname();

   return links.map((link) => (
      <Link
         key={link.name}
         href={link.href}
         className={clsx(
            "flex h-[48px] grow items-center justify-center gap-2 rounded-md bg-white p-3 text-sm font-medium hover:bg-white hover:text-primary md:flex-none md:justify-start md:p-2 md:px-3",
            {
               "bg-white text-primary":
                  link.href === "/admin"
                     ? pathname === "/admin"
                     : pathname.startsWith(link.href),
            }
         )}
      >
         <FontAwesomeIcon size="lg" icon={link.icon} />
         <p className="hidden md:block">{link.name}</p>
      </Link>
   ));
}
