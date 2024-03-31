'use client';

import { Button } from '@/components/ui/button';
import { CheckCircle, Copy } from 'lucide-react';
import { objectToString } from './helper';
import { toast } from 'sonner';
import { useState } from 'react';

interface CellActionInterface {
    data: any;
}

export const CopyButton: React.FC<CellActionInterface> = ({ data }) => {
    const [copyClicked, setCopyClicked] = useState(false);

    const onCopy = (copyable: string) => {
        navigator.clipboard.writeText(copyable);
        setCopyClicked(true);
        toast('Copied successfully!');
        setTimeout(() => {
            setCopyClicked(false);
        }, 1000);
    };

    return (
        <Button
            size="sm"
            variant="secondary"
            onClick={() => onCopy(objectToString(data))}
            className={
                copyClicked
                    ? 'min-w-[80px] transition-background bg-green-500 text-white duration-1000'
                    : 'min-w-[80px]'
            }
        >
            {copyClicked ? (
                <CheckCircle className="h-4 w-4" />
            ) : (
                <>
                    <Copy className="mr-2 h-4 w-4" />
                    Copy
                </>
            )}
        </Button>
    );
};
