import { writeBatch, doc } from "firebase/firestore";
import { db } from "./firebase";

export async function deleteMultipleSubCategories(uuids: string[]): Promise<void> {
    const batch = writeBatch(db);;

    try {
        for (const uuid of uuids) {
            const categoryRef = doc(db, "subcategories", uuid);
            batch.delete(categoryRef);
        }

        await batch.commit();
        console.log("SubCategories deleted successfully!");
    } catch (error) {
        console.error("Error deleting subcategories:", error);
        throw error; // You can handle the error as needed
    }
}