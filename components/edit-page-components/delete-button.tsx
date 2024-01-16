import { useState } from 'react';
import { SearchAndSelect, SearchAndSelectInterface } from './search';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import { MultiSkeleton } from '@/components/ui/multi-skeleton';
import { DataTable } from '@/components/table/data-table';
import { deleteItemColumn } from '@/components/table/column-defs/delete-items/delete-items-column';
import { DeleteRowButton } from '@/components/table/delete-row-button';
import { RQ_GET_CONTEXT_VIA_SEARCH } from '@/query/react-query/query-keys';
import axios from 'axios';
import { useQuery } from '@tanstack/react-query';
import { Context } from '@/lib/interface';

interface DeleteButtonInterface {
    getDataEndpoint: string;
    entity: string;
    deleteClickedIndicator: boolean;
    setDeleteClickedIndicator: (clicked: boolean) => void;
    deleteEndpoint: string;
}

export const DeleteButton: React.FC<DeleteButtonInterface> = ({
    getDataEndpoint,
    entity,
    setDeleteClickedIndicator,
    deleteClickedIndicator,
    deleteEndpoint,
}) => {
    const [selected, setSelected] = useState<SearchAndSelectInterface[]>([]);

    const getDataEndpointFetch = async () => {
        const resp = await axios.get(getDataEndpoint);
        console.log("FETCHING FROM DELETE!")
        return resp.data;
    };

    const { data, isLoading } = useQuery({
        queryKey: [RQ_GET_CONTEXT_VIA_SEARCH],
        queryFn: getDataEndpointFetch,
        enabled: deleteClickedIndicator,
    });

    const removeFromItemsToBeDeleted = (item: SearchAndSelectInterface) => {
        const newSelectected = selected.filter(sel => sel.id !== item.id);
        setSelected(newSelectected);
    };

    const uiStateOnSuccessfulDelete = (id: string | string[]) => {
        const idsToRemove = Array.isArray(id) ? id : [id];
        if (process.env.USE_PRODUCTION_DB === 'false') {
            data.message = data.message.filter(
                (dataItem: Context) => !idsToRemove.includes(dataItem.id!),
            );
        }
        const newSelected = selected.filter(
            selectedItem => !idsToRemove.includes(selectedItem.id),
        );
        setSelected(newSelected);
    };

    return (
        <>
            {deleteClickedIndicator &&
                <>
                    <Button
                        variant="outline"
                        className="max-w-40"
                        onClick={() => {
                            setDeleteClickedIndicator(false);
                            setSelected([]);
                        }}
                    >
                        <ArrowLeft className="w-5 h-5" />
                        Back
                    </Button>
                    {isLoading ? (
                        <div className="space-y-2 mt-4">
                            <MultiSkeleton />
                        </div>
                    ) : (
                        <>
                            <SearchAndSelect
                                objName={`${entity}`}
                                placeholder={`Delete ${entity}...`}
                                data={data.message}
                                setContainer={setSelected}
                                container={selected}
                            />
                            <DataTable
                                data={selected}
                                columns={deleteItemColumn(
                                    deleteEndpoint,
                                    removeFromItemsToBeDeleted,
                                    uiStateOnSuccessfulDelete,
                                )}
                                showColumnVisibilityDropdown={false}
                                showPagination={false}
                            />
                            {selected.length > 0 && (
                                <DeleteRowButton
                                    deleteEndpoint={deleteEndpoint}
                                    itemIds={selected.map(item => item.id)}
                                    uiStateOnSuccessfulDelete={
                                        uiStateOnSuccessfulDelete
                                    }
                                    label="Delete Selected"
                                />
                            )}
                        </>
                    )}
                </>
            }
        </>
    );
};
