import { useEffect, useState } from "react";
import { SearchAndSelect, SearchAndSelectInterface } from "./search";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { ArrowLeft } from "lucide-react";
import { MultiSkeleton } from "../ui/multi-skeleton";

interface EditButtonInterface {
    getDataEndpoint: string
    entity: string
    editClickedIndicator: boolean
    setEditClickedIndicator: (clicked: boolean) => void
}

export const EditButton: React.FC<EditButtonInterface> = ({ getDataEndpoint, entity, setEditClickedIndicator, editClickedIndicator }) => {
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
        if (editClickedIndicator) {
            fetchAllData()
        }
    }, [editClickedIndicator])
    return (
        <>
            {!editClickedIndicator ? (
                <Button size="lg" onClick={() => setEditClickedIndicator(!editClickedIndicator)}>
                    {editClickedIndicator ? "Close editor" : `Edit ${entity}`}
                </Button>
            ) : (
                <>
                    <Button variant="outline" className="max-w-40" onClick={() => { setEditClickedIndicator(false); setSelected([]) }}><ArrowLeft className="w-5 h-5" />Back</Button>
                    {isFetching ? (
                        <div className="space-y-2 mt-4">
                            <MultiSkeleton />
                        </div>
                    ) : (
                        <>
                            {selected.length === 0 ?
                                <SearchAndSelect
                                    objName={`${entity}`}
                                    placeholder={`Edit ${entity}...`}
                                    data={data}
                                    setContainer={setSelected}
                                    container={selected}
                                /> :
                                <p>{selected.length === 1 && selected[0].value}</p>}
                        </>
                    )}
                </>
            )}
        </>

    )
}