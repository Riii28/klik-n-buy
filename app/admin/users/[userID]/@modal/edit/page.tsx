'use client';

import { usePathname, useRouter } from 'next/navigation';

export default function Page() {
  const router = useRouter();
  const pathname = usePathname()
  const userID = pathname.split('/')[3]

  return (
    <div className="fixed z-50 inset-0 bg-black/40 flex items-center justify-center">
      <div className="bg-light-200 p-4 rounded shadow">
        <h2>Edit user</h2>
        <form>
          {/* form input */}
        </form>
        <button onClick={() => router.back()} className="mt-2 text-sm text-gray-600">
          Tutup
        </button>
      </div>
    </div>
  );
}
