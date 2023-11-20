import * as z from "zod"

export const editSubCategoryFormSchema = z.object({
    name: z.string().min(2).max(30),
    photoUrl: z.string(),
    categoryUuid: z.string(),
    filters: z.array(z.string()).default([]),
})

export type EditSubCategoryFormType = z.infer<typeof editSubCategoryFormSchema>