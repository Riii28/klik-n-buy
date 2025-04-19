import SignUpForm from "@/components/auth/SignUpForm";
import Image from "next/image";

export default function Page() {
   return (
      <div className="flex flex-col gap-y-14 relative">
         <div>
            <h1 className="text-2xl font-semibold text-center">
               Buat akun KlikNBuy
            </h1>
            <h4 className="text-center text-sm">
               Mohon isi formulir di bawah ini
            </h4>
         </div>
         <SignUpForm />
         <Image
            className="absolute w-full opacity-30"
            width={200}
            height={200}
            src={"/sign-up.svg"}
            alt="icon"
         />
      </div>
   );
}
