'use client';

import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useEffect, useMemo, useState } from 'react';
import { Button } from '@/components/ui/button';
import {
    Sheet,
    SheetContent,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from '@/components/ui/sheet';
import { MultiSkeleton } from '@/components/ui/multi-skeleton';
import { CopyButton } from '../table/copy-button';

export interface SearchAndSelectInterface {
    id: string;
    value: string;
}

interface SearchAndSelectProps {
    objName?: string;
    placeholder: string;
    data: SearchAndSelectInterface[];
    container: SearchAndSelectInterface[] | [];
    setContainer: (obj: SearchAndSelectInterface[] | []) => void;
}

export const SearchAndSelect: React.FC<SearchAndSelectProps> = ({
    objName,
    placeholder,
    data,
    setContainer,
    container,
}) => {
    const [query, setQuery] = useState('');

    const filteredData: SearchAndSelectInterface[] = useMemo(() => {
        return data.filter(
            item =>
                !container.some(containerItem => containerItem.id === item.id) &&
                item.value.toLowerCase().includes(query.toLowerCase()),
        );
    }, [data, container, query]);

    const selectItem = (item: SearchAndSelectInterface) => {
        setContainer([...container, item]);
        // const updatedFilteredData = filteredData.filter((filteredItem) => filteredItem.id !== item.id);
        // setFilteredData(updatedFilteredData);
    };

    return (
        <div className="flex flex-col mt-2 w-full items-center gap-1.5">
            <Label htmlFor="search-bar" className="text-lg">
                Search {objName}
            </Label>
            <Input
                type="text"
                id="search-bar"
                placeholder={placeholder}
                className="w-full rounded-lg px-8 py-2 text-full"
                value={query}
                onChange={e => setQuery(e.target.value)}
            />
            {query && (
                <div className="w-full max-h-60 overflow-auto">
                    {filteredData.map(item => (
                        <div className="flex justify-between" key={item.id}>
                            <Button
                                variant="outline"
                                onClick={() => selectItem(item)}
                                key={item.id}
                                className="bg-slate-500 w-full justify-start"
                            >
                                {item.value}
                            </Button>
                            {objName &&
                                [
                                    'Context',
                                    'Action',
                                    'Policy',
                                    'User',
                                ].includes(objName) && (
                                    <QuickView id={item.id} entity={objName} />
                                )}
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

const QuickView = ({ id, entity }: { id: string; entity: string }) => {
    const [data, setData] = useState<any[]>([]);
    const [isFetching, setIsFetching] = useState(false);
    const [quickViewClicked, setQuickViewClicked] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            try {
                setIsFetching(true);
                const response = await fetch(
                    `/api/${entity.toLowerCase()}/getById?id=${id}`,
                );
                const data = await response.json();
                setData(data.message ? data.message : []);
            } catch (error) {
                console.error('Error fetching data:', error);
            } finally {
                setIsFetching(false);
            }
        };
        if (quickViewClicked) {
            fetchData();
        }
    }, [quickViewClicked]);

    return (
        <Sheet>
            <SheetTrigger asChild>
                <Button
                    onClick={() => setQuickViewClicked(true)}
                    variant="secondary"
                    key={id}
                    className="w-1/4 justify-center"
                >
                    Quick View
                </Button>
            </SheetTrigger>
            <SheetContent side="top">
                <SheetHeader>
                    <SheetTitle>
                        {isFetching ? 'Loading...' : entity}
                    </SheetTitle>
                </SheetHeader>
                {isFetching ? (
                    <MultiSkeleton number={4} />
                ) : (
                    data.length === 1 && (
                        <>
                            <ul className="my-2">
                                {Object.entries(data[0]).map(
                                    ([key, value]) =>
                                        value !== null &&
                                        value !== undefined && (
                                            <li key={key}>
                                                <strong>{key}:</strong>{' '}
                                                {typeof value === 'object' && value !== null ? (
                                                    <pre>{JSON.stringify(value, null, 2)}</pre> // Pretty print the JSON
                                                ) : (
                                                    value.toString()
                                                )}
                                            </li>
                                        ),
                                )}
                            </ul>
                            <CopyButton data={data} />
                        </>
                    )
                )}
            </SheetContent>
        </Sheet>
    );
};
