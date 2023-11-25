import NextAuth from "next-auth/next";
import { User } from "../models";

declare module "next-auth" {
    interface Session {
        user?: User & {
            accessToken?: string,
            refreshToken?: string,
            expires?: number
        }
    }
}