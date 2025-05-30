export default function ProductDetailSkeleton() {
   return (
      <div className="flex flex-col gap-3.5" role="status" aria-busy="true">
         <div className="p-7 bg-white border-1 border-light-300 rounded-xl animate-pulse">
            <div className="flex flex-col md:flex-row gap-6 md:gap-x-12">
               <div className="flex-1 aspect-square bg-gray-300 rounded-xl" />
               <div className="flex-2">
                  <div className="h-6 w-2/3 bg-gray-300 rounded" />
                  <div className="flex gap-2 mt-4">
                     <div className="w-12 h-6 bg-gray-300 rounded" />
                     <div className="w-12 h-6 bg-gray-300 rounded" />
                     <div className="w-12 h-6 bg-gray-300 rounded" />
                  </div>
                  <div className="h-8 w-1/2 bg-gray-300 rounded mt-4" />
                  <div className="space-y-2 mt-4">
                     <div className="h-4 w-24 bg-gray-200 rounded" />
                     <div className="h-8 w-24 bg-gray-300 rounded" />
                  </div>
                  <div className="flex gap-3 mt-4">
                     <div className="h-10 w-32 bg-gray-300 rounded-xl" />
                     <div className="h-10 w-32 bg-gray-300 rounded-xl" />
                  </div>
               </div>
            </div>
         </div>
         <div className="p-7 bg-white border-1 border-light-300 rounded-xl">
            <h1 className="font-semibold text-xl">Description</h1>
            <div className="h-44 bg-gray-300 mt-6 rounded-lg animate-pulse"></div>
         </div>
      </div>
   );
}
