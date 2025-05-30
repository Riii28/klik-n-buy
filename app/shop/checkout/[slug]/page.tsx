import Checkout from "@/components/shop/Checkout";
import Header from "@/components/shop/Header";
import getUserById from "@/lib/firebase/service/get_user_by_id";
import { UserData } from "@/types/user";
import CheckoutTimer from "@/components/shop/CheckoutTimer";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/auth";

export default async function Page({
   params,
}: {
   params: Promise<{ slug: string }>;
}) {
   try {
      const session = await getServerSession(authOptions);
      const { slug } = await params;

      const decodeURL = slug.split("-").at(-1);

      if (!decodeURL) {
         throw new Error("Invalid user ID.");
      }

      const user: UserData = (await getUserById(decodeURL)) as UserData;

      return (
         <div className="flex flex-col gap-3.5">
            <section className="p-7 bg-white border border-light-300 rounded-xl">
               <div className="flex items-start justify-between">
                  <div>
                     <h1 className="font-semibold text-xl">Checkout</h1>
                     <h3 className="text-sm">Delivery Information</h3>
                  </div>
                  <CheckoutTimer />
               </div>
               <div className="flex flex-row items-center mt-6 ">
                  <h1 className="flex-1 font-bold text-lg">{user.username}</h1>
                  <p className="flex-1 text-xs text-center text-dark-300">
                     {user.address || 'Address not set'}
                  </p>
                  <p className="flex-1 text-xs text-center text-dark-300 cursor-not-allowed">
                     Edit Address
                  </p>
               </div>
            </section>
            <Header
               title="Items in Your Cart"
               subTitle1="Price"
               subTitle2="Quantity"
               subTitle3="Total"
            />
            <Checkout userId={decodeURL} session={session} />
         </div>
      );
   } catch (err) {
      const message =
         err instanceof Error
            ? err.message
            : "Something went wrong. Please try again later.";
      return (
         <section className="p-7 bg-white border-1 border-light-300 rounded-xl">
            <div className="h-68 w-full mt-6 flex justify-center items-center border-1 border-light-300 rounded-lg">
               <p className="text-sm text-dark-300 text-center">{message}</p>
            </div>
         </section>
      );
   }
}
