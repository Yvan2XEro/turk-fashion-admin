import { useToast } from "@/components/ui/use-toast";
import { FilterPayload } from "@/lib/api/filters";
import { universalCreate, universalUpdate } from "@/lib/api/universalfetch";
import { useMutation, useQueryClient } from "react-query";

type TProps = {
    onSubmitSuccess: () => void;
    id?: number;
};

export default function useEditFilterForm({ onSubmitSuccess, id }: TProps) {
    const { toast } = useToast()
    const client = useQueryClient();
    const mutation = useMutation({
        mutationFn: (payload: FilterPayload) => !id ? universalCreate({
            path: `/filters`,
            payload
        }) : universalUpdate<FilterPayload>({
            path: `/filters`,
            id,
            payload
        }),
    })

    async function onSubmit(data: FilterPayload) {

        await mutation.mutateAsync(data, {
            onSuccess: () => {
                client.invalidateQueries(["filters"]);

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
