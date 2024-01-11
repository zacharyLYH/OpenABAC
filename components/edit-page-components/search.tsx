"use client"

import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Trash } from 'lucide-react';

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
}

export const SearchAndSelect: React.FC<SearchAndSelectProps> = ({ objName, placeholder, data, setContainer, container }) => {
    const [query, setQuery] = useState('');
    const [filteredData, setFilteredData] = useState<SearchAndSelectInterface[]>([]);


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
        const updatedFilteredData = filteredData.filter((filteredItem) => filteredItem.id !== item.id);
        setFilteredData(updatedFilteredData);
    }

    const deSelectItem = (item: SearchAndSelectInterface) => {
        const removedItem = container.filter((containerItem) => containerItem.id !== item.id);
        setContainer(removedItem);
        setFilteredData([...filteredData, item]);
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
                        <Button variant="outline" onClick={() => selectItem(item)} key={item.id} className="bg-slate-500 w-full justify-start">
                            {item.value}
                        </Button>
                    ))}
                </div>
            )}
            {container.length > 0 &&
                container.map((item) => (
                    <div key={item.id} className='flex w-3/4 flex-row gap-x-8 justify-between items-center'>
                        <p className='text-medium text-muted-foreground'>{item.value}</p>
                        <Button variant="destructive" onClick={() => deSelectItem(item)}>
                            <Trash className='w-4 h-4' />
                        </Button>
                    </div>
                ))
            }
        </div>
    );
};
