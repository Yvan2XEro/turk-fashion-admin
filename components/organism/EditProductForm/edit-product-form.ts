import * as z from "zod"

export const editProductFormSchema = z.object({
    name: z.string().min(2).max(50),
    price: z.coerce.number().positive(),
    // price: z.preprocess((a) => parseInt(z.string().parse(a), 10), z.number().positive()),
    description: z.string().default(""),
    photoUrl: z.string(),
    categoryUuid: z.string(),
    subCategoryUuid: z.string(),
    filters: z.record(z.string()).default({}),
    tags: z.array(z.string()),
})

export type EditProductFormType = z.infer<typeof editProductFormSchema>