import * as z from "zod"

export const editCategoryFormSchema = z.object({
    name: z.string().min(2).max(50),
    photoUrl: z.string(),
})

export type EditCategoryFormType = z.infer<typeof editCategoryFormSchema>