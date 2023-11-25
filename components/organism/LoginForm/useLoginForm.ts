import { LoginCredentials } from "@/lib/api/login";
import { SignInResponse, signIn } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import { useLocalStorage } from "usehooks-ts";

export function useLoginForm() {
    const [response, setResponse] = useState<SignInResponse>();
    const router = useRouter()
    const params = useSearchParams();

    const [_, setIsUnauthorized] = useLocalStorage(
        "is-unauthorized",
        false
    );

    async function submit(data: LoginCredentials) {
        const response = await signIn("credentials", { ...data, redirect: false });
        setResponse(response);
        if (response?.ok) {
            setIsUnauthorized(false)
            router.push(params.get("callbackUrl") || "/");
        }
    }

    return {
        submit,
        response,
    }
}