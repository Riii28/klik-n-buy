import { adminDb } from "../admin";

interface UserData {
   email: string;
   username: string;
   profileImage: string | null;
}

export async function createUser(uid: string, userData: UserData) {
   try {
      const userRef = adminDb.collection("users").doc(uid);
      const userDoc = await userRef.get();

      if (!userDoc.exists) {
         const newUser = {
            id: uid,
            ...userData,
            role: "Customer",
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
         };
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
      throw new Error("Error creating or updating user");
   }
}
