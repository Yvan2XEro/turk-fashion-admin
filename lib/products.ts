import { writeBatch, doc } from "firebase/firestore";
import { db } from "./firebase";

export async function updateProductsStatus(uuids: string[], newStatus: "active" | "inactive"): Promise<void> {
    try {
        const batch = writeBatch(db);;
        uuids.forEach((uuid) => {
            const productRef = doc(db, "products", uuid);
            batch.update(productRef, { status: newStatus, updatedAt: new Date() });
        });

        await batch.commit();
        console.log("Products status updated successfully.");
    } catch (error) {
        console.error("Error updating products status:", error);
        throw error;
    }
}

export async function deleteMultipleProducts(uuids: string[]): Promise<void> {
    const batch = writeBatch(db);;

    try {
        for (const uuid of uuids) {
            const productRef = doc(db, "products", uuid);
            batch.delete(productRef);
        }

        await batch.commit();
        console.log("Products deleted successfully!");
    } catch (error) {
        console.error("Error deleting products:", error);
        throw error; // You can handle the error as needed
    }
}