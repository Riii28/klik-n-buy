import { getAllProducts } from "@/lib/firebase/service/get_all_products";
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
      const products: Product[] = await getAllProducts(currentPage, LIMIT);

      if (!products || products.length === 0) {
         throw new Error("Tidak ada produk");
      }

      return (
         <Table className="mt-6">
            <TableHeader className="font-bold">
               <TableRow>
                  <TableHead className="w-[100px]">No</TableHead>
                  <TableHead>Name</TableHead>
                  <TableHead className="w-[200px]">Description</TableHead>
                  <TableHead>Price</TableHead>
                  <TableHead>Stock</TableHead>
                  <TableHead>Category</TableHead>
                  <TableHead>Created At</TableHead>
                  <TableHead>Updated At</TableHead>
               </TableRow>
            </TableHeader>
            <TableBody>
               {products.map((product: any, i: any) => (
                  <TableRow key={i}>
                     <TableCell>{i + 1}</TableCell>
                     <TableCell>{product.name}</TableCell>
                     <TableCell
                        className="w-[200px] max-w-[200px]"
                        title={product.description}
                     >
                        <p className="truncate">{product.description}</p>
                     </TableCell>
                     <TableCell>{product.price}</TableCell>
                     <TableCell>{product.stock}</TableCell>
                     <TableCell>{product.category}</TableCell>
                     <TableCell>{product.createdAt}</TableCell>
                     <TableCell>{product.updatedAt}</TableCell>
                  </TableRow>
               ))}
            </TableBody>
            <TableFooter>
               <TableRow className="font-bold">
                  <TableCell colSpan={7}>Total:</TableCell>
                  <TableCell>{totalProducts} Users</TableCell>
               </TableRow>
            </TableFooter>
         </Table>
      );
   } catch (err) {
      return <div>Error loading products</div>;
   }
}
