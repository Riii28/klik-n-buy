import NavLinks from "./NavLinks";
import Link from "next/link";
import SignOutButton from "../global/SignOutButton";

export default function SideNav() {
   return (
      <div className="flex h-full flex-col">
         <Link
            className="mb-2 flex h-20 items-end justify-start rounded-md bg-primary p-4 md:h-40"
            href="/"
         >
            <div className="w-32 text-white md:w-40">
               <h1>Logo</h1>
            </div>
         </Link>
         <div className="flex grow flex-row md:flex-col gap-4">
            <NavLinks />
            <SignOutButton className="flex h-[48px] grow items-center justify-center gap-2 rounded-md p-3 text-sm font-medium md:flex-none md:justify-start md:p-2 md:px-3"/>
         </div>
      </div>
   );
}