import { writeBatch, doc } from "firebase/firestore";
import { db } from "./firebase";

export async function deleteMultipleFilters(uuids: string[]): Promise<void> {
    const batch = writeBatch(db);;

    try {
        for (const uuid of uuids) {
            const categoryRef = doc(db, "filters", uuid);
            batch.delete(categoryRef);
        }

        await batch.commit();
        console.log("Filters deleted successfully!");
    } catch (error) {
        console.error("Error deleting filters:", error);
        throw error; // You can handle the error as needed
    }
}