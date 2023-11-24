import { db } from "@/lib/firebase";
import { EditProductFormType } from "./edit-product-form";
import { addDoc, collection, doc, setDoc, updateDoc } from "firebase/firestore";
import { useState } from "react";

type TProps = {
    onSubmitSuccess: () => void;
    id?: number;
};

export default function useEditProductForm({ onSubmitSuccess, id }: TProps) {
    const [loading, setLoading] = useState(false);

    async function onSubmit(data: EditProductFormType) {
        try {
            setLoading(true);

            const commonData = {
                ...data,
                updatedAt: new Date(),
            };

            if (!!id) {
                await updateDoc(doc(db, "products", id), commonData);
            } else {
                const payload = {
                    ...commonData,
                    createdAt: new Date(),
                };

                const ref = await addDoc(collection(db, "products"), payload);

                await setDoc(ref, {
                    id: ref.id,
                    ...payload,
                });
            }

            setLoading(false);
            onSubmitSuccess();
        } catch (error) {
            console.error("Error:", error);
        }
    }

    return {
        onSubmit,
        loading,
    };
}
