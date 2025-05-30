import { adminDb } from "../admin";

export const getBanners = async () => {
   try {
      const snapshot = await adminDb
         .collection("banners")
         .where("isActive", "==", true)
         .get();

      if (snapshot.empty) {
         throw new Error("No banners available at the moment");
      }

      const banners = snapshot.docs.map((doc) => ({
         id: doc.id,
         ...doc.data(),
      }));

      return banners;
   } catch (err) {
      if (err instanceof Error) {
         throw err;
      }
      throw new Error("Something went wrong. Please try again later.");
   }
};
