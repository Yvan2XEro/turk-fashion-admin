import * as z from "zod"

export const editProductFormSchema = z.object({
    name: z.string().min(2).max(50),
    price: z.number().min(0),
    description: z.string().default(""),
    photoUrl: z.string(),
    categoryUuid: z.string(),
    subCategoryUuid: z.string(),
    filters: z.record(z.string()),
    tags: z.array(z.string()),
})

export type EditProductFormType = z.infer<typeof editProductFormSchema>