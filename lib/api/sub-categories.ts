import * as z from "zod"
import { DefaultObject } from "@/types/models";
import { Category } from "./categories";
import { Filter } from "./filters";


export const subCategorySchema = z.object({
    name: z.string().min(2).max(30),
    category: z.number(),
    filters: z.array(z.number()).default([]),
    photoUrl: z.string()
    /*  */
    ,
})

export type SubCategoryPayload = z.infer<typeof subCategorySchema>
export type SubCategory = Omit<Omit<SubCategoryPayload, "filters">, "category"> & DefaultObject & {
    category: Category,
    filters: Filter[]
}
