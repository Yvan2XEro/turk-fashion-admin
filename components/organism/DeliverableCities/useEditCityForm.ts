import { CityPayload } from '@/lib/api/cities'
import { useMutation, useQueryClient } from 'react-query'

type TProps = {
    id?: number
    onSubmitSuccess: () => void
}
export default function useEditCityForm({ onSubmitSuccess, id }: TProps) {
    const client = useQueryClient();

    const mutation = useMutation({

    })

    async function onSubmit(data: CityPayload) {
    }


    return (
        {
            onSubmit,
            ...mutation
        }
    )
}
