import * as z from "zod"

export const editFilterFormSchema = z.object({
    label: z.string().min(2).max(50),
    values: z.array(z.string().min(1).max(200)),
})

export type EditFilterFormType = z.infer<typeof editFilterFormSchema>