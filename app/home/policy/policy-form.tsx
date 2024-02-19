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
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import { useState } from 'react';
import { createContext } from '@/abac/helpers/context/create-context';
import { Circle } from 'lucide-react';
import { toast } from 'sonner';
import useContextStore from '@/zustand/edit-pages/context-store';
import useAppStore from '@/zustand/app-store';
import { Policy } from '@/abac/interface';
import usePolicyStore from '@/zustand/edit-pages/policy-store';

export interface PolicyFormProps {
    initialData?: Policy;
}

const policySchema = z.object({
    policyDescription: z.string().min(1).max(255),
    policyName: z.string().min(1).max(255),
    allow: z.string().min(1).max(255),
});

//Form doesn't allow Boolean type in the allow field. While in this component, allow field shall be string. Convert string to boolean if we're passing in initial data. And convert boolean to string to write out to api
export const PolicyForm: React.FC<PolicyFormProps> = ({ initialData }) => {
    const { setCreatedPolicy } = usePolicyStore();
    const { toggleModal } = useAppStore();
    const form = useForm<z.infer<typeof policySchema>>({
        resolver: zodResolver(policySchema),
        defaultValues: {
            policyDescription: initialData?.policyDescription ?? '',
            policyName: initialData?.policyName ?? '',
            allow: initialData?.allow ? 'true' : 'false',
        },
    });
    async function onSubmit(values: z.infer<typeof policySchema>) {
        try {
            if (initialData) {
                console.log(initialData);
                // await updateContext();
            } else {
                const dataPayload = {
                    ...values,
                    allow: values.allow === 'true',
                };
                console.log(dataPayload);
                // await createContext(values);
                // setCreatedContext(values); //untested
            }
            toggleModal();
            toast.success(
                initialData
                    ? 'Policy updated successfully'
                    : 'Policy created successfully.',
            );
        } catch (e) {
            console.log(e);
            toast.error('Something went wrong...');
        }
    }
    // console.log("INIT: ", initialData)
    const onError = (
        errors: FieldErrors<{
            policyDescription: string;
            policyName: string;
            allow: string | boolean;
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
                    name="policyName"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Policy Name</FormLabel>
                            <FormControl>
                                <Input placeholder="S3Access" {...field} />
                            </FormControl>
                            <FormDescription>
                                Unique name for policy
                            </FormDescription>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="allow"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Allow or Deny</FormLabel>
                            <Select
                                onValueChange={field.onChange}
                                defaultValue="true"
                            >
                                <FormControl>
                                    <SelectTrigger>
                                        <SelectValue placeholder={true} />
                                    </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                    <SelectItem value="true">Allow</SelectItem>
                                    <SelectItem value="false">Deny</SelectItem>
                                </SelectContent>
                            </Select>
                            <FormDescription>
                                Is this policy to allow or deny access?
                            </FormDescription>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="policyDescription"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Policy Description</FormLabel>
                            <FormControl>
                                <Input
                                    placeholder="S3 bucket access policy"
                                    {...field}
                                />
                            </FormControl>
                            <FormDescription>
                                Describe this policy.
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
