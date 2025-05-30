"use client";

import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { usePathname, useRouter } from "next/navigation";

export default function Back() {
   const pathname = usePathname();
   const { back } = useRouter();

   return pathname !== "/shop" ? (
      <button onClick={back} className="cursor-pointer hover:text-dark-300 duration-300">
         <FontAwesomeIcon icon={faArrowLeft} size="xl" />
      </button>
   ) : null;
}
