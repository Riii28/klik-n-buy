import Image from "next/image";

export default function Welcome({
   title,
   subtitle,
   imageUrl,
}: {
   title: string;
   subtitle: string;
   imageUrl: string;
}) {
   return (
      <section className="lg:flex-1 relative">
         <div className="p-6 md:p-10 h-full flex flex-col justify-center items-center min-h-[300px] lg:min-h-[340px]">
            <div className="text-center z-10 relative">
               <h1 className="text-2xl md:text-4xl font-bold tracking-wider">
                  {title}
               </h1>
               <h3 className="text-sm text-dark-300">{subtitle}</h3>
            </div>

            <div className="flex-1 flex items-center justify-center my-8">
               <Image
                  src={imageUrl}
                  alt={title}
                  width={260}
                  height={260}
                  className="w-48 h-48 md:w-64 md:h-64 object-contain"
                  priority
               />
            </div>

            <p className="text-xs text-dark-300 text-center absolute bottom-12 left-4 right-4">
               Your information is secure with us
            </p>
         </div>
      </section>
   );
}
