"use client";

import SearchBar from "@/components/global/search-bar";
import { Product } from "@/types/product";
import {
   Table,
   TableBody,
   TableCell,
   TableHead,
   TableHeader,
   TableRow,
} from "../../ui/table";

export default function ProductSearchWrapper() {
   return (
      <SearchBar
         endpoint="/api/admin/products/search"
         placeholder="Search product by name"
         renderResult={(products: Product[]) => (
            <div className="absolute w-full shadow-md z-10 bg-muted p-4 mt-4 rounded-lg md:p-6 border-1">
               <Table>
                  <TableHeader>
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
               </Table>
               {products.length > 10 && (
                  <p className="p-4 text-center text-dark-300 text-sm">
                     10 of {products.length} users shown
                  </p>
               )}
            </div>
         )}
      />
   );
}
