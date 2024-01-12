'use client';

import { Button } from '@/components/ui/button';
import { DataModal } from '@/components/ui/modal';
import useAppStore from '@/zustand/app-store';

interface CreateButtonProps {
    objName: string;
    form: React.ReactNode;
}

export const CreateButton: React.FC<CreateButtonProps> = ({
    objName,
    form,
}) => {
    const { modalOpen, toggleModal } = useAppStore();
    // const handleCloseModal = () => {
    //     toggleModal();
    // };
    return (
        <>
            {modalOpen && (
                <DataModal
                    title={`Create ${objName}`}
                    isOpen={modalOpen}
                    // onClose={handleCloseModal}
                    children={form}
                    contentClassName="w-[70%]"
                />
            )}
            <Button size="lg" onClick={() => toggleModal()}>
                Create {objName}
            </Button>
        </>
    );
};
