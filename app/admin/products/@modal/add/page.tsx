import AddProductForm from '@/components/admin/products/AddProductForm';
import BackButton from '@/components/global/BackButton';

export default function Page() {
  return (
    <div className="fixed z-50 inset-0 bg-black/40 flex items-center justify-center">
      <div className="bg-white p-4 rounded shadow">
        <h2>Tambah Produk</h2>
        <AddProductForm />
        <BackButton />
      </div>
    </div>
  );
}