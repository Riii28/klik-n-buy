import { getCartItems } from "@/lib/firebase/service/get_cart_items";
import Cart from "@/components/shop/Cart";
import Header from "@/components/shop/Header";
import Image from "next/image";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/auth";

export default async function ({
   params,
}: {
   params: Promise<{ slug: string }>;
}) {
   try {
      const session = await getServerSession(authOptions);
      const { slug } = await params;

      const decodeURL = slug.split("-").at(-1);

      if (!decodeURL) {
         throw new Error("Invalid ID");
      }

      const cartItems = await getCartItems(decodeURL);

      return (
         <div className="flex flex-col gap-3.5">
            <Header
               title="Items in Your Cart"
               subTitle1="Price"
               subTitle2="Quantity"
               subTitle3="Total"
            />
            <Cart session={session} cartItems={cartItems} />
         </div>
      );
   } catch (err) {
      const message =
         err instanceof Error
            ? err.message
            : "Something went wrong. Please try again later.";
      return (
         <section className="p-7 bg-white border-1 border-light-300 rounded-xl">
            <div className="w-full h-82 mt-6 flex flex-col justify-center items-center border border-light-300 rounded-lg">
               <Image
                  src="/not-found.svg"
                  alt="Not Found"
                  width={200}
                  height={200}
               />
               <p className="text-sm text-dark-300 text-center mt-4">
                  {message}
               </p>
            </div>
         </section>
      );
   }
}
