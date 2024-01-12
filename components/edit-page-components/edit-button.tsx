import { useEffect, useState } from "react";
import { SearchAndSelect, SearchAndSelectInterface } from "./search";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";

interface EditButtonInterface {
    getDataEndpoint: string
    entity: string
}

export const EditButton: React.FC<EditButtonInterface> = ({ getDataEndpoint, entity }) => {
    const [data, setData] = useState<SearchAndSelectInterface[]>([])
    const [selected, setSelected] = useState<SearchAndSelectInterface[]>([])
    const [edit, toggleEdit] = useState(false)
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
        if (edit) {
            fetchAllData()
        }
    }, [edit])
    return (
        <>
            {!edit ? (
                <Button onClick={() => toggleEdit(!edit)}>
                    {edit ? "Close editor" : `Edit ${entity}`}
                </Button>
            ) : (
                <>
                    {isFetching ? (
                        <div className="space-y-2 mt-4">
                            {[...Array(15)].map((_, index) => (
                                <Skeleton key={index} className="h-8 w-full" />
                            ))}
                        </div>
                    ) : (
                        <>
                            <Button variant="outline" className="max-w-40" onClick={() => setEditClickedIndicator(false)}><ArrowLeft className="w-5 h-5" />Back</Button>
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