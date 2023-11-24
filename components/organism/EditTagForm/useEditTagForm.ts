import { db } from "@/lib/firebase";
import { EditTagFormType } from "./form-props";
import { addDoc, collection, doc, setDoc, updateDoc } from "firebase/firestore";
import { useState } from "react";

type TProps = {
    onSubmitSuccess: () => void;
    id?: number;
};

export default function useEditTagForm({ onSubmitSuccess, id }: TProps) {
    const [loading, setLoading] = useState(false);

    async function onSubmit(data: EditTagFormType) {
        try {
            setLoading(true);

            const commonData = {
                ...data,
                updatedAt: new Date(),
            };

            if (!!id) {
                await updateDoc(doc(db, "tags", id), commonData);
            } else {
                const payload = {
                    ...commonData,
                    createdAt: new Date(),
                };

                const ref = await addDoc(collection(db, "tags"), payload);

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
