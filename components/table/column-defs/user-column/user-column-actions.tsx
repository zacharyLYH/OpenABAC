"use client"

import { Button } from "@/components/ui/button"
import { DataModal } from "@/components/ui/modal"
import { Policy } from "@/lib/interface"
import { useEffect, useState } from "react"
import { DataTable } from "@/components/table/data-table"
import { getPolicy } from "@/lib/service/policy/get-policy"
import { policyColumn } from "../policy-column/policy-column"

interface GetPoliciesButtonProps {
    applicationUserId: string
}

export const GetPoliciesButton: React.FC<GetPoliciesButtonProps> = ({ applicationUserId }) => {
    const [modalOpen, setModalOpen] = useState(false);
    const [data, setData] = useState<Policy[] | null>(null);

    useEffect(() => {
        const fetchData = async () => {
            const result = await getPolicy();
            setData(result);
        };

        if (modalOpen) {
            fetchData();
        }
    }, [modalOpen]);

    const handleCloseModal = () => {
        setModalOpen(false);
    };

    return (
        <>
            {modalOpen && data !== null && <DataModal title="Policies" isOpen={modalOpen} onClose={handleCloseModal} children={<DataTable data={data} columns={policyColumn} showColumnVisibilityDropdown={false} searchColumnName="policyName" />} />}
            <Button size="sm" variant="secondary" onClick={() => setModalOpen(!modalOpen)}>
                Policies
            </Button>
        </>
    );
};