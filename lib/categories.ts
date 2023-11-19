import { writeBatch, doc } from "firebase/firestore";
import { db } from "./firebase";

export async function updateCategoriesStatus(uuids: string[], newStatus: "active" | "inactive"): Promise<void> {
    try {
        const batch = writeBatch(db);;
        uuids.forEach((uuid) => {
            const categoryRef = doc(db, "categories", uuid);
            batch.update(categoryRef, { status: newStatus, updatedAt: new Date() });
        });

        await batch.commit();
        console.log("Categories status updated successfully.");
    } catch (error) {
        console.error("Error updating categories status:", error);
        throw error;
    }
}

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