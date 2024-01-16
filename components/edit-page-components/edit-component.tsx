import { useEffect, useState } from 'react';
import { SearchAndSelect, SearchAndSelectInterface } from './search';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import { MultiSkeleton } from '@/components/ui/multi-skeleton';
import { DataModal } from '@/components/ui/modal';
import useAppStore from '@/zustand/app-store';
import axios from 'axios';
import { useQuery } from '@tanstack/react-query';

interface EditComponentInterface {
    getDataEndpoint: string;
    getDataByIdEndpoint: string;
    entity: string;
    editClickedIndicator: boolean;
    setEditClickedIndicator: (clicked: boolean) => void;
    renderEditForm: (data?: any) => JSX.Element;
    getContextByIdQueryKey: string[]
    getContextViaSearchQueryKey: string[]
}

export const EditComponent: React.FC<EditComponentInterface> = ({
    getDataEndpoint,
    getDataByIdEndpoint,
    entity,
    setEditClickedIndicator,
    editClickedIndicator,
    renderEditForm,
    getContextByIdQueryKey,
    getContextViaSearchQueryKey
}) => {
    const [selected, setSelected] = useState<SearchAndSelectInterface[]>([]);
    const { modalOpen, toggleModal } = useAppStore();

    useEffect(() => {
        if (modalOpen === false) {
            setSelected([]);
        }
    }, [modalOpen === false]);

    useEffect(() => {
        if (selected.length === 1) {
            toggleModal();
        }
    }, [selected.length]);

    const getDataByIdEndpointFetch = async () => {
        const resp = await axios.get(
            `${getDataByIdEndpoint}?id=${selected[0]?.id}`,
        );
        return resp.data;
    };

    const { data: selectedData } = useQuery({
        queryKey: [
            ...getContextByIdQueryKey,
            selected.length > 0 ? selected[0].id : 'ignore',
        ],
        queryFn: getDataByIdEndpointFetch,
        enabled: selected.length > 0,
    });

    const getDataEndpointFetch = async () => {
        const resp = await axios.get(getDataEndpoint);
        console.log(resp.data)
        return resp.data;
    };

    const { data, isLoading } = useQuery({
        queryKey: getContextViaSearchQueryKey,
        queryFn: getDataEndpointFetch,
        enabled: editClickedIndicator,
    });

    return (
        <>
            {editClickedIndicator && (
                <>
                    <Button
                        variant="outline"
                        className="max-w-40"
                        onClick={() => {
                            setEditClickedIndicator(false);
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
                            {selected.length === 0 && (
                                <SearchAndSelect
                                    objName={`${entity}`}
                                    placeholder={`Edit ${entity}...`}
                                    data={data?.message}
                                    setContainer={setSelected}
                                    container={selected}
                                />
                            )}
                            {modalOpen && selectedData && (
                                <DataModal
                                    title={`Update ${entity}`}
                                    isOpen={modalOpen}
                                    contentClassName="w-[70%]"
                                >
                                    {renderEditForm(selectedData?.message[0])}
                                </DataModal>
                            )}
                        </>
                    )}
                </>
            )}
        </>
    );
};
