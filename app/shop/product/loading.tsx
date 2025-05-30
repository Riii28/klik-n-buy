import ProductSkeleton from "@/components/skeleton/ProductSkeleton";

export default function Loading() {
   return (
      <>
         <div className="p-7 bg-white border border-light-300 rounded-xl">
            <ProductSkeleton />
         </div>
      </>
   );
}
