import SignInForm from "@/components/auth/SignInForm";

export default function Page() {
   return (
      <div className="flex flex-col gap-y-14">
         <h1 className="text-2xl font-semibold text-center">Masuk KlikNBuy</h1>
         <SignInForm />
      </div>
   );
}
