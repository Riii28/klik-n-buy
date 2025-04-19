// types/next-auth.d.ts
import "next-auth";

declare module "next-auth" {
   interface Session {
      user: {
         id?: string;
         username?: string;
         email?: string;
         role?: string;
         profile?: string;
         token?: string;
      };
   }

   interface User {
      id?: string;
      username?: string;
      email?: string;
      role?: string;
      profile?: string;
      token?: string;
   }
}
