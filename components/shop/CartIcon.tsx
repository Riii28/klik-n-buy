import { authOptions } from "@/auth";
import { generateID } from "@/helpers/generate_id";
import { countProductsInCart } from "@/lib/firebase/service/count_products_in_cart";
import { faCartShopping } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { getServerSession } from "next-auth/next";
import Link from "next/link";
import { redirect } from "next/navigation";

export default async function CartIcon() {
   try {
      const session = await getServerSession(authOptions);

      if (!session || !session.user.username) {
         redirect("/auth/sign-in");
      }

      const productInCart = await countProductsInCart(session.user.username);
      const formatURL = (url: string) => url.toLowerCase().replace(/\s+/g, "-");
      const cartId = generateID(session.user.username);

      return (
         <Link
            href={`/shop/cart/${formatURL(
               `${session.user.username} ${cartId}`
            )}`}
            className="relative"
         >
            <FontAwesomeIcon size="lg" icon={faCartShopping} />
            <div className="absolute top-3 left-3 bg-primary rounded-[50%] flex w-4 h-4 justify-center items-center">
               <p className="text-xs text-light-200">{productInCart}</p>
            </div>
         </Link>
      );
   } catch (err) {
      return null;
   }
}
