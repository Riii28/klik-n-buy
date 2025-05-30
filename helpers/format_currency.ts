export const formatCurrency = (price: number) => {
   return new Intl.NumberFormat("id-ID", {
      currency: "IDR",
      style: "currency",
   }).format(price);
};
