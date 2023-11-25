import { useToast } from "@/components/ui/use-toast";
import { ProductPayload } from "@/lib/api/products";
import { universalCreate, universalUpdate } from "@/lib/api/universalfetch";
import { useMutation, useQueryClient } from "@tanstack/react-query";

type TProps = {
    onSubmitSuccess: () => void;
    id?: number;
};

export default function useEditProductForm({ onSubmitSuccess, id }: TProps) {
    const { toast } = useToast()
    const client = useQueryClient();
    const mutation = useMutation({
        mutationFn: (payload: ProductPayload) => !id ? universalCreate({
            path: `/products`,
            payload
        }) : universalUpdate<ProductPayload>({
            path: `/products`,
            id,
            payload
        }),
    })

    async function onSubmit(data: ProductPayload) {

        await mutation.mutateAsync(data, {
            onSuccess: () => {
                client.invalidateQueries({
                    queryKey: ["products"],
                    type: "all",
                });
                client.refetchQueries({
                    queryKey: ["products"],
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
