import * as z from "zod"
import { DefaultObject } from "@/types/models";
import { Product } from "./products";


export const stockSchema = z.object({
    product: z.number(),
    quantity: z.coerce.number(),
    totalPrice: z.coerce.number(),
    comment: z.string().max(200).default(""),
    isCurrent: z.boolean().default(true),
})

export type StockPayload = z.infer<typeof stockSchema>
export type Stock = Omit<StockPayload, "product"> & DefaultObject & {
    product: Product
}

