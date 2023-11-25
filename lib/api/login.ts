import * as z from "zod"
const pubAPI = process.env.NEXT_PUBLIC_API_URL

export const loginSchema = z.object({
    email: z.string().email(),
    password: z.string(),
})


export type LoginCredentials = z.infer<typeof loginSchema>

export type SignInResponse = {
    accessToken: string,
    refreshToken: string,
}

