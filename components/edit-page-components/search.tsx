"use client"

import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Trash } from 'lucide-react';
import {
    Sheet,
    SheetContent,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet"
import { MultiSkeleton } from '@/components/ui/multi-skeleton';
import { CopyButton } from '../table/copy-button';


export interface SearchAndSelectInterface {
    id: string;
    value: string;
}

interface SearchAndSelectProps {
    objName?: string;
    placeholder: string;
    data: SearchAndSelectInterface[]
    container: SearchAndSelectInterface[] | []
    setContainer: (obj: SearchAndSelectInterface[] | []) => void
    showSelected?: boolean
}

export const SearchAndSelect: React.FC<SearchAndSelectProps> = ({ objName, placeholder, data, setContainer, container, showSelected = true }) => {
    const [query, setQuery] = useState('');
    const [filteredData, setFilteredData] = useState<SearchAndSelectInterface[]>([]);

    useEffect(() => {
        handleSearch(query)
    }, [container.length])

    const handleSearch = (searchQuery: string) => {
        setQuery(searchQuery);

        const filtered = data.filter((item) =>
            !container.some((containerItem) => containerItem.id === item.id) &&
            item.value.toLowerCase().includes(searchQuery.toLowerCase())
        );

        setFilteredData(filtered);
    };

    const selectItem = (item: SearchAndSelectInterface) => {
        setContainer([...container, item]);
        // const updatedFilteredData = filteredData.filter((filteredItem) => filteredItem.id !== item.id);
        // setFilteredData(updatedFilteredData);
    }

    const deSelectItem = (item: SearchAndSelectInterface) => {
        const removedItem = container.filter((containerItem) => containerItem.id !== item.id);
        setContainer(removedItem);
        // setFilteredData([...filteredData, item]);
    }

    return (
        <div className="flex flex-col mt-2 w-full items-center gap-1.5">
            <Label htmlFor="search-bar" className='text-lg'>Search {objName}</Label>
            <Input
                type="text"
                id="search-bar"
                placeholder={placeholder}
                className='w-full rounded-lg px-8 py-2 text-full'
                value={query}
                onChange={(e) => handleSearch(e.target.value)}
            />
            {query && (
                <div className="w-full max-h-60 overflow-auto">
                    {filteredData.map(item => (
                        <div className='flex justify-between' id={item.id}>
                            <Button variant="outline" onClick={() => selectItem(item)} key={item.id} className="bg-slate-500 w-full justify-start">
                                {item.value}
                            </Button>
                            {objName && ['Context', 'Action', 'Policy', 'User'].includes(objName) &&
                                <QuickView id={item.id} entity={objName} />
                            }
                        </div>

                    ))}
                </div>
            )}
            {showSelected && container.length > 0 &&
                container.map((item) => (
                    <div key={item.id} className='flex w-3/4 flex-row gap-x-8 justify-between items-center'>
                        <p key={item.id} className='text-medium text-muted-foreground'>{item.value}</p>
                        <Button key={item.id} variant="destructive" onClick={() => deSelectItem(item)}>
                            <Trash className='w-4 h-4' />
                        </Button>
                    </div>
                ))
            }
        </div>
    );
};

const QuickView = ({ id, entity }: { id: string, entity: string }) => {
    const [data, setData] = useState<any[]>([])
    const [isFetching, setIsFetching] = useState(false)
    const [quickViewClicked, setQuickViewClicked] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            try {
                setIsFetching(true)
                const response = await fetch(`/api/${entity.toLowerCase()}/getById?id=${id}`);
                const data = await response.json();
                setData(data.message ? data.message : [])
            } catch (error) {
                console.error('Error fetching data:', error);
            } finally {
                setIsFetching(false)
            }
        }
        if (quickViewClicked) {
            fetchData();
        }
    }, [quickViewClicked])

    return (
        <Sheet>
            <SheetTrigger asChild>
                <Button onClick={() => setQuickViewClicked(true)} variant="secondary" key={id} className="w-1/4 justify-center">
                    Quick View
                </Button>
            </SheetTrigger>
            <SheetContent side="top">
                <SheetHeader>
                    <SheetTitle>{isFetching ? "Loading..." : entity}</SheetTitle>
                </SheetHeader>
                {isFetching ? (
                    <MultiSkeleton number={4} />
                ) : data.length === 1 && (
                    <>
                        <ul className='my-2'>
                            {Object.entries(data[0]).map(([key, value]) => (
                                (value !== null && value !== undefined) && (
                                    <li key={key}>
                                        <strong>{key}:</strong> {value.toString()}
                                    </li>
                                )
                            ))}
                        </ul>
                        <CopyButton data={data} />
                    </>
                )}
            </SheetContent>
        </Sheet>
    )
}
