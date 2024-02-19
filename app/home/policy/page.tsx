'use client';

import { CreateButton } from '@/components/edit-page-components/create-button';
import { Separator } from '@/components/ui/separator';
import { EditComponent } from '@/components/edit-page-components/edit-component';
import { DeleteComponent } from '@/components/edit-page-components/delete-component';
import { useQuery } from '@tanstack/react-query';
import { TableSuspenseSkeleton } from '@/components/table-suspense';
import { DataTable } from '@/components/table/data-table';
import { Button } from '@/components/ui/button';
import axios from 'axios';
import { PostCreate } from '@/components/edit-page-components/post-create-component';
import {
    RQ_GET_POLICY_BY_ID,
    RQ_GET_ALL_POLICY,
    RQ_GET_USER_VIA_SEARCH,
    RQ_GET_POLICY_VIA_SEARCH,
} from '@/react-query/query-keys';
import { PolicyForm } from './policy-form';
import usePolicyStore from '@/zustand/edit-pages/policy-store';
import { policyColumn } from '@/components/table/column-defs/policy-column/policy-column';

export default function PolicyPage() {
    const {
        createdPolicy,
        setCreatedPolicy,
        editClickedIndicator,
        setEditClickedIndicator,
        deleteClickedIndicator,
        setDeleteClickedIndicator,
    } = usePolicyStore();
    const getDataEndpoint = '/api/policy/getPolicyViaSearch';
    const entity = 'Policy';
    const getAllPolicy = async () => {
        const resp = await axios.get('/api/policy/getAll');
        return await resp.data;
    };
    const query = useQuery({
        queryKey: [RQ_GET_ALL_POLICY],
        queryFn: getAllPolicy,
    });
    return (
        <div className="p-8">
            <div className="flex flex-col md:flex-row justify-between">
                <h2 className="text-5xl font-bold tracking-tight text-green-600">
                    Policy
                </h2>
                <div className="flex flex-col space-y-2 md:flex-row md:space-y-0 gap-x-4">
                    {!createdPolicy &&
                        !deleteClickedIndicator &&
                        (!editClickedIndicator ? (
                            <CreateButton
                                objName="Policy"
                                form={<PolicyForm />}
                            />
                        ) : null)}
                    {!createdPolicy && !deleteClickedIndicator && (
                        <Button
                            size="lg"
                            onClick={() =>
                                setEditClickedIndicator(!editClickedIndicator)
                            }
                        >
                            {editClickedIndicator
                                ? 'Close editor'
                                : `Edit ${entity}`}
                        </Button>
                    )}
                    {!createdPolicy && !editClickedIndicator && (
                        <Button
                            size="lg"
                            onClick={() =>
                                setDeleteClickedIndicator(
                                    !deleteClickedIndicator,
                                )
                            }
                        >
                            {deleteClickedIndicator
                                ? 'Close editor'
                                : `Delete ${entity}`}
                        </Button>
                    )}
                </div>
            </div>
            <Separator className="my-8" />
            {!createdPolicy && !deleteClickedIndicator && (
                <EditComponent
                    getDataByIdEndpoint="/api/policy/getById"
                    renderEditForm={data => <PolicyForm initialData={data} />}
                    editClickedIndicator={editClickedIndicator}
                    setEditClickedIndicator={setEditClickedIndicator}
                    getDataEndpoint={getDataEndpoint}
                    entity={entity}
                    getContextByIdQueryKey={[RQ_GET_POLICY_BY_ID]}
                    getContextViaSearchQueryKey={[RQ_GET_POLICY_VIA_SEARCH]}
                />
            )}
            {!createdPolicy && !editClickedIndicator && (
                <DeleteComponent
                    getDataEndpoint={getDataEndpoint}
                    entity={entity}
                    deleteClickedIndicator={deleteClickedIndicator}
                    setDeleteClickedIndicator={setDeleteClickedIndicator}
                    deleteEndpoint="/api/policy/delete"
                    getQueryKey={[RQ_GET_POLICY_VIA_SEARCH]}
                />
            )}
            {createdPolicy ||
            deleteClickedIndicator ||
            editClickedIndicator ? null : query.data ? (
                <DataTable
                    data={query.data.message}
                    columns={policyColumn}
                    searchColumnName="policyName"
                />
            ) : (
                <TableSuspenseSkeleton />
            )}
            <div className="flex justify-center ">
                <PostCreate
                    createdObj={createdPolicy}
                    setCreatedObj={setCreatedPolicy}
                    createdEntityName="Policy"
                    attachToEntityName="User"
                    attachToEntity_GetViaSearchEndpoint="/api/user/getUserViaSearch"
                    attachToEntity_GetViaSearchEndpoint_QueryKey={
                        RQ_GET_USER_VIA_SEARCH
                    }
                />
            </div>
        </div>
    );
}
