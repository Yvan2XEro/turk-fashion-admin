import NextAuth from "next-auth/next";

declare module "next-auth" {
    interface Session {
        user?: { error: any } & {
            accessToken?: string,
            refreshToken?: string,
            expires?: number
        }
    }
}