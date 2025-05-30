import Image from "next/image";
import Search from "./Search";
import CartIcon from "./CartIcon";
import Back from "./Back";
import Link from "next/link";
import Avatar from "./Avatar";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/auth";
import NavbarSkeleton from "../skeleton/NavbarSkeleton";

export default async function Navbar() {
   try {
      const session = await getServerSession(authOptions);

      return (
         <nav className="fixed top-4 left-1/2 transform -translate-x-1/2 z-50 w-[95%] max-w-[1200px] px-6 py-4 bg-white border border-light-300 rounded-xl">
            <div className="flex justify-between items-center">
               <div className="flex items-center gap-x-4">
                  <Back />
                  <Link href="/shop" className="flex flex-col">
                     <h1 className="font-bold text-xl sm:text-2xl">KlikNBuy</h1>
                     <p className="text-sm text-dark-300 hidden sm:block">
                        Find What You Need
                     </p>
                  </Link>
               </div>

               <div className="flex items-center gap-x-4 relative">
                  <div>
                     <Search className="w-46 md:w-72" />
                  </div>
                  <CartIcon />
                  <Avatar session={session} />
               </div>
            </div>
         </nav>
      );
   } catch (err) {
      return <NavbarSkeleton />
   }
}
