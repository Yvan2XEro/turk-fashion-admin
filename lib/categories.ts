import { writeBatch, doc } from "firebase/firestore";
import { db } from "./firebase";

export async function deleteMultipleCategories(uuids: string[]): Promise<void> {
    const batch = writeBatch(db);;

    try {
        for (const uuid of uuids) {
            const categoryRef = doc(db, "categories", uuid);
            batch.delete(categoryRef);
        }

        await batch.commit();
        console.log("Categories deleted successfully!");
    } catch (error) {
        console.error("Error deleting categories:", error);
        throw error; // You can handle the error as needed
    }
}