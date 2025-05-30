export default function CheckoutSkeleton() {
   return (
      <div className="flex flex-col gap-3.5" role="status" aria-busy="true">
         <div className="p-7 bg-white border-1 border-light-300 rounded-xl animate-pulse">
            <div className="bg-gray-300 rounded-md h-20"></div>
         </div>
         <div className="p-7 bg-white border-1 border-light-300 rounded-xl animate-pulse">
            <div className="bg-gray-300 rounded-md h-10"></div>
         </div>
         {Array.from({ length: 2 }).map((_, i) => (
            <div
               key={i}
               className="p-7 bg-white border-1 border-light-300 rounded-xl animate-pulse"
            >
               <div className="flex items-center justify-between">
                  <div className="bg-gray-300 rounded-md h-[100px] w-[100px]"></div>
                  <div className="w-32 h-6 bg-gray-300 rounded" />
                  <div className="w-32 h-6 bg-gray-300 rounded" />
                  <div className="w-32 h-6 bg-gray-300 rounded" />
               </div>
            </div>
         ))}
         <div className="p-7 bg-white border-1 border-light-300 rounded-xl animate-pulse">
            <div className="bg-gray-300 rounded-md h-20"></div>
         </div>
      </div>
   );
}
