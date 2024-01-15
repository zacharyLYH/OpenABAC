'use client';

import { Button } from '@/components/ui/button';
import { X } from 'lucide-react';
import { SearchAndSelectInterface } from '../edit-page-components/search';

interface RemoveRowFromTableButtonProps {
    removeFunction: (item: SearchAndSelectInterface) => void;
    item: SearchAndSelectInterface;
}

export const RemoveRowFromTableButton: React.FC<
    RemoveRowFromTableButtonProps
> = ({ removeFunction, item }) => {
    return (
        <Button
            size="default"
            className="bg-red-600"
            onClick={() => removeFunction(item)}
        >
            <X className="w-4 h-4" />
        </Button>
    );
};
