export const dynamic = "force-dynamic";

import Setting from "@/components/global/Setting";
import UserSetting from "@/components/admin/users/UserSetting";
import UserTable from "@/components/admin/users/UserTable";
import Spinner from "@/components/ui/spinner";
import { Suspense } from "react";
import { countTotalUsers } from "@/lib/firebase/service/count_total_users";
import UserSearchWrapper from "@/components/admin/users/UserSearchWrapper";
import PaginationComponent from "@/components/global/Pagination";

const LIMIT = 15;

export default async function Page({
   searchParams,
}: {
   searchParams: Promise<{ page?: string }>;
}) {
   try {
      const { page } = await searchParams;

      const totalUsers = await countTotalUsers();
      const totalPages = Math.ceil(totalUsers / LIMIT);

      return (
         <>
            <UserSearchWrapper />
            <div className="flex justify-between items-center relative mt-4 md:mt-7">
               <h1 className="text-2xl">Customers</h1>
               <Setting title="Users">
                  <UserSetting />
               </Setting>
            </div>
            <div className="bg-accent relative p-4 mt-4 rounded-lg md:p-6 h-180">
               <Suspense
                  fallback={
                     <Spinner className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
                  }
               >
                  <UserTable
                     totalUsers={totalUsers}
                     LIMIT={LIMIT}
                     page={page}
                  />
               </Suspense>
               <div className="absolute bottom-0 left-1/2 -translate-x-1/2 p-4">
                  <PaginationComponent totalPages={totalPages} />
               </div>
            </div>
         </>
      );
   } catch (err) {
      const message =
         err instanceof Error
            ? err.message
            : "Something went wrong. Please try again later.";
      return (
         <div className="h-68 w-full flex justify-center items-center border-1 border-light-300 rounded-lg">
            <p className="text-sm text-dark-300 text-center">{message}</p>
         </div>
      );
   }
}
