import { useMutation, useQueryClient } from "@tanstack/react-query";
import { CategoryPayload } from "@/lib/api/categories";
import { useToast } from "@/components/ui/use-toast";
import { universalCreate, universalUpdate } from "@/lib/api/universalfetch";

type TProps = {
    onSubmitSuccess: () => void;
    id?: number;
};

export default function useEditCategoryForm({ onSubmitSuccess, id }: TProps) {

    const { toast } = useToast()
    const client = useQueryClient();
    const mutation = useMutation({
        mutationFn: (payload: CategoryPayload) => !id ? universalCreate({
            path: `/categories`,
            payload
        }) : universalUpdate<CategoryPayload>({
            path: `/categories`,
            id,
            payload
        }),
    })

    async function onSubmit(data: CategoryPayload) {

        await mutation.mutateAsync(data, {
            onSuccess: () => {
                client.invalidateQueries({
                    queryKey: ["categories"],
                    type: "all",
                });
                client.refetchQueries({
                    queryKey: ["categories"],
                    type: "all",
                });
                toast({
                    title: "Success!",
                })
                onSubmitSuccess()
            },
            onError: (error) => {
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
