import * as z from "zod"
import { DefaultObject } from "@/types/models";


export const citySchema = z.object({
    name: z.string().min(2).max(50),
    state: z.string().min(2).max(50),
    country: z.string().min(2).max(50),
    lat: z.coerce.number(),
    lng: z.coerce.number(),
    isActive: z.boolean().default(true),
    shippingFee: z.coerce.number().positive().default(0)
})

export type CityPayload = z.infer<typeof citySchema>

export type City = CityPayload & DefaultObject