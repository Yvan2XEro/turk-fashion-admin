import * as z from "zod"
import { DefaultObject } from "@/types/models";


export const filterSchema = z.object({
    name: z.string().min(2).max(50),
    values: z.array(z.string().min(1).max(200)),
})

export type FilterPayload = z.infer<typeof filterSchema>
export type Filter = FilterPayload & DefaultObject

