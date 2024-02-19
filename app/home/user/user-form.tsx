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
import { User } from '@/abac/interface';
import useUserStore from '@/zustand/edit-pages/user-store';
import { Textarea } from '@/components/ui/textarea';

export interface UserFormProps {
    initialData?: User;
}

const userSchema = z.object({
    applicationUserId: z.string().min(1).max(255),
    jsonCol: z.string().refine(
        data => {
            try {
                JSON.parse(data);
                return true;
            } catch {
                return false;
            }
        },
        {
            message: 'Invalid JSON format',
        },
    ),
});

export const UserForm: React.FC<UserFormProps> = ({ initialData }) => {
    const { setCreatedUser } = useUserStore();
    const { toggleModal } = useAppStore();
    const form = useForm<z.infer<typeof userSchema>>({
        resolver: zodResolver(userSchema),
        defaultValues: {
            applicationUserId: initialData?.applicationUserId ?? '',
            jsonCol: initialData?.jsonCol
                ? JSON.stringify(initialData.jsonCol)
                : '',
        },
    });
    async function onSubmit(values: z.infer<typeof userSchema>) {
        try {
            if (initialData) {
                console.log(initialData);
                // await updateContext();
            } else {
                const jsonColObject = values.jsonCol
                    ? JSON.parse(values.jsonCol)
                    : null;
                const dataPayload = {
                    ...values,
                    jsonCol: jsonColObject,
                };
                console.log(dataPayload);
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
            applicationUserId: string;
            jsonCol: string;
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
                    name="applicationUserId"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Application User Id</FormLabel>
                            <FormControl>
                                <Input
                                    placeholder="A572564C-F82E-4096-82A6-868C21EF62B5"
                                    {...field}
                                />
                            </FormControl>
                            <FormDescription>
                                The ID for this user from your main application.
                            </FormDescription>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="jsonCol"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Optional JSON column</FormLabel>
                            <FormControl>
                                <Textarea
                                    placeholder="
                                    {
                                        Location: Mars
                                        Role: SWE
                                        Details: {
                                            ProgLanguages: ['typescript', 'go', 'rust']
                                            YOE: 5
                                        }
                                    }
                                "
                                    {...field}
                                />
                            </FormControl>
                            <FormDescription>
                                JSON for additional authorization,
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
