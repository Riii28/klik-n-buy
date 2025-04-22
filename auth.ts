import { AuthOptions, Session } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import { loginSchema } from "@/lib/zod/validation";
import { signInWithEmailAndPassword } from "firebase/auth";
import { clientAuth } from "@/lib/firebase/client";
import { adminAuth } from "@/lib/firebase/admin";
import { createUser } from "@/lib/firebase/service/create_user";

export const authOptions: AuthOptions = {
   providers: [
      GoogleProvider({
         clientId: process.env.AUTH_GOOGLE_ID!,
         clientSecret: process.env.AUTH_GOOGLE_SECRET!,
         profile: async (profile) => {
            try {
               const userData = await createUser(profile.sub, {
                  username: profile.name,
                  email: profile.email,
                  profileImage: profile.picture,
               });

               return {
                  id: profile.sub,
                  username: userData.username,
                  email: userData.email,
                  role: userData.role,
                  profileImage: userData.profileImage,
               };
            } catch (err) {
               throw new Error("Terjadi kesalahan saat login dengan Google");
            }
         },
      }),
      CredentialsProvider({
         credentials: {
            email: { label: "Email", type: "text", required: true },
            password: { label: "Password", type: "password", required: true },
         },
         authorize: async (credentials) => {
            try {
               const parsedCredentials = loginSchema.safeParse(credentials);
               if (!parsedCredentials.success) {
                  throw new Error("Email atau Password tidak valid");
               }

               const { email, password } = parsedCredentials.data;
               const userCredential = await signInWithEmailAndPassword(
                  clientAuth,
                  email,
                  password
               );

               const idToken = await userCredential.user.getIdToken();
               const userRecord = await adminAuth.verifyIdToken(idToken);

               const userData = await createUser(userRecord.uid, {
                  username: userRecord.name || "Pengguna",
                  email: userRecord.email!,
                  profileImage: userRecord.picture || null,
               });

               return {
                  id: userRecord.uid,
                  username: userData.username,
                  email: userData.email,
                  role: userData.role,
                  profileImage: userData.profileImage,
               };
            } catch (err) {
               throw new Error(
                  "Login gagal. Periksa kembali email dan password Anda"
               );
            }
         },
      }),
   ],
   callbacks: {
      jwt: async ({ token, user }) => {
         if (user) {
            return { ...token, ...user };
         }
         return token;
      },
      session: async ({ session, token }: { session: Session; token: any }) => {
         session.user = {
            id: token.id,
            email: token.email,
            username: token.username,
            role: token.role,
            profile: token.profileImage,
         };
         return session;
      },
   },
   secret: process.env.AUTH_SECRET,
   pages: {
      signIn: "/auth/sign-in",
   },
};
