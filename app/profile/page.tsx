import { authOptions } from "@/auth";
import Back from "@/components/shop/Back";
import { getServerSession } from "next-auth/next";
import Image from "next/image";

export default async function Page() {
   try {
      const session = await getServerSession(authOptions);

      return (
         <div className="flex flex-col gap-3.5">
            <section className="p-7 bg-white border border-light-300 rounded-xl">
                <Back />
               <div className="w-full h-82 mt-6 flex flex-col justify-center items-center border border-light-300 rounded-lg">
                  <Image
                     src="/under-dev.svg"
                     alt="under development"
                     width={200}
                     height={200}
                  />
                  <p className="text-sm text-dark-300 text-center mt-4">
                     Profile page is currently under development. Please check
                     back later.
                  </p>
               </div>
            </section>
         </div>
      );
   } catch (err) {
      const message =
         err instanceof Error
            ? err.message
            : "Something went wrong. Please try again later.";
      return (
         <section className="p-7 bg-white border-1 border-light-300 rounded-xl">
            <div className="h-68 w-full mt-6 flex justify-center items-center border-1 border-light-300 rounded-lg">
               <p className="text-sm text-dark-300 text-center">{message}</p>
            </div>
         </section>
      );
   }
}
