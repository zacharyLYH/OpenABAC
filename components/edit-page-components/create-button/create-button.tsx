'use client';

import { Button } from '@/components/ui/button';
import { useState } from 'react';
import { DataModal } from '@/components/ui/modal';

interface CreateButtonProps {
    objName: string;
    form: React.ReactNode;
}

export const CreateButton: React.FC<CreateButtonProps> = ({
    objName,
    form,
}) => {
    const [modalOpen, setModalOpen] = useState(false);
    const handleCloseModal = () => {
        setModalOpen(false);
    };
    return (
        <>
            {modalOpen && (
                <DataModal
                    title={`Create ${objName}`}
                    isOpen={modalOpen}
                    onClose={handleCloseModal}
                    children={form}
                    contentClassName="w-[70%]"
                />
            )}
            <Button size="lg" onClick={() => setModalOpen(!modalOpen)}>
                Create {objName}
            </Button>
        </>
    );
};
