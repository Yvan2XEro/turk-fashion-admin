import { DocumentData, Query, onSnapshot } from "firebase/firestore";
import React, { useEffect } from "react";

type TProps = {
    q: Query<any, any>;
};

export default function useCollectionData<T extends DocumentData = DocumentData>({ q }: TProps) {
    const [data, setData] = React.useState<T[]>([]);

    useEffect(() => {
        const subscriber = onSnapshot(q, (querySnapshot) => {
            const updatedData: T[] = [];

            querySnapshot.forEach((doc) => {
                const docData = doc.data() as T;
                const existingProductIndex = updatedData.findIndex((item) => item.uuid === docData.uuid);

                if (existingProductIndex !== -1) {
                    updatedData[existingProductIndex] = docData;
                } else {
                    updatedData.push(docData);
                }
            });
            updatedData.sort((a, b) => b.updatedAt?.toMillis() - a.updatedAt?.toMillis());

            setData(updatedData);
        });

        return () => subscriber();
    }, [q]);

    return {
        data,
    };
}
