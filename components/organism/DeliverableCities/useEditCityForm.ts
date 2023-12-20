import { useMutation, useQueryClient } from "react-query";
import { useToast } from "@/components/ui/use-toast";
import { universalCreate, universalUpdate } from "@/lib/api/universalfetch";
import { CityPayload } from "@/lib/api/cities";

type TProps = {
    onSubmitSuccess: () => void;
    id?: number;
};

export default function useEditCityForm({ onSubmitSuccess, id }: TProps) {

    const { toast } = useToast()
    const client = useQueryClient();
    const mutation = useMutation({
        mutationFn: (payload: CityPayload) => !id ? universalCreate({
            path: `/deliverables-citties`,
            payload
        }) : universalUpdate<CityPayload>({
            path: `/deliverables-citties`,
            id,
            payload
        }),
    })

    async function onSubmit(data: CityPayload) {

        await mutation.mutateAsync(data, {
            onSuccess: () => {
                client.refetchQueries(["deliverables-citties"]);

                toast({
                    title: "Success!",
                })
                onSubmitSuccess()
            },
            onError: (error: any) => {
                toast({
                    title: "Error",
                    description: error.message
                })
            }
        })
    }

    return {
        onSubmit,
        ...mutation
    };
}
