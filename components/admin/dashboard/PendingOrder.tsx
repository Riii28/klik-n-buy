import { countPendingOrders } from "@/lib/firebase/service/count_pending_order";

export default async function PendingOrder() {
   try {
      const count = await countPendingOrders();

      return (
         <div className="bg-white border-1 hover:shadow-none duration-200 border-light-300 shadow-sm rounded-lg p-4 md:p-6 min-h-38">
            <h4 className="text-dark-300">Pending Orders</h4>
            <p className="text-xl font-bold mt-4">{count}</p>
         </div>
      );
   } catch (err) {
      const message =
         err instanceof Error
            ? err.message
            : "Something went wrong. Please try again later.";
      return (
         <div className="bg-white border-1 flex justify-center items-center border-light-300 shadow-sm rounded-lg p-4 md:p-6 min-h-38">
            <h1 className="text-sm text-dark-300 text-center">{message}</h1>
         </div>
      );
   }
}
