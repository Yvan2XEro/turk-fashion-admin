import { useToast } from "@/components/ui/use-toast";
import { universalCreate, universalUpdate } from "@/lib/api/universalfetch";
import { UserPayload } from "@/lib/api/users";
import { useMutation, useQueryClient } from "react-query";

type TProps = {
    onSubmitSuccess: () => void;
    id?: number;
};

export default function useEditUserForm({ onSubmitSuccess, id }: TProps) {
    const { toast } = useToast()
    const client = useQueryClient();
    const mutation = useMutation({
        mutationFn: (payload: UserPayload) => !id ? universalCreate({
            path: `/users`,
            payload
        }) : universalUpdate<UserPayload>({
            path: `/users`,
            id,
            payload: {
                ...payload,
                password: (!!payload.password && payload.password.length > 0 ? payload.password : undefined) as any
            }
        }),
    })

    async function onSubmit(data: UserPayload) {

        await mutation.mutateAsync(data, {
            onSuccess: () => {
                client.invalidateQueries(["users"]);

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
