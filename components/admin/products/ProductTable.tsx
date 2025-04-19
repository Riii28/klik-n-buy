import getAllProducts from "@/helpers/get_all_products";
import {
   Table,
   TableBody,
   TableCaption,
   TableCell,
   TableHead,
   TableHeader,
   TableRow,
} from "../../ui/table";
import { Product } from "@/types/product";

export default async function ProductTable() {
   try {
      const data: Product[] = (await getAllProducts()) as Product[];

      if (!data || data.length === 0) {
         throw new Error("Tidak ada produk");
      }

      return (
         <Table className="mt-6">
            <TableCaption>Daftar produk</TableCaption>
            <TableHeader>
               <TableRow>
                  <TableHead className="w-[100px]">No</TableHead>
                  <TableHead>Name</TableHead>
                  <TableHead className="w-[100px]">Description</TableHead>
                  <TableHead>Price</TableHead>
                  <TableHead>Stock</TableHead>
                  <TableHead>Category</TableHead>
                  <TableHead>Created At</TableHead>
                  <TableHead>Updated At</TableHead>
               </TableRow>
            </TableHeader>
            <TableBody>
               {data.map((product, i) => (
                  <TableRow key={i}>
                     <TableCell>{i + 1}</TableCell>
                     <TableCell>{product.name}</TableCell>
                     <TableCell className="w-[100px]">
                        {product.description}
                     </TableCell>
                     <TableCell>{product.price}</TableCell>
                     <TableCell>{product.stock}</TableCell>
                     <TableCell>{product.category}</TableCell>
                     <TableCell>{product.createdAt}</TableCell>
                     <TableCell>{product.updatedAt}</TableCell>
                  </TableRow>
               ))}
            </TableBody>
         </Table>
      );
   } catch (err) {}
}
