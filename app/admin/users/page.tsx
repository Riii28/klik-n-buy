export const dynamic = 'force-dynamic'

import Setting from "@/components/admin/Setting";
import UserSetting from "@/components/admin/users/UserSetting";
import UserTable from "@/components/admin/users/UserTable";
import Spinner from "@/components/ui/spinner";
import { Suspense } from "react";
import Pagination from "@/components/global/Pagination";
import { countTotalUsers } from "@/lib/firebase/service/count_total_users";
import SearchBar from "@/components/global/SearchBar";

const LIMIT = 15;

export default async function Page({
   searchParams,
}: {
   searchParams: Promise<{ page?: string }>;
}) {
   try {
      const { page } = await searchParams;

      const totalUsers = await countTotalUsers()
      const totalPages = Math.ceil(totalUsers / LIMIT);

      return (
         <>
            <div className="flex-1 rounded-xl min-h-min">
               <SearchBar className=""/>
               <div className="flex justify-between items-center relative mt-4">
                  <h1 className="text-2xl">Data customer</h1>
                  <Setting title="Users">
                     <UserSetting />
                  </Setting>
               </div>
               <div className="bg-muted/50 relative p-4 mt-4 rounded-lg md:p-6 h-180">
                  <div className="">
                     <Suspense fallback={<Spinner />}>
                        <UserTable totalUsers={totalUsers} LIMIT={LIMIT} page={page} />
                     </Suspense>
                  </div>
                  <div className="absolute bottom-0 left-1/2 -translate-x-1/2 p-4">
                     <Pagination totalPages={totalPages} />
                  </div>
               </div>
            </div>
            <div className="flex mt-4 flex-1 flex-col gap-4">
               <div className="grid auto-rows-min gap-4 md:grid-cols-3">
                  <div className="aspect-video rounded-xl bg-muted/50" />
                  <div className="aspect-video rounded-xl bg-muted/50" />
                  <div className="aspect-video rounded-xl bg-muted/50" />
               </div>
            </div>
         </>
      );
   } catch (err) {
      const message: string =
         err instanceof Error ? err.message : "Unknown error";
      return (
         <div className="text-destructive text-center mt-20">
            <h1 className="text-lg">Terjadi kesalahan saat mengambil data</h1>
            <p className="text-sm">{message}</p>
         </div>
      );
   }
}
