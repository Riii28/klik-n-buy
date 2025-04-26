"use client";

import generatePagination from "@/helpers/generate_pagination";
import { usePathname, useSearchParams } from "next/navigation";
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

   const totalPageCount = Math.max(totalPages, 1);
   const currentPageNumber = Math.max(currentPage, 1);
   const pages = generatePagination(currentPageNumber, totalPageCount);

   function createPageURL(pageNumber: number | string) {
      const params = new URLSearchParams(searchParams);
      params.set("page", pageNumber.toString());
      return `${pathname}?${params.toString()}`;
   }

   return (
      <Pagination>
         <PaginationContent>
            <PaginationItem>
               {currentPageNumber <= 1 ? (
                  <span className="pointer-events-none opacity-50">
                     <PaginationPrevious href="#" />
                  </span>
               ) : (
                  <PaginationPrevious
                     href={createPageURL(currentPageNumber - 1)}
                  />
               )}
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
               {currentPageNumber >= totalPageCount ? (
                  <span className="pointer-events-none opacity-50">
                     <PaginationNext href="#" />
                  </span>
               ) : (
                  <PaginationNext href={createPageURL(currentPageNumber + 1)} />
               )}
            </PaginationItem>
         </PaginationContent>
      </Pagination>
   );
}
