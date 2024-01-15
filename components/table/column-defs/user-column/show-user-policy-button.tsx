'use client';

import { Button } from '@/components/ui/button';
import { DataModal } from '@/components/ui/modal';
import { Policy } from '@/lib/interface';
import { useEffect, useState } from 'react';
import { DataTable } from '@/components/table/data-table';
import { getAllPolicyGivenApplicationUserId } from '@/lib/service/policy/get-policy';
import { policyColumn } from '../policy-column/policy-column';
import useAppStore from '@/zustand/app-store';

interface GetPoliciesButtonProps {
    applicationUserId: string;
}

export const GetPoliciesButton: React.FC<GetPoliciesButtonProps> = ({
    applicationUserId,
}) => {
    const { modalOpen, toggleModal } = useAppStore();
    const [data, setData] = useState<Policy[] | null>(null);

    useEffect(() => {
        const fetchData = async () => {
            const result =
                await getAllPolicyGivenApplicationUserId(applicationUserId);
            setData(result);
        };

        if (modalOpen) {
            fetchData();
        }
    }, [modalOpen]);

    return (
        <>
            {modalOpen && data !== null && (
                <DataModal title="Policies" isOpen={modalOpen}>
                    <DataTable
                        data={data}
                        columns={policyColumn}
                        showColumnVisibilityDropdown={false}
                        searchColumnName="policyName"
                    />
                </DataModal>
            )}
            <Button size="default" variant="default" onClick={toggleModal}>
                Policies
            </Button>
        </>
    );
};
