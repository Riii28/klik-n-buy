export default function NavbarSkeleton() {
   return (
      <nav className="fixed top-4 left-1/2 transform -translate-x-1/2 z-50 w-[95%] max-w-[1200px] px-6 py-4 bg-white border border-light-300 rounded-xl animate-pulse">
         <div className="flex justify-between items-center">
            <div className="flex items-center gap-x-4">
               <div className="w-8 h-8 bg-gray-200 rounded" />
               <div className="flex flex-col gap-y-1">
                  <div className="w-24 h-5 bg-gray-200 rounded" />
                  <div className="w-32 h-4 bg-gray-100 rounded hidden sm:block" />
               </div>
            </div>
            <div className="flex items-center gap-x-4">
               <div className="w-46 md:w-72 h-9 bg-gray-100 rounded" />
               <div className="w-8 h-8 bg-gray-200 rounded" />
               <div className="w-8 h-8 bg-gray-200 rounded-full" />
            </div>
         </div>
      </nav>
   );
}
