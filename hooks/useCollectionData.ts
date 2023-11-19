import { DocumentData, Query, onSnapshot } from "firebase/firestore";
import React, { useEffect } from "react";

type TProps = {
    q: Query<any, any>
}
export default function useCollectionData<T extends DocumentData = DocumentData>({ q }: TProps) {
    const [data, setData] = React.useState<T[]>([]);
    useEffect(() => {
        const subscriber = onSnapshot(q, (querySnapshot) => {
            querySnapshot.forEach((doc) => {
                setData((oldArray) => {
                    if (oldArray.some((item) => item.uuid === doc.id)) {
                        return oldArray
                    }
                    return [...oldArray, doc.data() as T]
                });
            });
        });
        return () => subscriber();
    }, []);
    return (
        {
            data
        }
    )
}
