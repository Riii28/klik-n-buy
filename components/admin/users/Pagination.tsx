"use client";

import clsx from "clsx";
import Link from "next/link";
import { generatePagination } from "@/lib/utils";
import { usePathname, useSearchParams } from "next/navigation";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
   faChevronLeft,
   faChevronRight,
} from "@fortawesome/free-solid-svg-icons";
import {
   Pagination,
   PaginationContent,
   PaginationItem,
   PaginationLink,
   PaginationNext,
   PaginationPrevious,
   PaginationEllipsis,
} from "@/components/ui/pagination";

export default function PaginationComponent({
   totalPages,
}: {
   totalPages: number;
}) {
   const pathname = usePathname();
   const searchParams = useSearchParams();
   const currentPage = Number(searchParams.get("page")) || 1;
   // Pastikan totalPages dan currentPage adalah tipe number yang valid
   const totalPageCount = totalPages > 0 ? totalPages : 1; // minimal 1 halaman
   const currentPageNumber = currentPage > 0 ? currentPage : 1; // minimal halaman 1
   const pages = generatePagination(currentPageNumber, totalPageCount);

   const createPageURL = (pageNumber: number | string) => {
      const params = new URLSearchParams(searchParams);
      params.set("page", pageNumber.toString());
      return `${pathname}?${params.toString()}`;
   };

   return (
      <Pagination>
         <PaginationContent>
            <PaginationItem>
               <PaginationPrevious
                  href={
                     currentPageNumber <= 1
                        ? "#"
                        : createPageURL(currentPageNumber - 1)
                  }
                  aria-disabled={currentPageNumber <= 1}
               />
            </PaginationItem>
            {pages.map((page, i) =>
               page === "..." ? (
                  <PaginationItem key={i}>
                     <PaginationEllipsis />
                  </PaginationItem>
               ) : (
                  <PaginationItem key={page}>
                     <PaginationLink
                        href={createPageURL(page)}
                        isActive={currentPageNumber === page}
                     >
                        {page}
                     </PaginationLink>
                  </PaginationItem>
               )
            )}
            <PaginationItem>
               <PaginationNext
                  href={
                     currentPageNumber >= totalPageCount
                        ? "#"
                        : createPageURL(currentPageNumber + 1)
                  }
                  aria-disabled={currentPageNumber >= totalPageCount}
               />
            </PaginationItem>
         </PaginationContent>
      </Pagination>
   );
}
function PaginationNumber({
   page,
   href,
   isActive,
   position,
}: {
   page: number | string;
   href: string;
   position?: "first" | "last" | "middle" | "single";
   isActive: boolean;
}) {
   const className = clsx(
      "flex h-10 w-10 items-center justify-center text-sm border",
      {
         "rounded-l-md": position === "first" || position === "single",
         "rounded-r-md": position === "last" || position === "single",
         "z-10 bg-blue-600 border-blue-600 text-white": isActive,
         "hover:bg-gray-100": !isActive && position !== "middle",
         "text-gray-300": position === "middle",
      }
   );

   return isActive || position === "middle" ? (
      <div className={className}>{page}</div>
   ) : (
      <Link href={href} className={className}>
         {page}
      </Link>
   );
}

function PaginationArrow({
   href,
   direction,
   isDisabled,
}: {
   href: string;
   direction: "left" | "right";
   isDisabled?: boolean;
}) {
   const className = clsx(
      "flex h-10 w-10 items-center justify-center rounded-md border",
      {
         "pointer-events-none text-gray-300": isDisabled,
         "hover:bg-gray-100": !isDisabled,
         "mr-2 md:mr-4": direction === "left",
         "ml-2 md:ml-4": direction === "right",
      }
   );

   const icon =
      direction === "left" ? (
         <FontAwesomeIcon icon={faChevronLeft} className="w-4" />
      ) : (
         <FontAwesomeIcon icon={faChevronRight} className="w-4" />
      );

   return isDisabled ? (
      <div className={className}>{icon}</div>
   ) : (
      <Link className={className} href={href}>
         {icon}
      </Link>
   );
}
