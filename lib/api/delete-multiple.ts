import { fetchWithAuth } from "./app-fetch";


export async function deletMultiple(path: string, ids: number[]) {
    try {
        const response = await fetchWithAuth(path + `?ids=${ids.join(",")}`, {
            method: "DELETE"
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
