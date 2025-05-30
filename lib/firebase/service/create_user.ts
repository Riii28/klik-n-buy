import { generateID } from "@/helpers/generate_id";
import { adminDb } from "../admin";

interface UserData {
   email: string;
   username: string;
   profileImage: string | null;
}

export const createUser = async (uid: string, userData: UserData) => {
   try {
      const userRef = adminDb.collection("users").doc(uid);
      const userDoc = await userRef.get();

      if (!userDoc.exists) {
         const createdAt = new Date().toISOString();

         const newUser = {
            id: uid,
            ...userData,
            role: "Customer",
            createdAt,
            updatedAt: createdAt,
         };

         const cartRef = adminDb
            .collection("carts")
            .doc(generateID(userData.username));

         const cartDoc = await cartRef.get();

         if (!cartDoc.exists) {
            const cart = {
               userId: uid,
               createdAt,
               updatedAt: createdAt,
            };
            await cartRef.set(cart);
         }

         await userRef.set(newUser);
         return newUser;
      }

      const existingData = userDoc.data()!;

      const updatedUser = {
         ...existingData,
         ...userData,
         role: existingData.role || "Customer",
         updatedAt: new Date().toISOString(),
      };

      await userRef.update(updatedUser);
      return updatedUser;
   } catch (err) {
      throw new Error("Something went wrong. Please try again later.");
   }
};
