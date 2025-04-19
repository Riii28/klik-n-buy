import Setting from "@/components/admin/Setting";
import UserDetailSetting from "@/components/admin/users/UserDetailSetting";
import UserTransaction from "@/components/admin/users/UserTransaction";
import Loading from "@/components/global/LoadingPage";
import getUserById from "@/helpers/get_user_by_id";
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
      const data: UserData = (await getUserById(userID)) as UserData;

      if (!data) {
         throw new Error("Pengguna tidak ditemukan");
      }

      return (
         <>
            <div className="flex justify-between items-center">
               <div>
                  <h1 className="text-lg md:text-2xl">{data.username}</h1>
                  <h1 className="text-dark-300">{data.email}</h1>
               </div>
               <Image
                  className="rounded-full w-13 h-13 md:w-15 md:h-15"
                  src={data.profileImage!}
                  alt={data.username!}
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
            <Suspense fallback={<Loading />}>
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
