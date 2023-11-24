import { useSession } from "next-auth/react";
import { useEffect } from "react";

export default function useUpdateSessionInterval() {
    const { status, update } = useSession();
    useEffect(() => {
        if (status !== "authenticated") return;
        const interval = setInterval(async () => {
            await update();
        }, 1000 * 60 * 5);
        return () => clearInterval(interval);
    }, [status, update]);
}