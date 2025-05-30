import {
   Table,
   TableBody,
   TableCaption,
   TableCell,
   TableHead,
   TableHeader,
   TableRow,
   TableFooter,
} from "../../ui/table";
import { Product } from "@/types/product";
import DeleteProductButton from "./DeleteProductButton";
import { getProducts } from "@/lib/firebase/service/get_products";
import { cn } from "@/lib/utils";
import { formatCurrency } from "@/helpers/format_currency";
import { truncateText } from "@/helpers/truncate_text";

export default async function ProductTable({
   page,
   LIMIT,
   totalProducts,
   className,
}: {
   className?: string;
   page?: string;
   LIMIT: number;
   totalProducts: number;
}) {
   try {
      const currentPage = parseInt(page ?? "1");
      const products: Product[] = (await getProducts(
         currentPage,
         LIMIT
      )) as Product[];

      if (!products || products.length === 0) {
         return (
            <div className="text-center text-gray-500 py-6">
               No products found.
            </div>
         );
      }

      return (
         <div className={cn("w-full overflow-x-auto", className)}>
            <Table className="min-w-[800px]">
               <TableCaption className="text-muted-foreground text-sm mt-2">
                  Displaying {products.length} of {totalProducts} total products
               </TableCaption>
               <TableHeader className="font-bold">
                  <TableRow>
                     <TableHead className="whitespace-nowrap">No</TableHead>
                     <TableHead>Name</TableHead>
                     <TableHead>Description</TableHead>
                     <TableHead>Price</TableHead>
                     <TableHead>Stock</TableHead>
                     <TableHead>Category</TableHead>
                     <TableHead>Created</TableHead>
                     <TableHead>Updated</TableHead>
                     <TableHead className="whitespace-nowrap">Action</TableHead>
                  </TableRow>
               </TableHeader>
               <TableBody>
                  {products.map((product, index) => (
                     <TableRow key={product.id}>
                        <TableCell>
                           {(currentPage - 1) * LIMIT + index + 1}
                        </TableCell>
                        <TableCell>{product.name}</TableCell>
                        <TableCell title={product.description}>
                           {truncateText(product.description, 30)}
                        </TableCell>
                        <TableCell>{formatCurrency(product.price)}</TableCell>
                        <TableCell>{product.stock}</TableCell>
                        <TableCell className="capitalize">
                           {product.category}
                        </TableCell>
                        <TableCell>{product.createdAt}</TableCell>
                        <TableCell>{product.updatedAt}</TableCell>
                        <TableCell>
                           <DeleteProductButton productID={product.id} />
                        </TableCell>
                     </TableRow>
                  ))}
               </TableBody>
               <TableFooter>
                  <TableRow>
                     <TableCell colSpan={8} className="font-semibold">
                        Total
                     </TableCell>
                     <TableCell className="font-semibold">
                        {totalProducts} Products
                     </TableCell>
                  </TableRow>
               </TableFooter>
            </Table>
         </div>
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
