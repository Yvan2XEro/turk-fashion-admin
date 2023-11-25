import * as z from "zod"
import { DefaultObject } from "@/types/models";
import { SubCategory } from "./sub-categories";

const FilterSchema = z.tuple([z.string(), z.number(), z.string()]);

export const productSchema = z.object({
    name: z.string().min(2).max(200),
    photoUrl: z.string()
        /*  */
        .default("https://firebasestorage.googleapis.com/v0/b/turkfasion.appspot.com/o/images%2Fad21d8a7-c775-4d70-ba66-bdc6979ebe0djeans%203.jpeg?alt=media&token=099a054f-c666-4e0d-888a-8dac5dac98f1")

    ,
    subCategory: z.number(),
    price: z.coerce.number().positive(),
    status: z.enum(["active", "inactive"]).default("inactive"),
    tags: z.array(z.string()),
    filters: z.array(FilterSchema),
    slug: z.string().default(""),
    description: z.string().default(""),
})

export type ProductPayload = z.infer<typeof productSchema>
export type Product = Omit<ProductPayload, "subCategory"> & DefaultObject & {
    subCategory: SubCategory
    currentStock: number
}

