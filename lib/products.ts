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
