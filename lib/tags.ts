import { writeBatch, doc } from "firebase/firestore";
import { db } from "./firebase";

export async function deleteMultipleTags(uuids: string[]): Promise<void> {
    const batch = writeBatch(db);;

    try {
        for (const uuid of uuids) {
            const categoryRef = doc(db, "tags", uuid);
            batch.delete(categoryRef);
        }

        await batch.commit();
        console.log("Tags deleted successfully!");
    } catch (error) {
        console.error("Error deleting tags:", error);
        throw error; // You can handle the error as needed
    }
}