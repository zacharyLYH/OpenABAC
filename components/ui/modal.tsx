'use client';

import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
} from '@/components/ui/dialog';
import { cn } from '@/lib/utils';
import { useEffect, useRef } from 'react';

interface ModalProps {
    title: string;
    description?: string;
    isOpen: boolean;
    onClose?: () => void;
    children?: React.ReactNode;
    contentClassName?: string;
}

export const DataModal: React.FC<ModalProps> = ({
    title,
    description,
    isOpen,
    onClose,
    children,
    contentClassName,
}) => {
    const onChange = (open: boolean) => {
        // if (!open) {
        //     onClose();
        // }
    };

    const contentRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            e.stopPropagation();
        };

        if (isOpen && contentRef.current) {
            contentRef.current.addEventListener('keydown', handleKeyDown);
        }

        return () => {
            if (contentRef.current) {
                contentRef.current.removeEventListener(
                    'keydown',
                    handleKeyDown,
                );
            }
        };
    }, [isOpen]);

    return (
        <Dialog open={isOpen} onOpenChange={onChange} modal>
            <DialogContent
                ref={contentRef}
                className={cn('overflow-auto max-h-screen', contentClassName)}
            >
                <DialogHeader>
                    <DialogTitle>{title}</DialogTitle>
                    <DialogDescription>{description}</DialogDescription>
                    <div>{children}</div>
                </DialogHeader>
            </DialogContent>
        </Dialog>
    );
};
