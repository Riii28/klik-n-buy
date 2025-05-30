import { formatCurrency } from "@/helpers/format_currency";
import { getTotalRevenue } from "@/lib/firebase/service/get_total_revenue";

export default async function Revenue() {
   try {
      const revenue = await getTotalRevenue();

      return (
         <div className="bg-white border-1 border-light-300 shadow-sm hover:shadow-none duration-200 rounded-lg p-4 md:p-6 min-h-38">
            <h4 className="text-dark-300">Total Revenue</h4>
            <p className="text-xl font-bold mt-4">{formatCurrency(revenue)}</p>
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
