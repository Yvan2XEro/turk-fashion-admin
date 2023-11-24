export type DefaultObject = {
    id: number
    createdAt: string
    updatedAt: string
}


export type Product = {
    id: string,
    name: string,
    status: "active" | "inactive",
    categoryid: string
    subCategoryid: string
    price: number,
    description: string
    photoUrl: string
    filters: Record<string, string>
    tags: string[]
    createdAt: Date
    updatedAt: Date
}

export type Category = {
    id: string,
    name: string
    photoUrl: string
    createdAt: Date
    updatedAt: Date
}

export type SubCategory = {
    id: string,
    name: string
    photoUrl: string
    categoryid: string
    filters: string[]
    createdAt: Date
    updatedAt: Date
}

export type Filter = {
    label: string
    values: string[]
    id: string
}

export type TagObj = {
    label: string
    id: string
    createdAt: Date
    updatedAt: Date
}