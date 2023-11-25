import { useSession, signIn, signOut } from 'next-auth/react';
import { useEffect } from 'react';


function useRestoreSessionToken(): void {
    const { data: session, status } = useSession();
    useEffect(() => {
        if (!session?.user?.accessToken)
            return;
        localStorage.setItem("auth_token", session.user.accessToken as string)
    }, [session?.user?.accessToken, status]);

    useEffect(() => {
        if ((session?.user?.error === "RefreshAccessTokenError" || session?.user?.error === "NotRefreshToken") && status === "authenticated") {
            signOut()
        }
        if (status === "unauthenticated") {
            // (async () => await signOut())()
            localStorage.removeItem("auth_token")
        }
    }, [session?.user?.error, status])
}

export default useRestoreSessionToken;


