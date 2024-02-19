'use client';

import { Button } from '@/components/ui/button';
import { Trash } from 'lucide-react';
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import { toast } from 'sonner';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { RQ_GET_CONTEXT_VIA_SEARCH } from '@/react-query/query-keys';

interface DeleteRowButtonProps {
    itemId?: string;
    deleteEndpoint: string;
    itemIds?: string[];
    uiStateOnSuccessfulDelete: (id: string | string[]) => void;
    label?: string;
}

export const DeleteRowButton: React.FC<DeleteRowButtonProps> = ({
    itemId,
    deleteEndpoint,
    itemIds,
    uiStateOnSuccessfulDelete,
    label,
}) => {
    const queryClient = useQueryClient();

    const deleteFunctionPlaceholder = async () => {
        if (itemIds) {
            console.log('DELETE ', itemIds, ' via ', deleteEndpoint);
            uiStateOnSuccessfulDelete(itemIds);
        } else {
            console.log('DELETE ', itemId, ' via ', deleteEndpoint);
            uiStateOnSuccessfulDelete(itemId!);
        }
    };

    const { mutate } = useMutation({
        mutationFn: deleteFunctionPlaceholder,
        onError: error => {
            console.log(error);
            toast.error(`An error occurred.`);
        },
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: [RQ_GET_CONTEXT_VIA_SEARCH],
            });
            toast.success(
                `Successfully deleted ${itemIds ? itemIds.length : 1} item(s)!`,
            );
        },
    });

    const deleteHandler = () => {
        try {
            mutate();
        } catch (error) {
            console.error(error);
            toast.error('Something went wrong. Please try again');
        }
    };

    return (
        <AlertDialog>
            <AlertDialogTrigger asChild>
                <Button size="default" variant="destructive">
                    {label ? label : <Trash className="w-4 h-4" />}
                </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>
                        Are you absolutely sure?
                    </AlertDialogTitle>
                    <AlertDialogDescription>
                        This action cannot be undone. This will permanently
                        delete your account and remove your data from our
                        servers.
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction asChild>
                        <Button
                            size="default"
                            className="bg-red-600"
                            onClick={deleteHandler}
                        >
                            Confirm
                        </Button>
                    </AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    );
};
