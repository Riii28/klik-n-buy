export default function CategorySkeleton() {
   return (
      <div
         role="status"
         aria-busy="true"
         className="flex flex-row mt-6 gap-x-6 justify-center animate-pulse"
      >
         {Array.from({ length: 11 }).map((_, i) => (
            <div key={i} className="w-18 h-18 bg-gray-300 rounded-md"></div>
         ))}
      </div>
   );
}
