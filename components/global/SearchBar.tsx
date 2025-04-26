"use client";

import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { cn } from "@/lib/utils";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { debounce } from "@/helpers/debounce";
import { searchAction } from "@/lib/firebase/service/search_action";
import { useMemo, useState } from "react";
import fetcher from "@/helpers/fetcher";
import { Response, ResponseWithUser } from "@/types/response";

export default function SearchBar({ className }: { className?: string }) {
   const [data, setData] = useState<any>("belum ada");
   const pathname = usePathname();
   const searchParams = useSearchParams();
   const { replace } = useRouter();

   const handleSearch = useMemo(
      () =>
         debounce(async (query: string) => {
            try {
               const params = new URLSearchParams(searchParams.toString());
               if (query) {
                  params.set("search", query);
                  const response: ResponseWithUser = await fetcher(
                     `/api/admin/users/search/${query}`
                  );
                  if (!response.success) {
                     return;
                  }
                  setData(response.data);
               } else {
                  params.delete("search");
               }
               replace(`${pathname}?${params.toString()}`);
            } catch (err) {}
         }, 500),
      [searchParams, pathname, replace]
   );

   return (
      <>
         <div
            className={cn(
               className,
               "flex w-full max-w-sm items-center space-x-2"
            )}
         >
            <Input
               name="query"
               onChange={(e) => handleSearch(e.target.value)}
               defaultValue={searchParams.get("search")?.toString()}
               type="text"
               placeholder="Email"
            />
         </div>
         {Array.isArray(data) ? (
            <ul className="mt-4 space-y-2">
               {data.map((user: any) => (
                  <li key={user.id} className="border p-2 rounded">
                     {user.username}
                  </li>
               ))}
            </ul>
         ) : (
            <p className="mt-4 text-muted-foreground">{data}</p>
         )}{" "}
      </>
   );
}
