import * as z from "zod"
import { DefaultObject } from "@/types/models";


export const userSchema = z.object({
    name: z.string().min(2).max(50),
    email: z.string().min(2).max(50),
    photo: z.string().default(""),
    password: z.string().min(4).max(50).nullable(),
})

export const updateUserSchema = z.object({
    name: z.string().min(2).max(50),
    email: z.string().min(2).max(50),
    photo: z.string().default(""),
})

export type UserPayload = z.infer<typeof userSchema>
export type User = Omit<UserPayload, "password"> & DefaultObject


