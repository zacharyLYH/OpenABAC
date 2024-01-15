import { useEffect, useState } from 'react';
import { SearchAndSelect, SearchAndSelectInterface } from './search';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import { MultiSkeleton } from '../ui/multi-skeleton';
import { DataModal } from '../ui/modal';
import useAppStore from '@/zustand/app-store';

interface EditButtonInterface {
    getDataEndpoint: string;
    getDataByIdEndpoint: string;
    entity: string;
    editClickedIndicator: boolean;
    setEditClickedIndicator: (clicked: boolean) => void;
    renderEditForm: (data?: any) => JSX.Element;
}

export const EditButton: React.FC<EditButtonInterface> = ({
    getDataEndpoint,
    getDataByIdEndpoint,
    entity,
    setEditClickedIndicator,
    editClickedIndicator,
    renderEditForm,
}) => {
    const [data, setData] = useState<SearchAndSelectInterface[]>([]);
    const [selectedData, setSelectedData] = useState<any>();
    const [selected, setSelected] = useState<SearchAndSelectInterface[]>([]);
    const [isFetching, setIsFetching] = useState(false);
    const { modalOpen, toggleModal } = useAppStore();
    useEffect(() => {
        setSelected([]);
        setSelectedData([]);
    }, [modalOpen === false]);
    useEffect(() => {
        const fetchAllData = async () => {
            try {
                setIsFetching(true);
                const response = await fetch(getDataEndpoint, {
                    cache: 'no-cache',
                });
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const data = await response.json();
                setData(data.message);
            } catch (error) {
                console.error('Error fetching data:', error);
            } finally {
                setIsFetching(false);
            }
        };
        if (editClickedIndicator) {
            fetchAllData();
        }
    }, [editClickedIndicator]);
    useEffect(() => {
        const fetchAllDataById = async () => {
            try {
                setIsFetching(true);
                const response = await fetch(
                    getDataByIdEndpoint + `?id=${selected[0].id}`,
                    { cache: 'no-cache' },
                );
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const data = await response.json();
                setSelectedData(data.message[0]);
                toggleModal();
            } catch (error) {
                console.error('Error fetching data:', error);
            } finally {
                setIsFetching(false);
            }
        };
        if (selected.length > 0) {
            fetchAllDataById();
        }
    }, [selected.length]);
    return (
        <>
            {!editClickedIndicator ? (
                <Button
                    size="lg"
                    onClick={() =>
                        setEditClickedIndicator(!editClickedIndicator)
                    }
                >
                    {editClickedIndicator ? 'Close editor' : `Edit ${entity}`}
                </Button>
            ) : (
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
                    {isFetching ? (
                        <div className="space-y-2 mt-4">
                            <MultiSkeleton />
                        </div>
                    ) : (
                        <>
                            {selected.length === 0 && (
                                <SearchAndSelect
                                    objName={`${entity}`}
                                    placeholder={`Edit ${entity}...`}
                                    data={data}
                                    setContainer={setSelected}
                                    container={selected}
                                />
                            )}
                            {modalOpen && (
                                <DataModal
                                    title={`Update ${entity}`}
                                    isOpen={modalOpen}
                                    contentClassName="w-[70%]"
                                >
                                    {renderEditForm(selectedData)}
                                </DataModal>
                            )}
                        </>
                    )}
                </>
            )}
        </>
    );
};
