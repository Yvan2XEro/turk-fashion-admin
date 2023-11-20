import * as z from "zod"

export const editTagFormSchema = z.object({
    label: z.string().min(2).max(50),
})

export type EditTagFormType = z.infer<typeof editTagFormSchema>