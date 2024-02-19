'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { FieldErrors, useForm } from 'react-hook-form';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Circle } from 'lucide-react';
import { toast } from 'sonner';
import useAppStore from '@/zustand/app-store';
import { Action } from '@/abac/interface';
import useActionStore from '@/zustand/edit-pages/action-store';

export interface ActionFormProps {
    initialData?: Action;
}

const actionSchema = z.object({
    actionName: z.string().min(1).max(255),
    actionDescription: z.string().min(1).max(255),
});

export const ActionForm: React.FC<ActionFormProps> = ({ initialData }) => {
    const { setCreatedAction } = useActionStore();
    const { toggleModal } = useAppStore();
    const form = useForm<z.infer<typeof actionSchema>>({
        resolver: zodResolver(actionSchema),
        defaultValues: {
            actionName: initialData?.actionName ?? '',
            actionDescription: initialData?.actionDescription ?? '',
        },
    });
    async function onSubmit(values: z.infer<typeof actionSchema>) {
        try {
            if (initialData) {
                console.log(initialData);
                // await updateContext();
            } else {
                console.log(values);
                // await createContext(values);
                // setCreatedContext(values); //untested
            }
            toggleModal();
            toast.success(
                initialData
                    ? 'Action updated successfully'
                    : 'Action created successfully.',
            );
        } catch (e) {
            console.log(e);
            toast.error('Something went wrong...');
        }
    }
    // console.log("INIT: ", initialData)
    const onError = (
        errors: FieldErrors<{
            actionName: string;
            actionDescription: string;
        }>,
    ) => {
        Object.entries(errors).forEach(([_, error]) => {
            if (error) {
                toast.error(`${error.message}`);
            }
        });
    };
    return (
        <Form {...form}>
            <form
                onSubmit={form.handleSubmit(onSubmit, onError)}
                className="space-y-8"
            >
                <FormField
                    control={form.control}
                    name="actionName"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Action Name</FormLabel>
                            <FormControl>
                                <Input
                                    placeholder="AccessKubernetesCluster"
                                    {...field}
                                />
                            </FormControl>
                            <FormDescription>
                                A unique name of the action that requires access
                                control.
                            </FormDescription>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="actionDescription"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Action Description</FormLabel>
                            <FormControl>
                                <Input
                                    placeholder="Allows the user to access the kubernetes cluster unrestrictedly."
                                    {...field}
                                />
                            </FormControl>
                            <FormDescription>
                                A readable and friendly description.
                            </FormDescription>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <Button type="submit">
                    {form.formState.isSubmitting ? (
                        <Circle className="h-4 w-4 animate-spin mr-2" />
                    ) : null}{' '}
                    {form.formState.isSubmitting ? 'Submitting' : 'Submit'}
                </Button>
            </form>
        </Form>
    );
};
