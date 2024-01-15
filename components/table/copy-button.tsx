'use client';

import { Button } from '@/components/ui/button';
import { Copy } from 'lucide-react';
import { objectToString } from './helper';
import { toast } from 'sonner';

interface CellActionInterface {
    data: any;
}

export const CopyButton: React.FC<CellActionInterface> = ({ data }) => {
    const onCopy = (copyable: string) => {
        navigator.clipboard.writeText(copyable);
        toast('Copied successfully!');
    };

    return (
        <Button
            size="sm"
            variant="secondary"
            onClick={() => onCopy(objectToString(data))}
        >
            <Copy className="mr-2 h-4 w-4" />
            Copy
        </Button>
    );
};
