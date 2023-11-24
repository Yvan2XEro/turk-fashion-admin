import * as z from "zod"
import { fetchWithAuth } from "./app-fetch";
import { DefaultObject } from "@/types/models";


export const categorySchema = z.object({
    name: z.string().min(2).max(50),
    photoUrl: z.string()
        /*  */
        .default("https://firebasestorage.googleapis.com/v0/b/turkfasion.appspot.com/o/images%2Fad21d8a7-c775-4d70-ba66-bdc6979ebe0djeans%203.jpeg?alt=media&token=099a054f-c666-4e0d-888a-8dac5dac98f1"),
})

export type CategoryPayload = z.infer<typeof categorySchema>
export type Category = CategoryPayload & DefaultObject


