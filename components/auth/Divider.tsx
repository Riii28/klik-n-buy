export default function Divider({ title }: { title: string }) {
   return (
      <div className="relative flex items-center">
         <div className="flex-1 border-t border-gray-300"></div>
         <span className="px-4 text-xs text-dark-300 bg-light-400">
            {title}
         </span>
         <div className="flex-1 border-t border-gray-300"></div>
      </div>
   );
}
