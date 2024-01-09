"use client"

import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useState } from 'react';

export interface SearchBarInterface {
    id: string;
    value: string;
}

interface SearchBarProps {
    objName?: string;
    placeholder: string;
    data: SearchBarInterface[]
}

export const SearchBar: React.FC<SearchBarProps> = ({ objName, placeholder, data }) => {
    const [query, setQuery] = useState('');
    const [filteredData, setFilteredData] = useState<SearchBarInterface[]>([]);

    const handleSearch = (searchQuery: string) => {
        setQuery(searchQuery);
        const filtered = data.filter(item =>
            item.value.toLowerCase().includes(searchQuery.toLowerCase())
        );
        setFilteredData(filtered);
    };

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
                <div className="w-full bg-slate-700 border rounded-2xl max-h-60 overflow-auto">
                    {filteredData.map(item => (
                        <div key={item.id} className="p-2 hover:bg-slate-500 hover:cursor-pointer">
                            {item.value}
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};
