import Spinner from "@/components/ui/spinner";

export default function Loading() {
   return (
      <div className="h-full flex justify-center items-center">
         <Spinner
            height="w-8"
            width="w-8"
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
         />
      </div>
   );
}
