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
import { createContext } from '@/lib/service/context/create-context';
import { Circle } from 'lucide-react';
import { toast } from 'sonner';
import useContextStore from '@/zustand/edit-pages/context-store';
import useAppStore from '@/zustand/app-store';
import { PreviewCreateContext } from './previewCreateContext';
import { Context } from '@/lib/interface';

export interface ContextFormProps {
    initialData?: Context;
}

const contextSchema = z
    .object({
        contextDescription: z.string().min(2).max(255),
        operator: z.string().min(1).max(255),
        entity: z.string().min(1).max(255),
        textValue: z.string().optional(),
        timeValue1: z.string().optional(),
        timeValue2: z.string().optional(),
    })
    .refine(
        data => {
            console.log("data.timeValue1: ", data.timeValue1)
            console.log("data.timeValue2: ", data.timeValue2)
            console.log("data.textValue: ", data.textValue)
            if (data.operator === "BETWEEN") {
                return data.timeValue1 !== '' && data.timeValue2 !== '' && data.timeValue1 !== undefined && data.timeValue2 !== undefined && data.textValue === undefined;
            } else {
                return data.textValue !== undefined && data.textValue !== '' && data.timeValue1 === undefined && data.timeValue2 === undefined;
            }
        },
        {
            message:
                'If textValue is provided, omit timeValue1 and timeValue2, and vice versa.',
        },
    );

export const ContextForm: React.FC<ContextFormProps> = ({ initialData }) => {
    const { setCreatedContext } = useContextStore();
    const { toggleModal } = useAppStore();
    const [previewClicked, setPreviewClicked] = useState(false);
    const form = useForm<z.infer<typeof contextSchema>>({
        resolver: zodResolver(contextSchema),
        defaultValues: {
            contextDescription: initialData?.contextDescription ?? '',
            operator: initialData?.operator ?? '<',
            entity: initialData?.entity ?? '',
            textValue: initialData?.textValue ?? '',
            timeValue1: initialData?.timeValue1 ?? '',
            timeValue2: initialData?.timeValue2 ?? '',
        },
    });
    const entity = form.watch('entity');
    const operator = form.watch('operator');
    const textValue = form.watch('textValue');
    const timeValue1 = form.watch('timeValue1');
    const timeValue2 = form.watch('timeValue2');
    async function onSubmit(values: z.infer<typeof contextSchema>) {
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
                    ? 'Context updated successfully'
                    : 'Context created successfully.',
            );
        } catch (e) {
            console.log(e);
            toast.error('Something went wrong...');
        }
    }
    // console.log("INIT: ", initialData)
    const onError = (
        error: FieldErrors<{
            contextDescription: string;
            operator: string;
            entity: string;
            textValue?: string | undefined;
            timeValue1?: string | undefined;
            timeValue2?: string | undefined;
        }>,
    ) => console.log(error);
    return (
        <Form {...form}>
            <form
                onSubmit={form.handleSubmit(onSubmit, onError)}
                className="space-y-8"
            >
                <FormField
                    control={form.control}
                    name="contextDescription"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Context Description</FormLabel>
                            <FormControl>
                                <Input
                                    placeholder="Checks if access was before 10pm"
                                    {...field}
                                />
                            </FormControl>
                            <FormDescription>
                                Describe the context you want to check for.
                            </FormDescription>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="operator"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Operator</FormLabel>
                            <Select
                                onValueChange={field.onChange}
                                defaultValue={field.value}
                            >
                                <FormControl>
                                    <SelectTrigger>
                                        <SelectValue placeholder="<" />
                                    </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                    <SelectItem value="<">
                                        Less than (&lt;)
                                    </SelectItem>
                                    <SelectItem value=">">
                                        Greater than (&gt;)
                                    </SelectItem>
                                    <SelectItem value="<=">
                                        Less than or equal to (&lt;=)
                                    </SelectItem>
                                    <SelectItem value=">=">
                                        Greater than or equal to (&gt;=)
                                    </SelectItem>
                                    <SelectItem value="==">
                                        Equal to (=)
                                    </SelectItem>
                                    <SelectItem value="!=">
                                        Not equal to (!=)
                                    </SelectItem>
                                    <SelectItem value="IN">IN</SelectItem>
                                    <SelectItem value="BETWEEN">
                                        BETWEEN
                                    </SelectItem>
                                </SelectContent>
                            </Select>
                            <FormDescription>
                                The operator to use for the context check.
                            </FormDescription>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="entity"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Entity</FormLabel>
                            <FormControl>
                                <Input placeholder="time" {...field} />
                            </FormControl>
                            <FormDescription>
                                The entity to check the context for.
                            </FormDescription>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="timeValue1"
                    disabled={operator !== 'BETWEEN'}
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel
                                className={
                                    operator !== 'BETWEEN'
                                        ? 'line-through text-muted-foreground'
                                        : ''
                                }
                            >
                                Time Value 1
                            </FormLabel>
                            <FormControl>
                                <Input placeholder="10pm" {...field} />
                            </FormControl>
                            <FormDescription>
                                The first time value to check the context for.
                            </FormDescription>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="timeValue2"
                    disabled={operator !== 'BETWEEN'}
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel
                                className={
                                    operator !== 'BETWEEN'
                                        ? 'line-through text-muted-foreground'
                                        : ''
                                }
                            >
                                Time Value 2
                            </FormLabel>
                            <FormControl>
                                <Input placeholder="12pm" {...field} />
                            </FormControl>
                            <FormDescription>
                                The second time value to check the context for.
                            </FormDescription>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="textValue"
                    disabled={operator === 'BETWEEN'}
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel
                                className={
                                    operator === 'BETWEEN'
                                        ? 'line-through text-muted-foreground'
                                        : ''
                                }
                            >
                                Text Value
                            </FormLabel>
                            <FormControl>
                                <Input placeholder="10pm" {...field} />
                            </FormControl>
                            <FormDescription>
                                The text value to check the context for.
                            </FormDescription>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <div className="flex flex-col space-y-4">
                    <Button
                        onClick={() => setPreviewClicked(!previewClicked)}
                        type="button"
                    >
                        {previewClicked ? 'Hide Preview' : 'Preview'}
                    </Button>
                    {previewClicked && (
                        <PreviewCreateContext
                            context={{
                                entity: entity,
                                operator: operator,
                                timeValue1: timeValue1,
                                timeValue2: timeValue2,
                                textValue: textValue,
                                contextDescription: '',
                            }}
                        />
                    )}
                    <Button type="submit">
                        {form.formState.isSubmitting ? (
                            <Circle className="h-4 w-4 animate-spin mr-2" />
                        ) : null}{' '}
                        {form.formState.isSubmitting ? 'Submitting' : 'Submit'}
                    </Button>
                </div>
            </form>
        </Form>
    );
};
