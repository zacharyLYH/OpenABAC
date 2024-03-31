import {
    SearchAndSelect,
    SearchAndSelectInterface,
} from '../edit-page-components/search';
import { deleteItemColumn } from '../table/column-defs/delete-items/delete-items-column';
import { DataTable } from '../table/data-table';
import axios from 'axios';
import { useQuery } from '@tanstack/react-query';
import { MultiSkeleton } from '@/components/ui/multi-skeleton';

export interface AttachPageSearchProps {
    addOrRemove: string;
    entity: string;
    selected: SearchAndSelectInterface[] | [];
    setSelected: (obj: SearchAndSelectInterface[] | []) => void;
    mountIndicator: boolean;
    maxAllowSelect?: number;
    placeholder: string;
}

const AttachPageSearch: React.FC<AttachPageSearchProps> = ({
    addOrRemove,
    entity,
    selected,
    setSelected,
    mountIndicator,
    placeholder,
    maxAllowSelect,
}) => {
    const fetchData = async () => {
        const resp = await axios.get(
            `/api/${entity.toLowerCase()}/get${entity}ViaSearch`,
        );
        return resp.data;
    };

    const { data, isLoading } = useQuery({
        queryKey: [`RQ_GET_${entity.toUpperCase()}_BY_ID`],
        queryFn: fetchData,
        enabled: mountIndicator,
    });

    const removeFromList = (item: SearchAndSelectInterface) => {
        const newSelectected = selected.filter(sel => sel.id !== item.id);
        setSelected(newSelectected);
    };

    return (
        <>
            {isLoading ? (
                <div className="h-full w-full p-8">
                    <MultiSkeleton />
                </div>
            ) : (
                <div className="flex flex-col w-full p-4 space-y-2">
                    <SearchAndSelect
                        objName={`${entity}`}
                        placeholder={placeholder}
                        data={data.message}
                        setContainer={setSelected}
                        container={selected}
                        disabled={
                            maxAllowSelect !== undefined &&
                            selected.length >= maxAllowSelect
                        }
                    />
                    <DataTable
                        data={selected}
                        columns={deleteItemColumn(removeFromList, addOrRemove)}
                        showColumnVisibilityDropdown={false}
                        showPagination={false}
                    />
                </div>
            )}
        </>
    );
};

export default AttachPageSearch;
