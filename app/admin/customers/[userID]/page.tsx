import Setting from "@/components/global/Setting";
import UserDetailSetting from "@/components/admin/users/UserDetailSetting";
import getUserById from "@/lib/firebase/service/get_user_by_id";
import { UserData } from "@/types/user";
import Image from "next/image";

export default async function Page({
   params,
}: {
   params: Promise<{ userID: string }>;
}) {
   try {
      const { userID } = await params;
      const user: UserData = (await getUserById(userID)) as UserData;

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
               <h1 className="text-2xl">Transaction History</h1>
               <Setting title="Users Detail">
                  <UserDetailSetting userID={userID} />
               </Setting>
            </div>
            <div className="w-full h-82 mt-6 flex flex-col justify-center items-center border border-light-300 rounded-lg">
               <Image
                  src="/under-dev.svg"
                  alt="under development"
                  width={200}
                  height={200}
               />
               <p className="text-sm text-dark-300 text-center mt-4">
                  User Detail page is currently under development. Please check back
                  later.
               </p>
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
