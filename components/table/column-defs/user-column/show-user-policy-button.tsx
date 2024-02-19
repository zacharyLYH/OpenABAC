'use client';

import { Button } from '@/components/ui/button';
import { DataModal } from '@/components/ui/modal';
import { Policy } from '@/abac/interface';
import { useEffect, useState } from 'react';
import { DataTable } from '@/components/table/data-table';
import { getAllPolicyGivenApplicationUserId } from '@/abac/helpers/policy/get-policy';
import { policyColumn } from '../policy-column/policy-column';

interface GetPoliciesButtonProps {
    applicationUserId: string;
}

export const GetPoliciesButton: React.FC<GetPoliciesButtonProps> = ({
    applicationUserId,
}) => {
    const [modalOpen, toggleModal] = useState(false);
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
                <DataModal
                    title="Policies"
                    isOpen={modalOpen}
                    onClose={() => toggleModal(false)}
                >
                    <DataTable
                        data={data}
                        columns={policyColumn}
                        showColumnVisibilityDropdown={false}
                        searchColumnName="policyName"
                    />
                </DataModal>
            )}
            <Button
                size="default"
                variant="default"
                onClick={() => toggleModal(true)}
            >
                Policies
            </Button>
        </>
    );
};
