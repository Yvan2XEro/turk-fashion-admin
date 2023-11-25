import { User } from "@/lib/api/users";
import NextAuth from "next-auth/next";

declare module "next-auth" {
    interface Session {
        user?: User & { error: any } & {
            accessToken?: string,
            refreshToken?: string,
            expires?: number
        }
    }
}