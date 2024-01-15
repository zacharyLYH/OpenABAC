import { useEffect, useState } from "react";
import { SearchAndSelect, SearchAndSelectInterface } from "./search";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { MultiSkeleton } from "../ui/multi-skeleton";
import { DataTable } from "../table/data-table";
import { deleteItemColumn } from "../table/column-defs/delete-items/delete-items-column";
import { DeleteRowButton } from "../table/delete-row-button";

interface DeleteButtonInterface {
    getDataEndpoint: string
    entity: string
    deleteClickedIndicator: boolean
    setDeleteClickedIndicator: (clicked: boolean) => void
    deleteEndpoint: string
}

export const DeleteButton: React.FC<DeleteButtonInterface> = ({ getDataEndpoint, entity, setDeleteClickedIndicator, deleteClickedIndicator, deleteEndpoint }) => {
    const [data, setData] = useState<SearchAndSelectInterface[]>([])
    const [selected, setSelected] = useState<SearchAndSelectInterface[]>([])
    const [isFetching, setIsFetching] = useState(false)

    useEffect(() => {
        const fetchAllData = async () => {
            try {
                setIsFetching(true)
                const response = await fetch(getDataEndpoint, { cache: "no-cache" });
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const data = await response.json();
                setData(data.message)
            } catch (error) {
                console.error('Error fetching data:', error);
            } finally {
                setIsFetching(false)
            }
        }
        if (deleteClickedIndicator) {
            fetchAllData()
        }
    }, [deleteClickedIndicator])

    const removeFromItemsToBeDeleted = (item: SearchAndSelectInterface) => {
        const newSelectected = selected.filter((sel) => sel.id !== item.id)
        setSelected(newSelectected)
    }

    const uiStateOnSuccessfulDelete = (id: string | string[]) => {
        const idsToRemove = Array.isArray(id) ? id : [id];
        const newData = data.filter(dataItem => !idsToRemove.includes(dataItem.id));
        setData(newData);
        const newSelected = selected.filter(selectedItem => !idsToRemove.includes(selectedItem.id));
        setSelected(newSelected);
    };


    return (
        <>
            {!deleteClickedIndicator ? (
                <Button size="lg" onClick={() => setDeleteClickedIndicator(!deleteClickedIndicator)}>
                    {deleteClickedIndicator ? "Close editor" : `Delete ${entity}`}
                </Button>
            ) : (
                <>
                    <Button variant="outline" className="max-w-40" onClick={() => { setDeleteClickedIndicator(false); setSelected([]) }}><ArrowLeft className="w-5 h-5" />Back</Button>
                    {isFetching ? (
                        <div className="space-y-2 mt-4">
                            <MultiSkeleton />
                        </div>
                    ) : (
                        <>
                            <SearchAndSelect
                                objName={`${entity}`}
                                placeholder={`Delete ${entity}...`}
                                data={data}
                                setContainer={setSelected}
                                container={selected}
                                showSelected={false}
                            />
                            <DataTable
                                data={selected}
                                columns={deleteItemColumn(deleteEndpoint, removeFromItemsToBeDeleted, uiStateOnSuccessfulDelete)}
                                showColumnVisibilityDropdown={false}
                                showPagination={false}
                            />
                            {selected.length > 0 &&
                                <DeleteRowButton deleteEndpoint={deleteEndpoint} itemIds={selected.map(item => item.id)} uiStateOnSuccessfulDelete={uiStateOnSuccessfulDelete} label="Delete Selected" />
                            }
                        </>
                    )}
                </>
            )}
        </>
    )
}