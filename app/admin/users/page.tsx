import Setting from "@/components/admin/Setting";
import UserSetting from "@/components/admin/users/UserSetting";
import UserTable from "@/components/admin/users/UserTable";
import Loading from "@/components/global/LoadingPage";
import { Suspense } from "react";

export default function Page() {
   return (
      <>
         <div className="flex justify-between items-center relative">
            <h1 className="text-2xl">Data customer</h1>
            <Setting title="Users">
               <UserSetting />
            </Setting>
         </div>
         <Suspense fallback={<Loading />}>
            <UserTable />
         </Suspense>
      </>
   );
}
