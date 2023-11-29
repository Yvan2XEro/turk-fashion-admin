import * as z from "zod"
import { DefaultObject } from "@/types/models";
import { SubCategory } from "./sub-categories";

const FilterSchema = z.object({
    name: z.string(),
    value: z.string(),
})

export const productSchema = z.object({
    name: z.string().min(2).max(200),
    photoUrl: z.string()
    /*  */


    ,
    subCategory: z.number(),
    price: z.coerce.number().positive(),
    status: z.enum(["active", "inactive"]).default("inactive"),
    tags: z.array(z.string()),
    filtersValues: z.array(FilterSchema),
    slug: z.string().default(""),
    description: z.string().default(""),
})

export type ProductPayload = z.infer<typeof productSchema>
export type Product = Omit<ProductPayload, "subCategory"> & DefaultObject & {
    subCategory: SubCategory
    currentStock: number
}

