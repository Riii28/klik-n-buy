export default function Header({
   title,
   subTitle1,
   subTitle2,
   subTitle3,
}: {
   title: string;
   subTitle1: string;
   subTitle2: string;
   subTitle3: string;
}) {
   return (
      <section className="p-7 bg-white border border-light-300 rounded-xl">
         <div className="flex flex-row items-center">
            <h1 className="flex-2 text-xs font-semibold">{title}</h1>
            <h1 className="flex-1 text-xs text-dark-300 text-center">
               {subTitle1}
            </h1>
            <h1 className="flex-1 text-xs text-dark-300 text-center">
               {subTitle2}
            </h1>
            <h1 className="flex-1 text-xs text-dark-300 text-center">
               {subTitle3}
            </h1>
         </div>
      </section>
   );
}
