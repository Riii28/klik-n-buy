export interface Banner {
   id?: string;
   title: string
   subtitle: string;
   imageUrl: string;
   linkTo: string;
   isActive: boolean;
   priority: number;
   position: "left" | "middle" | "right";
   createdAt: string;
   updatedAt: string;
}



