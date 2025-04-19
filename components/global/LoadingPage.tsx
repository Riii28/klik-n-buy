import Spinner from "../ui/spinner";

export default function Loading() {
   return (
      <section className="fixed top-0 left-0 w-full z-50 bg-black">
         <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
            <Spinner height="h-8" width="w-8" />
         </div>
      </section>
   );
}