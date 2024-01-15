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

interface DeleteRowButtonProps {
    itemId: string;
    deleteEndpoint: string
}

export const DeleteRowButton: React.FC<DeleteRowButtonProps> = ({
    itemId,
    deleteEndpoint,
}) => {

    const deleteHandler = () => {
        console.log("DELETE ", itemId, " via ", deleteEndpoint)
    };

    return (
        <AlertDialog>
            <AlertDialogTrigger asChild>
                <Button
                    size="default"
                    variant="destructive"
                >
                    <Trash className='w-4 h-4' />
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
