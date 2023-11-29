import * as z from "zod"
import { DefaultObject } from "@/types/models";


export const categorySchema = z.object({
    name: z.string().min(2).max(50),
    photoUrl: z.string()
    /*  */
    ,
})

export type CategoryPayload = z.infer<typeof categorySchema>
export type Category = CategoryPayload & DefaultObject


