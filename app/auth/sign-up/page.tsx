import SignUp from "@/components/auth/SignUp";
import Welcome from "@/components/auth/Welcome";
import Image from "next/image";

export default function Page() {
   return (
      <>
         <Welcome
            title="Create Account"
            subtitle="Join thousands of users"
            imageUrl="/sign-up.svg"
         />
         <section className="lg:flex-1 p-4 md:p-6 lg:p-10">
            <div className="bg-light-400 h-full p-6 md:p-9 rounded-xl">
               <SignUp />
            </div>
         </section>
      </>
   );
}
