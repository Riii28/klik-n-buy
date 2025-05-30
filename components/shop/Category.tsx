import { getProductCategory } from "@/lib/firebase/service/get_category";
import { CategoryType } from "@/types/category";
import Image from "next/image";
import Link from "next/link";

export default async function Category() {
   try {
      const categories: CategoryType[] =
         (await getProductCategory()) as CategoryType[];

      return (
         <div className="mt-6">
            <div
               className="flex overflow-x-auto gap-x-3 sm:gap-x-4 pb-2 scrollbar-hide snap-x snap-mandatory"
               style={{
                  scrollbarWidth: "none",
                  msOverflowStyle: "none",
               }}
            >
               {categories.map(({ name, iconUrl, id }) => (
                  <Link
                     href={`/shop/product?category=${encodeURIComponent(
                        name.toLowerCase()
                     )}`}
                     key={id}
                     className="flex-shrink-0 w-16 sm:w-20 md:w-22 flex flex-col gap-y-1.5 items-center snap-start group"
                  >
                     <div className="relative">
                        <Image
                           className="bg-light-400 p-2.5 sm:p-3 rounded-xl aspect-square transition-transform duration-200 group-hover:scale-105 group-hover:shadow-md"
                           src={iconUrl}
                           alt={name}
                           height={50}
                           width={50}
                        />
                     </div>
                     <h1 className="text-xs sm:text-sm font-semibold text-center leading-tight max-w-full break-words px-1">
                        {name}
                     </h1>
                  </Link>
               ))}
            </div>
         </div>
      );
   } catch (err) {
      const message =
         err instanceof Error
            ? err.message
            : "Something went wrong. Please try again later.";
      return (
         <div className="h-14 flex justify-center items-center mt-6">
            <h1 className="text-lg sm:text-xl font-semibold text-center px-4">
               {message}
            </h1>
         </div>
      );
   }
}
