"use client"

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { SearchAndSelect, SearchAndSelectInterface } from "./search";
import { useState } from "react";
import axios from "axios";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { MultiSkeleton } from "@/components/ui/multi-skeleton";
import { ArrowLeft, Link } from "lucide-react";
import { DataTable } from "@/components/table/data-table";
import { attachColumn } from "@/components/table/column-defs/attach-column/attach-column";
import {
    Card,
    CardContent,
    CardFooter,
    CardHeader,
    CardTitle,
} from '@/components/ui/card';
import { TextBubble } from '@/components/ui/text-bubble';
import { PreviewCreateContext } from "@/app/home/context/previewCreateContext";
import { Context } from "@/lib/interface";

interface PostCreateProps<T> {
    createdObj: T | null;
    setCreatedObj: (obj: T | null) => void;
    createdEntityName: string
    attachToEntityName: string
    attachToEntity_GetViaSearchEndpoint: string
    attachToEntity_GetViaSearchEndpoint_QueryKey: string
}

function isContext(obj: any): obj is Context {
    return (
        obj &&
        typeof obj.contextDescription === 'string' &&
        typeof obj.operator === 'string' &&
        typeof obj.entity === 'string'
    );
}

export const PostCreate = <T,>({ createdEntityName, createdObj, setCreatedObj, attachToEntityName, attachToEntity_GetViaSearchEndpoint, attachToEntity_GetViaSearchEndpoint_QueryKey }: PostCreateProps<T>) => {
    const queryClient = useQueryClient();
    const [searchAndSelect, toggleSearchAndSelect] = useState(false);
    const [selectedActionsFromSearch, setSelectedActionsFromSearch] = useState<
        SearchAndSelectInterface[]
    >([]);
    const getDataEndpointFetch = async () => {
        const resp = await axios.get(attachToEntity_GetViaSearchEndpoint);
        return resp.data;
    };

    const { data, isLoading } = useQuery({
        queryKey: [attachToEntity_GetViaSearchEndpoint_QueryKey],
        queryFn: getDataEndpointFetch,
        enabled: searchAndSelect,
    });

    const attachFunctionPlaceholder = async () => {
        console.log(
            'Trying to attach context to action ',
            selectedActionsFromSearch,
        );
    };

    const { mutate, isPending } = useMutation({
        mutationFn: attachFunctionPlaceholder,
        onError: error => {
            console.log(error);
            toast.error(`An error occurred.`);
        },
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ['PLACEHOLDER_ATTACH_CONTEXT_TO_ACTION'],
            });
            toast.success(
                `Successfully attached ${createdEntityName} to ${selectedActionsFromSearch.length} ${attachToEntityName}(s)`,
            );
            setCreatedObj(null);
            toggleSearchAndSelect(false);
            setSelectedActionsFromSearch([]);
        },
    });

    const attachHandler = () => {
        try {
            mutate();
        } catch (error) {
            console.error(error);
            toast.error('Something went wrong. Please try again');
        }
    };

    const removeFromItemsToBeAttached = (item: SearchAndSelectInterface) => {
        const newSelectected = selectedActionsFromSearch.filter(
            sel => sel.id !== item.id,
        );
        setSelectedActionsFromSearch(newSelectected);
    };

    const iterateCreatedObj = (obj: T) => {
        if (obj && typeof obj === 'object' && !Array.isArray(obj)) {
            return Object.entries(obj).map(([key, value]) => {
                if (value !== null && value !== undefined) {
                    return (
                        <div className="flex flex-row" key={key}>
                            <p className="text-muted-foreground">{key}:</p>
                            <TextBubble text={String(value)} />
                        </div>
                    );
                }
                return null;
            });
        }
        return null;
    };
    return (
        <>
            {createdObj && (
                <div className="flex flex-col">
                    <Card>
                        <CardHeader>
                            <CardTitle>✅ Created</CardTitle>
                        </CardHeader>
                        <CardContent>{iterateCreatedObj(createdObj)}</CardContent>
                        <CardFooter>
                            {isContext(createdObj) && <PreviewCreateContext context={createdObj} />}
                        </CardFooter>
                    </Card>
                    {!searchAndSelect && (
                        <>
                            <p className="mt-4 font-mono">
                                Would you like to attach this {createdEntityName} to an{' '}
                                {attachToEntityName} while you&apos;re here?{' '}
                            </p>
                            <div className="flex mx-2 gap-x-2">
                                <Button
                                    onClick={() => toggleSearchAndSelect(true)}
                                    className="w-1/2"
                                >
                                    Let&apos;s do it
                                </Button>
                                <Button
                                    onClick={() => setCreatedObj(null)}
                                    variant="destructive"
                                    className="w-1/2"
                                >
                                    No thanks
                                </Button>
                            </div>
                        </>
                    )}
                    {searchAndSelect && (
                        isLoading ? (
                            <div className="space-y-2 mt-4">
                                <MultiSkeleton number={5} />
                            </div>
                        ) : (
                            <div className="mt-2 space-y-2">
                                <Button
                                    disabled={selectedActionsFromSearch.length !== 0}
                                    variant="outline"
                                    className="w-full"
                                    onClick={() => {
                                        toggleSearchAndSelect(false);
                                        setSelectedActionsFromSearch([]);
                                    }}
                                >
                                    <ArrowLeft className="w-5 h-5" />
                                    {selectedActionsFromSearch.length !== 0
                                        ? 'Remove all selections to go back'
                                        : 'Back'}
                                </Button>
                                <SearchAndSelect
                                    container={selectedActionsFromSearch}
                                    setContainer={setSelectedActionsFromSearch}
                                    objName={attachToEntityName}
                                    data={data.message ?? []}
                                    placeholder={`Search ${attachToEntityName}...`}
                                />
                                <DataTable
                                    data={selectedActionsFromSearch}
                                    columns={attachColumn(removeFromItemsToBeAttached)}
                                    showColumnVisibilityDropdown={false}
                                    showPagination={false}
                                />
                                {selectedActionsFromSearch.length > 0 && (
                                    <Button onClick={attachHandler}>
                                        <Link className="w-r h-4" />
                                        {isPending ? 'Attaching...' : 'Attach'}
                                    </Button>
                                )}
                            </div>
                        )
                    )}
                </div>
            )}
        </>
    )
}