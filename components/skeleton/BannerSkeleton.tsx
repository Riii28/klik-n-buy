export default function BannerSkeleton() {
   return (
      <div
         className="flex flex-row gap-x-3.5 animate-pulse h-64"
         role="status"
         aria-busy="true"
      >
         <div className="flex-1">
            <div className="w-full h-full bg-gray-300 rounded-md"></div>
         </div>
         <div className="flex-2">
            <div className="w-full h-full bg-gray-300 rounded-md"></div>
         </div>
         <div className="flex-1">
            <div className="w-full h-full bg-gray-300 rounded-md"></div>
         </div>
      </div>
   );
}
