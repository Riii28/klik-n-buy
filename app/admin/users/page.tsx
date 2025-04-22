import Setting from "@/components/admin/Setting";
import UserSetting from "@/components/admin/users/UserSetting";
import UserTable from "@/components/admin/users/UserTable";
import Loading from "@/components/global/LoadingPage";
import Spinner from "@/components/ui/spinner";
import { Suspense } from "react";

export default async function Page({
   searchParams,
}: {
   searchParams: Promise<{ page?: string }>;
}) {
   const { page } = await searchParams;
   return (
      <>
         <div className="min-h-screen flex-1 rounded-xl md:min-h-min">
            <div className="flex justify-between items-center relative">
               <h1 className="text-2xl">Data customer</h1>
               <Setting title="Users">
                  <UserSetting />
               </Setting>
            </div>
            <div className="bg-muted/50 p-4 rounded-lg md:p-6">
               <Suspense fallback={<Spinner />}>
                  <UserTable page={page} />
               </Suspense>
            </div>
         </div>
         <div className="grid auto-rows-min gap-4 md:grid-cols-3">
            <div className="aspect-video rounded-xl bg-muted/50" />
            <div className="aspect-video rounded-xl bg-muted/50" />
            <div className="aspect-video rounded-xl bg-muted/50" />
         </div>
      </>
   );
}
