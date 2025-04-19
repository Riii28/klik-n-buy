import {
   Table,
   TableBody,
   TableCaption,
   TableCell,
   TableHead,
   TableHeader,
   TableRow,
} from "../../ui/table";

export default async function UserTransaction() {
   return (
      <Table className="mt-6">
         <TableCaption>Daftar transaksi</TableCaption>
         <TableHeader>
            <TableRow>
               <TableHead className="w-[100px]">No</TableHead>
               <TableHead>Produk</TableHead>
               <TableHead>Jumlah</TableHead>
               <TableHead>Total</TableHead>
            </TableRow>
         </TableHeader>
         <TableBody>
            <TableRow>
               <TableCell>1</TableCell>
               <TableCell>Kipas</TableCell>
               <TableCell>2</TableCell>
               <TableCell>100.000</TableCell>
            </TableRow>
         </TableBody>
      </Table>
   );
}
