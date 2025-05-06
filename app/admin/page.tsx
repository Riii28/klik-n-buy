import Setting from "@/components/global/Setting";

export default function Page() {
   return (
      <>
         <div className="rounded-lg bg-gradient-to-r from-primary to-accent h-30 p-4 flex items-center">
            <div>
               <h1 className="text-light-200 text-2xl">
                  Welcome to our Dashboard
               </h1>
               <h3 className="text-light-200 text-sm">All product</h3>
            </div>
         </div>
         <div className="flex justify-between items-center relative mt-6">
            <h1 className="text-2xl">Dashboard</h1>
            <Setting title="Dashboard">
               <h1>r</h1>
            </Setting>
         </div>
      </>
   );
}
