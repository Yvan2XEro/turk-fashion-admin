import { deletMultiple } from "@/lib/api/delete-multiple"
import { useMutation } from "@tanstack/react-query"


export default function useAppDeleteMutation() {
    const deleteMutation = useMutation({
        mutationFn: ({ path, ids }: { path: string, ids: number[] }) => deletMultiple(`/${path}`, ids),

    })
    return deleteMutation
}