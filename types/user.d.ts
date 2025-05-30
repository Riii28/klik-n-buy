export interface UserData {
   id?: string;
   username?: string;
   profileImage?: string;
   role?: "Pengguna" | "Admin";
   email?: string;
   createdAt?: string;
   address: string
}
