import { AuthOptions } from 'next-auth';
import CredentialsProvider from "next-auth/providers/credentials";
import { signIn } from "next-auth/react";

const pubAPI = process.env.NEXT_PUBLIC_API_URL

export const authOptions: AuthOptions = {
    providers: [
        CredentialsProvider({
            name: "Credentials",
            credentials: {
                email: { label: "Email", type: "text" },
                password: { label: "Mot de passe", type: "password" },
            },
            async authorize(credentials, req) {
                if (!credentials) return
                const payload = {
                    email: credentials.email,
                    password: credentials.password,
                };
                const res = await fetch(pubAPI + "/auth/login", {
                    method: "POST",
                    body: JSON.stringify(payload),
                    headers: { "Content-Type": "application/json" },
                    credentials: "include",
                });
                let loginData = await res.json();
                let authData = loginData

                if (!res.ok) {
                    if (res.status === 401)
                        throw new Error("Wrong email or password.");
                    throw new Error("Something went wrong, please try again.");
                }

                const userDataResponse = await fetch(pubAPI + "/auth/me", {
                    method: "GET",
                    credentials: "include",
                    headers: {
                        Authorization: `Bearer ${loginData.accessToken}`,
                    }
                })

                if (res.ok && authData && userDataResponse.ok) {
                    const userData = await userDataResponse.json();
                    authData.data = { ...authData, ...userData };
                    return authData
                }

                return null;
            },
        }),
    ],

    jwt: {
        secret: process.env.NEXTAUTH_SECRET,
        maxAge: 1000,
    },
    callbacks: {
        async jwt({ token, user, account }: any) {
            console.log("sssssSESSION", token)

            if (account && user) {
                const accessToken = user.data.accessToken
                const refreshToken = user.data.refreshToken
                delete user.data.accessToken
                delete user.data.refreshToken
                const expires = Date.now() + user.data.expires - 2000

                return {
                    ...token,
                    ...user.data,
                    ...account,
                    error: user.data.error,
                    refreshToken,
                    accessToken,
                    expires,
                };
            }

            if (Date.now() < token.exp) {

                return token;
            }

            // console.log("2 Expired token:", token.refreshToken);
            // console.log("2 Expires after expiered:", token.expires);
            // console.log("2 Now:", Date.now());

            if (!token.refreshToken) {
                return {
                    ...token,
                    error: "NotRefreshToken",
                }
            };

            const refreshed = await refreshAccessToken(token);
            return refreshed;
        },

        async session({ session, token }) {
            console.log("sssssSESSION", token)
            session.user = token as any;
            return session;
        },
    },
    secret: process.env.NEXTAUTH_SECRET,
    pages: {
        signIn: "/login",
    },
    debug: true,
};

async function refreshAccessToken(token: any) {
    try {
        const response = await fetch(pubAPI + "/auth/refresh", {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token.refreshToken}`,
            },
            credentials: "include",
        });

        const refreshedTokens = await response.json();

        if (!response.ok) {
            signIn();
        }

        if (response.ok && refreshedTokens) {

            return {
                ...token,
                ...refreshedTokens,
            };
        }
    } catch (error) {
        console.log(
            new Date().toUTCString() + " Error in refreshAccessToken:",
            error
        );

        return {
            ...token,
            error: "RefreshAccessTokenError",
        };
    }
}
// New token ntD8Y1s6u_WsdCtljesoMk5C4CapjcGEIZziRZttkoU-wBkFmC2Ufr_M5vq2hQrN