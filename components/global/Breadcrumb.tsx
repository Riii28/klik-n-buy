"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronRight, faHome } from "@fortawesome/free-solid-svg-icons";

export default function Breadcrumb() {
   const pathname = usePathname();
   const pathSegments = pathname.split("/").filter((seg) => seg);
   const breadcrumbs = pathSegments.map((segment, index) => {
      const href = "/" + pathSegments.slice(0, index + 1).join("/");
      return {
         name: decodeURIComponent(
            segment.charAt(0).toUpperCase() + segment.slice(1)
         ),
         href,
      };
   });

   return (
      <div className="flex items-center gap-2 text-gray-600">
         <Link
            href="/"
            className="hover:underline text-gray-500 flex items-center gap-x-2"
         >
            <FontAwesomeIcon icon={faHome} />
            <span>Home</span>
         </Link>
         {breadcrumbs.map((crumb, i) => (
            <span key={crumb.href} className="flex items-center gap-2">
               <FontAwesomeIcon icon={faChevronRight} className="text-xs" />
               {i === breadcrumbs.length - 1 ? (
                  <span className="text-gray-700">{crumb.name}</span>
               ) : (
                  <Link
                     href={crumb.href}
                     className="hover:underline text-gray-500"
                  >
                     {crumb.name}
                  </Link>
               )}
            </span>
         ))}
      </div>
   );
}
