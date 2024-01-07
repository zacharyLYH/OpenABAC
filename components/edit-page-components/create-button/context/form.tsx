'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
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

const createContextSchema = z
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
            // If textValue is provided, timeValue1 and timeValue2 should not be provided, and vice versa.
            if (data.textValue) {
                return !data.timeValue1 && !data.timeValue2;
            } else {
                return data.timeValue1 && data.timeValue2;
            }
        },
        {
            message:
                'If textValue is provided, omit timeValue1 and timeValue2, and vice versa.',
        },
    );

export const CreateContextForm = () => {
    const [previewClicked, setPreviewClicked] = useState(false);
    const form = useForm<z.infer<typeof createContextSchema>>({
        resolver: zodResolver(createContextSchema),
        defaultValues: {
            operator: '<',
        },
    });
    const entity = form.watch('entity');
    const operator = form.watch('operator');
    const textValue = form.watch('textValue');
    const timeValue1 = form.watch('timeValue1');
    const timeValue2 = form.watch('timeValue2');
    function onSubmit(values: z.infer<typeof createContextSchema>) {
        // Do something with the form values.
        // ✅ This will be type-safe and validated.
        console.log(values);
    }
    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
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
                {operator === 'BETWEEN' ? (
                    <>
                        <FormField
                            control={form.control}
                            name="timeValue1"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Time Value 1</FormLabel>
                                    <FormControl>
                                        <Input placeholder="10pm" {...field} />
                                    </FormControl>
                                    <FormDescription>
                                        The first time value to check the
                                        context for.
                                    </FormDescription>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="timeValue2"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Time Value 2</FormLabel>
                                    <FormControl>
                                        <Input placeholder="12pm" {...field} />
                                    </FormControl>
                                    <FormDescription>
                                        The second time value to check the
                                        context for.
                                    </FormDescription>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </>
                ) : (
                    <FormField
                        control={form.control}
                        name="textValue"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Text Value</FormLabel>
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
                )}
                <div className="flex justify-between">
                    <Button onClick={() => setPreviewClicked(!previewClicked)}>
                        {previewClicked ? 'Hide Preview' : 'Preview'}
                    </Button>
                    {previewClicked && (
                        <code>
                            Allow access if {entity} {operator}{' '}
                            {operator === 'BETWEEN'
                                ? `${timeValue1} and ${timeValue2}`
                                : textValue}
                        </code>
                    )}
                    <Button type="submit">Submit</Button>
                </div>
            </form>
        </Form>
    );
};
