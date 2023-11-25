export type DefaultObject = {
    id: number
    createdAt: string
    updatedAt: string
}


export type User = DefaultObject & {
    name: string
    email: string
    error: any
}