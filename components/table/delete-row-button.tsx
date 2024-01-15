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
} from "@/components/ui/alert-dialog"
import { toast } from 'sonner';

interface DeleteRowButtonProps {
    itemId?: string;
    deleteEndpoint: string
    itemIds?: string[]
    uiStateOnSuccessfulDelete: (id: string | string[]) => void
    label?: string
}

export const DeleteRowButton: React.FC<DeleteRowButtonProps> = ({
    itemId,
    deleteEndpoint,
    itemIds,
    uiStateOnSuccessfulDelete,
    label
}) => {

    const deleteHandler = () => {
        try {
            if (itemIds) {
                console.log("DELETE ", itemIds, " via ", deleteEndpoint)
                for (const id of itemIds) {
                    uiStateOnSuccessfulDelete(itemIds)
                }
            } else {
                console.log("DELETE ", itemId, " via ", deleteEndpoint)
                uiStateOnSuccessfulDelete(itemId!)
            }
            toast.success(`Successfully deleted ${itemIds ? itemIds.length : 1} item(s)!`)
        } catch (error) {
            console.error(error)
            toast.error("Something went wrong. Please try again")
        }
    };

    return (
        <AlertDialog>
            <AlertDialogTrigger asChild>
                <Button
                    size="default"
                    variant="destructive"
                >
                    {label ? label :
                        <Trash className='w-4 h-4' />}
                </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                    <AlertDialogDescription>
                        This action cannot be undone. This will permanently delete your account
                        and remove your data from our servers.
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction asChild>
                        <Button
                            size="default"
                            className='bg-red-600'
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
