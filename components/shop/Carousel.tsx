"use client";

import { ReactNode, useRef } from "react";
import { cn } from "@/lib/utils";

export default function Carousel({
   children,
   className,
}: {
   children: ReactNode;
   className?: string;
}) {
   const scrollRef = useRef<HTMLDivElement>(null);

   const scrollLeft = () => {
      if (scrollRef.current) {
         scrollRef.current.scrollBy({
            left: -200,
            behavior: "smooth",
         });
      }
   };

   const scrollRight = () => {
      if (scrollRef.current) {
         scrollRef.current.scrollBy({
            left: 200,
            behavior: "smooth",
         });
      }
   };

   return (
      <div className="relative group">
         <button
            onClick={scrollLeft}
            className="absolute left-1 top-1/2 cursor-pointer -translate-y-1/2 z-10 bg-white/80 hover:bg-white rounded-full p-2 shadow-md opacity-0 group-hover:opacity-100 transition-opacity duration-200 hidden sm:block"
            aria-label="Scroll left"
         >
            <svg
               className="w-5 h-5 text-gray-600"
               fill="none"
               stroke="currentColor"
               viewBox="0 0 24 24"
            >
               <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 19l-7-7 7-7"
               />
            </svg>
         </button>

         <div
            ref={scrollRef}
            className={cn(
               "flex gap-3 overflow-x-auto scrollbar-hide scroll-smooth snap-x snap-mandatory",
               "pb-2", 
               className
            )}
            style={{
               scrollbarWidth: "none",
               msOverflowStyle: "none",
            }}
         >
            {children}
         </div>

         <button
            onClick={scrollRight}
            className="absolute right-1 cursor-pointer top-1/2 -translate-y-1/2 z-10 bg-white/80 hover:bg-white rounded-full p-2 shadow-md opacity-0 group-hover:opacity-100 transition-opacity duration-200 hidden sm:block"
            aria-label="Scroll right"
         >
            <svg
               className="w-5 h-5 text-gray-600"
               fill="none"
               stroke="currentColor"
               viewBox="0 0 24 24"
            >
               <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5l7 7-7 7"
               />
            </svg>
         </button>
      </div>
   );
}
