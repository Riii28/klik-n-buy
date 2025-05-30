import { AuthOptions, Session } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import { signInSchema } from "@/lib/zod/validation";
import { signInWithEmailAndPassword } from "firebase/auth";
import { clientAuth } from "@/lib/firebase/client";
import { adminAuth } from "@/lib/firebase/admin";
import { createUser } from "@/lib/firebase/service/create_user";
import { generateID } from "./helpers/generate_id";

export const authOptions: AuthOptions = {
   providers: [
      GoogleProvider({
         clientId: process.env.AUTH_GOOGLE_ID!,
         clientSecret: process.env.AUTH_GOOGLE_SECRET!,
         profile: async (profile) => {
            try {
               const hashedId = generateID(profile.email);

               const userData = await createUser(hashedId, {
                  username: profile.name,
                  email: profile.email,
                  profileImage: profile.picture,
               });

               return {
                  id: hashedId,
                  username: userData.username,
                  email: userData.email,
                  role: userData.role,
                  profileImage: userData.profileImage,
               };
            } catch (err) {
               throw new Error("An error occurred during Google sign in.");
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
               const parsedCredentials = signInSchema.safeParse(credentials);
               if (!parsedCredentials.success) {
                  throw new Error("Invalid email or password.");
               }

               const { email, password } = parsedCredentials.data;
               const userCredential = await signInWithEmailAndPassword(
                  clientAuth,
                  email,
                  password
               );

               const idToken = await userCredential.user.getIdToken();
               const userRecord = await adminAuth.verifyIdToken(idToken);

               const hashedId = generateID(userRecord.email!);

               const userData = await createUser(hashedId, {
                  username: userRecord.name || "User",
                  email: userRecord.email!,
                  profileImage: userRecord.picture || null,
               });

               return {
                  id: hashedId,
                  username: userData.username,
                  email: userData.email,
                  role: userData.role,
                  profileImage: userData.profileImage,
               };
            } catch (err) {
               throw new Error(
                  "Sign in failed. Please check your email and password."
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
   session: {
      strategy: "jwt",
      maxAge: 30 * 24 * 60 * 60,
   },
   secret: process.env.AUTH_SECRET,
   pages: {
      signIn: "/auth/sign-in",
      newUser: "/shop",
   },
};
