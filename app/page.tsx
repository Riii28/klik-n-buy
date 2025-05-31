import Link from "next/link";

export default function Page() {
   return (
      <main className="min-h-screen p-4 sm:p-6 lg:p-10 bg-gradient-to-br from-slate-50 via-white to-blue-50">
         <section className="bg-white/80 backdrop-blur-sm h-full shadow-md rounded-2xl border border-light-300 flex justify-center items-center flex-col text-center px-6 py-12 sm:px-8 lg:px-16 relative overflow-hidden">
            <div className="absolute top-0 left-0 w-32 h-32 bg-gradient-to-br from-blue-100 to-purple-100 rounded-full opacity-60 -translate-x-16 -translate-y-16"></div>
            <div className="absolute bottom-0 right-0 w-24 h-24 bg-gradient-to-br from-pink-100 to-orange-100 rounded-full opacity-60 translate-x-12 translate-y-12"></div>
            <div className="absolute top-1/3 right-1/4 w-2 h-2 bg-blue-300 rounded-full opacity-40"></div>
            <div className="absolute bottom-1/3 left-1/4 w-3 h-3 bg-purple-300 rounded-full opacity-30"></div>

            <div className="relative z-10 max-w-2xl">
               <div className="mb-6 sm:mb-8">
                  <span className="inline-block px-4 py-1.5 bg-gradient-to-r from-blue-100 to-purple-100 text-primary text-xs sm:text-sm font-medium rounded-full mb-6 border border-blue-200">
                     ✨ Premium Collection
                  </span>

                  <h1 className="font-bold text-3xl sm:text-4xl lg:text-5xl xl:text-6xl mb-4 bg-gradient-to-r from-gray-900 via-blue-800 to-primary bg-clip-text text-transparent leading-tight">
                     Elevate Your Everyday Experience
                  </h1>

                  <p className="text-gray-600 text-base sm:text-lg lg:text-xl max-w-xl mx-auto leading-relaxed">
                     Discover curated products thoughtfully designed to enhance
                     your lifestyle and bring joy to every moment
                  </p>
               </div>

               <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                  <Link
                     href="/shop"
                     className="group inline-flex items-center justify-center px-8 py-3 sm:px-10 sm:py-4 text-white bg-gradient-to-r from-blue-600 to-primary rounded-xl font-semibold shadow-lg hover:shadow-xl hover:from-blue-700 hover:to-purple-700 transition-all duration-300 transform hover:-translate-y-1 min-w-[200px]"
                  >
                     Discover Now
                     <svg
                        className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform duration-300"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                     >
                        <path
                           strokeLinecap="round"
                           strokeLinejoin="round"
                           strokeWidth={2}
                           d="M17 8l4 4m0 0l-4 4m4-4H3"
                        />
                     </svg>
                  </Link>

                  <Link
                     href="#"
                     className="inline-flex cursor-not-allowed items-center justify-center px-8 py-3 sm:px-10 sm:py-4 text-gray-700 bg-white border-1 border-light-300 rounded-xl font-semibold hover:border-gray-300 hover:bg-gray-50 transition-all duration-300 min-w-[200px]"
                  >
                     Learn More
                  </Link>
               </div>

               <div className="mt-12 pt-8 border-t border-light-300">
                  <p className="text-xs sm:text-sm mb-4">
                     Trusted by thousands of customers
                  </p>
                  <div className="flex justify-center items-center gap-6 opacity-60">
                     <div className="flex items-center gap-1">
                        <div className="flex">
                           {[...Array(5)].map((_, i) => (
                              <svg
                                 key={i}
                                 className="w-4 h-4 text-yellow-400 fill-current"
                                 viewBox="0 0 20 20"
                              >
                                 <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                              </svg>
                           ))}
                        </div>
                        <span className="text-sm font-medium text-gray-600 ml-1">
                           4.9
                        </span>
                     </div>
                     <div className="text-sm text-dark-300">•</div>
                     <div className="text-sm text-dark-300">
                        10,000+ Reviews
                     </div>
                     <div className="text-sm text-dark-300">•</div>
                     <div className="text-sm text-dark-300">Free Shipping</div>
                  </div>
               </div>
            </div>
         </section>
      </main>
   );
}
