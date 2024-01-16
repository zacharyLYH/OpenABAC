import {
    Card,
    CardContent,
    CardFooter,
    CardHeader,
    CardTitle,
} from '@/components/ui/card';
import { TextBubble } from '@/components/ui/text-bubble';
import { Button } from '@/components/ui/button';
import useContextStore from '@/zustand/edit-pages/context-store';
import { useEffect, useState } from 'react';
import {
    SearchAndSelect,
    SearchAndSelectInterface,
} from '@/components/edit-page-components/search';
import { PreviewCreateContext } from './previewCreateContext';
import { MultiSkeleton } from '@/components/ui/multi-skeleton';
import { ArrowLeft, Link } from 'lucide-react';
import { toast } from 'sonner';
import { DataTable } from '@/components/table/data-table';
import { attachColumn } from '@/components/table/column-defs/attach-column/attach-column';
import axios from 'axios';
import { RQ_GET_CONTEXT_VIA_SEARCH } from '@/query/react-query/query-keys';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

export const AttachToAction = () => {
    const queryClient = useQueryClient();
    const { createdContext, setCreatedContext } = useContextStore();
    const [searchAndSelect, toggleSearchAndSelect] = useState(false);
    const [selectedActionsFromSearch, setSelectedActionsFromSearch] = useState<
        SearchAndSelectInterface[]
    >([]);

    const getDataEndpointFetch = async () => {
        const resp = await axios.get('/api/action/getActionViaSearch');
        return resp.data;
    };

    const { data, isLoading } = useQuery({
        queryKey: [RQ_GET_CONTEXT_VIA_SEARCH],
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
        onError: (error) => {
            console.log(error);
            toast.error(`An error occurred.`);
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["PLACEHOLDER_ATTACH_CONTEXT_TO_ACTION"] });
            toast.success(
                `Successfully attached context to ${selectedActionsFromSearch.length} action(s)`,
            );
            setCreatedContext(null)
            toggleSearchAndSelect(false)
            setSelectedActionsFromSearch([])
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

    const removeFromItemsToBeAttached = (item: SearchAndSelectInterface) => {
        const newSelectected = selectedActionsFromSearch.filter(
            sel => sel.id !== item.id,
        );
        setSelectedActionsFromSearch(newSelectected);
    };
    return (
        <>
            {createdContext && (
                <div className="flex flex-col">
                    <Card>
                        <CardHeader>
                            <CardTitle>✅ Created</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="flex flex-row">
                                <p className="text-muted-foreground">
                                    Description:
                                </p>
                                <TextBubble
                                    text={createdContext.contextDescription}
                                />
                            </div>
                            <div className="flex flex-row">
                                <p className="text-muted-foreground">
                                    Operator:
                                </p>
                                <TextBubble
                                    text={createdContext.contextDescription}
                                />
                            </div>
                            <div className="flex flex-row">
                                <p className="text-muted-foreground">Entity:</p>
                                <TextBubble
                                    text={createdContext.contextDescription}
                                />
                            </div>
                            {createdContext.textValue ? (
                                <div className="flex flex-row">
                                    <p className="text-muted-foreground">
                                        Text Value:
                                    </p>
                                    <TextBubble
                                        text={createdContext.textValue}
                                    />
                                </div>
                            ) : (
                                <>
                                    <div className="flex flex-row">
                                        <p className="text-muted-foreground">
                                            Time 1
                                        </p>
                                        <TextBubble
                                            text={createdContext.timeValue1!}
                                        />
                                    </div>
                                    <div className="flex flex-row">
                                        <p className="text-muted-foreground">
                                            Time 2
                                        </p>
                                        <TextBubble
                                            text={createdContext.timeValue2!}
                                        />
                                    </div>
                                </>
                            )}
                        </CardContent>
                        <CardFooter>
                            <PreviewCreateContext context={createdContext} />
                        </CardFooter>
                    </Card>
                    {!searchAndSelect && (
                        <>
                            <p className="mt-4 font-mono">
                                Would you like to attach this context to an
                                Action while you&apos;re here?{' '}
                            </p>
                            <div className="flex mx-2 gap-x-2">
                                <Button
                                    onClick={() => toggleSearchAndSelect(true)}
                                    className="w-1/2"
                                >
                                    Let&apos;s do it
                                </Button>
                                <Button
                                    onClick={() => setCreatedContext(null)}
                                    variant="destructive"
                                    className="w-1/2"
                                >
                                    No thanks
                                </Button>
                            </div>
                        </>
                    )}
                    {searchAndSelect &&
                        (isLoading ? (
                            <div className="space-y-2 mt-4">
                                <MultiSkeleton number={5} />
                            </div>
                        ) : (
                            <div className="mt-2 space-y-2">
                                <Button
                                    disabled={
                                        selectedActionsFromSearch.length !== 0
                                    }
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
                                    objName="Action"
                                    data={data.message ?? []}
                                    placeholder="Search Actions..."
                                />
                                <DataTable
                                    data={selectedActionsFromSearch}
                                    columns={attachColumn(
                                        removeFromItemsToBeAttached,
                                    )}
                                    showColumnVisibilityDropdown={false}
                                    showPagination={false}
                                />
                                {selectedActionsFromSearch.length > 0 && (
                                    <Button onClick={deleteHandler}>
                                        <Link className="w-r h-4" />
                                        {isPending
                                            ? 'Attaching...'
                                            : 'Attach'}
                                    </Button>
                                )}
                            </div>
                        ))}
                </div>
            )}
        </>
    );
};
