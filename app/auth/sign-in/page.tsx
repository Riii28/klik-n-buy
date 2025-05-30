import SignIn from "@/components/auth/SignIn";
import Welcome from "@/components/auth/Welcome";

export default function Page() {
   return (
      <>
         <Welcome
            title="Welcome Back"
            subtitle="Sign in to continue your experience"
            imageUrl="/sign-in.svg"
         />
         <section className="lg:flex-1 p-4 md:p-6 lg:p-10">
            <div className="bg-light-400 h-full p-6 md:p-9 rounded-xl">
               <SignIn />
            </div>
         </section>
      </>
   );
}
