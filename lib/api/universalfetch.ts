import { DefaultObject } from "@/types/models"
import { fetchWithAuth } from "./app-fetch"

type FetchTProps = {
    path: string
    page: number
    limit: number
    q?: string
}
export async function universalFetch<T extends DefaultObject>({ path, page, limit, q }: FetchTProps) {
    try {
        const response = await fetchWithAuth(path + `?page=${page}&limit=${limit}&q=${q || ""}`)
        const data = await response.json();
        if (response.ok) {
            return data as Paginated<T>
        }
        return Promise.reject(data)
    } catch (error) {
        return Promise.reject(error)
    }
}


type CreateTProps<T> = {
    path: string,
    payload: T
}
export async function universalCreate<T>({ path, payload }: CreateTProps<T>) {
    try {
        const response = await fetchWithAuth(`${path}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(payload),
        })
        const data = await response.json();
        if (response.ok) {
            return data
        }
        return Promise.reject(data)
    } catch (error) {
        return Promise.reject(error)
    }
}

type UpdateTProps<T> = {
    path: string,
    payload: T
    id: number
}
export async function universalUpdate<T>({ path, payload, id }: UpdateTProps<T>) {
    try {
        const response = await fetchWithAuth(`${path}/${id}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(payload),
        })
        const data = await response.json();
        if (response.ok) {
            return data
        }
        return Promise.reject(data)
    } catch (error) {
        return Promise.reject(error)
    }
}

