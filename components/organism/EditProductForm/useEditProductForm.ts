import { db } from "@/lib/firebase";
import { EditProductFormType } from "./edit-product-form";
import { addDoc, collection, doc, setDoc, updateDoc } from "firebase/firestore";
import { useState } from "react";

type TProps = {
    onSubmitSuccess: () => void;
    uuid?: string;
};

export default function useEditProductForm({ onSubmitSuccess, uuid }: TProps) {
    const [loading, setLoading] = useState(false);

    async function onSubmit(data: EditProductFormType) {
        try {
            setLoading(true);

            const commonData = {
                ...data,
                updatedAt: new Date(),
            };

            if (!!uuid) {
                await updateDoc(doc(db, "products", uuid), commonData);
            } else {
                const payload = {
                    ...commonData,
                    createdAt: new Date(),
                };

                const ref = await addDoc(collection(db, "products"), payload);

                await setDoc(ref, {
                    uuid: ref.id,
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
