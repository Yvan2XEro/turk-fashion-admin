import { useToast } from "@/components/ui/use-toast";
import { StockPayload } from "@/lib/api/stocks";
import { universalCreate, universalUpdate } from "@/lib/api/universalfetch";
import { useMutation, useQueryClient } from "react-query";

type TProps = {
    onSubmitSuccess: () => void;
    id?: number;
};

export default function useEditEditStockForm({ onSubmitSuccess, id }: TProps) {
    const { toast } = useToast()
    const client = useQueryClient();
    const mutation = useMutation({
        mutationFn: (payload: StockPayload) => !id ? universalCreate({
            path: `/products-stocks`,
            payload
        }) : universalUpdate<StockPayload>({
            path: `/products-stocks`,
            id,
            payload
        }),
    })

    async function onSubmit(data: StockPayload) {

        await mutation.mutateAsync(data, {
            onSuccess: () => {
                client.invalidateQueries(["products-stocks"]);

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
