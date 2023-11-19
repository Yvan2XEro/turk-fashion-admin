
export type Product = {
    uuid: string,
    name: string,
    status: "active" | "inactive",
    categoryUuid: string
    subCategoryUuid: string
    price: number,
    description: string
    photoUrl: string
    filters: Record<string, string>
    tags: string[]
    createdAt: Date
    updatedAt: Date
}

export type Category = {
    uuid: string,
    name: string
    photoUrl: string
    createdAt: Date
    updatedAt: Date
}

export type SubCategory = {
    uuid: string,
    name: string
    photoUrl: string
    categoryUuid: string
    filters: string[]
    createdAt: Date
    updatedAt: Date
}

export type Filter = {
    label: string
    values: string[]
    uuid: string
}

export type TagObj = {
    label: string
}