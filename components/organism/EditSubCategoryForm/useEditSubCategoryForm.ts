import { useToast } from "@/components/ui/use-toast";
import { SubCategoryPayload } from "@/lib/api/sub-categories";
import { universalCreate, universalUpdate } from "@/lib/api/universalfetch";
import { useMutation, useQueryClient } from "react-query";

type TProps = {
    onSubmitSuccess: () => void;
    id?: number;
};

export default function useEditSubCategoryForm({ onSubmitSuccess, id }: TProps) {
    const { toast } = useToast()
    const client = useQueryClient();
    const mutation = useMutation({
        mutationFn: (payload: SubCategoryPayload) => !id ? universalCreate({
            path: `/sub-categories`,
            payload
        }) : universalUpdate<SubCategoryPayload>({
            path: `/sub-categories`,
            id,
            payload
        }),
    })

    async function onSubmit(data: SubCategoryPayload) {

        await mutation.mutateAsync(data, {
            onSuccess: () => {
                client.invalidateQueries(["sub-categories"]);

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
