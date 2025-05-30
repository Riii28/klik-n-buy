import Image from "next/image";

export default function Page() {
   return (
      <section className="p-7 bg-white border border-light-300 rounded-xl">
         <div className="w-full h-82 mt-6 flex flex-col justify-center items-center border border-light-300 rounded-lg">
            <Image
               src="/not-found.svg"
               alt="Not Found"
               width={200}
               height={200}
            />
            <p className="text-sm text-dark-300 text-center mt-4">
               The URL you're looking for was not found.
            </p>
         </div>
      </section>
   );
}
