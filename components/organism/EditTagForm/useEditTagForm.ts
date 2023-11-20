import { db } from "@/lib/firebase";
import { EditTagFormType } from "./form-props";
import { addDoc, collection, doc, setDoc, updateDoc } from "firebase/firestore";
import { useState } from "react";

type TProps = {
    onSubmitSuccess: () => void;
    uuid?: string;
};

export default function useEditTagForm({ onSubmitSuccess, uuid }: TProps) {
    const [loading, setLoading] = useState(false);

    async function onSubmit(data: EditTagFormType) {
        try {
            setLoading(true);

            const commonData = {
                ...data,
                updatedAt: new Date(),
            };

            if (!!uuid) {
                await updateDoc(doc(db, "tags", uuid), commonData);
            } else {
                const payload = {
                    ...commonData,
                    createdAt: new Date(),
                };

                const ref = await addDoc(collection(db, "tags"), payload);

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
