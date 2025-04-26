export const dynamic = "force-dynamic";

import Setting from "@/components/admin/Setting";
import UserDetailSetting from "@/components/admin/users/UserDetailSetting";
import UserTransaction from "@/components/admin/users/UserTransaction";
import Spinner from "@/components/ui/spinner";
import getUserById from "@/lib/firebase/service/get_user_by_id";
import { UserData } from "@/types/user";
import Image from "next/image";
import { Suspense } from "react";

export default async function Page({
   params,
}: {
   params: Promise<{ userID: string }>;
}) {
   try {
      const { userID } = await params;
      const user: UserData = (await getUserById(userID)) as UserData;

      if (!user) {
         throw new Error("Pengguna tidak ditemukan");
      }

      return (
         <>
            <div className="flex justify-between items-center">
               <div>
                  <h1 className="text-lg md:text-2xl">{user.username}</h1>
                  <h1 className="text-dark-300">{user.email}</h1>
               </div>
               <Image
                  className="rounded-full w-13 h-13 md:w-15 md:h-15"
                  src={user.profileImage!}
                  alt={user.username!}
                  width={40}
                  height={40}
               />
            </div>
            <div className="flex justify-between items-center mt-6 relative">
               <h1 className="text-2xl">Riwayat transaksi</h1>
               <Setting title="Users Detail">
                  <UserDetailSetting userID={userID} />
               </Setting>
            </div>
            <Suspense fallback={<Spinner />}>
               <UserTransaction />
            </Suspense>
         </>
      );
   } catch (err) {
      const message: string =
         err instanceof Error ? err.message : "Unknown error";
      return <h1>{message}</h1>;
   }
}
