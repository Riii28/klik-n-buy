export default function ProductSkeleton() {
   return (
      <div className="relative group mt-8">
         <div className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-gray-200 rounded-full p-2 shadow-md opacity-0 group-hover:opacity-100 transition-opacity duration-200 hidden sm:block animate-pulse">
            <div className="w-5 h-5 bg-gray-300 rounded"></div>
         </div>

         <div
            role="status"
            aria-busy="true"
            className="flex gap-3 overflow-x-auto scrollbar-hide scroll-smooth snap-x snap-mandatory pb-2 animate-pulse"
            style={{
               scrollbarWidth: "none", 
               msOverflowStyle: "none",
            }}
         >
            {Array.from({ length: 8 }).map((_, i) => (
               <div
                  key={i}
                  className="flex-shrink-0 w-[140px] sm:w-[150px] md:w-[160px] bg-light-400 rounded-md overflow-hidden snap-start"
               >
                  <div className="aspect-square bg-gray-300 animate-pulse"></div>

                  <div className="p-2.5 space-y-2">
                     <div className="space-y-1">
                        <div className="h-3 bg-gray-300 rounded animate-pulse"></div>
                        <div className="h-3 bg-gray-300 rounded w-3/4 animate-pulse"></div>
                     </div>

                     <div className="h-3.5 bg-gray-300 rounded w-1/2 animate-pulse mt-1"></div>

                     <div className="flex justify-between items-center mt-1">
                        <div className="h-2.5 bg-gray-300 rounded w-12 animate-pulse"></div>

                        <div className="w-4 h-4 bg-gray-300 rounded animate-pulse"></div>
                     </div>
                  </div>
               </div>
            ))}
         </div>

         <div className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-gray-200 rounded-full p-2 shadow-md opacity-0 group-hover:opacity-100 transition-opacity duration-200 hidden sm:block animate-pulse">
            <div className="w-5 h-5 bg-gray-300 rounded"></div>
         </div>
         <span className="sr-only">Loading products...</span>
      </div>
   );
}
