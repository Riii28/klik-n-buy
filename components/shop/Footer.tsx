export default function Footer() {
   return (
      <section className="px-6 py-10 bg-white border border-light-300 rounded-xl">
         <div className="flex flex-col gap-x-16 gap-y-4 sm:flex-row sm:justify-center sm:items-center text-sm text-center text-dark-300">
            <p className="sm:px-4 cursor-pointer hover:text-dark-500 transition">
               Help Center
            </p>
            <p className="sm:px-4 cursor-pointer hover:text-dark-500 transition">
               Contact Us
            </p>
            <p className="sm:px-4 cursor-pointer hover:text-dark-500 transition">
               Terms of Service
            </p>
            <p className="sm:px-4 cursor-pointer hover:text-dark-500 transition">
               Privacy Policy
            </p>
         </div>
      </section>
   );
}
