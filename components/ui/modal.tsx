'use client';

import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
} from '@/components/ui/dialog';
import { cn } from '@/lib/utils';
import useAppStore from '@/zustand/app-store';
import { useEffect, useRef } from 'react';

interface ModalProps {
    title: string;
    description?: string;
    isOpen: boolean;
    children?: React.ReactNode;
    contentClassName?: string;
    onClose?: () => void;
}

export const DataModal: React.FC<ModalProps> = ({
    title,
    description,
    isOpen,
    children,
    contentClassName,
    onClose,
}) => {
    const { toggleModal } = useAppStore();

    const onChange = (open: boolean) => {
        if (!open) {
            if (onClose) {
                onClose();
            } else {
                toggleModal();
            }
        }
    };

    const contentRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            e.stopPropagation();
        };

        const currentContentRef = contentRef.current;

        if (isOpen && currentContentRef) {
            currentContentRef.addEventListener('keydown', handleKeyDown);
        }

        return () => {
            if (currentContentRef) {
                currentContentRef.removeEventListener('keydown', handleKeyDown);
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
