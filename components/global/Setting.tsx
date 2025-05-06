"use client";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGear } from "@fortawesome/free-solid-svg-icons";
import { ReactNode, useState } from "react";
import { Button } from "../ui/button";

export default function Setting({
   children,
   title,
}: {
   children: ReactNode;
   title: string;
}) {
   const [state, setState] = useState<boolean>(false);

   return (
      <>
         <Button
            onClick={() => setState((prev) => !prev)}
            className="rounded-md bg-transparent cursor-pointer hover:bg-transparent"
         >
            <FontAwesomeIcon icon={faGear} className="text-foreground" size="lg" />
         </Button>
         {state && (
            <div className="absolute right-0 top-12 z-10 bg-white divide-y divide-gray-100 rounded-md shadow-md w-46 dark:bg-gray-700 dark:divide-gray-600">
               <div className="px-4 py-3 dark:text-white">
                  <h1 className="md:text-lg">Setting</h1>
                  <h3 className="font-medium text-sm text-gray-700">{title}</h3>
               </div>
               {children}
            </div>
         )}
      </>
   );
}
