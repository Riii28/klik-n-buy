import Link from "next/link";

export default function Page() {
   return (
      <main className="h-screen p-10">
         <section className="bg-white h-full shadow-md rounded-lg border-1 border-light-300 flex justify-center items-center flex-col">
            <div>
               <h1 className="font-bold text-4xl">Elevate Your Everyday Experience</h1>
               <p className="text-dark-300">Curated products designed to enhance your lifestyle</p>
               <button className="mt-8 px-10 py-2 text-light-200 bg-primary rounded-xl font-semibold hover:bg-primary/80">
                  <Link href={'/shop'}>Discover Now</Link>
               </button>
            </div>
         </section>
      </main>
   );
}
