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
    RQ_GET_USER_BY_ID,
    RQ_GET_USER_VIA_SEARCH,
    RQ_GET_ALL_USER,
    RQ_GET_POLICY_VIA_SEARCH,
} from '@/react-query/query-keys';
import { policyColumn } from '@/components/table/column-defs/policy-column/policy-column';
import useUserStore from '@/zustand/edit-pages/user-store';
import { UserForm } from './user-form';
import { userColumn } from '@/components/table/column-defs/user-column/user-column';

export default function UserPage() {
    const {
        createdUser,
        setCreatedUser,
        editClickedIndicator,
        setEditClickedIndicator,
        deleteClickedIndicator,
        setDeleteClickedIndicator,
    } = useUserStore();
    const getDataEndpoint = '/api/user/getUserViaSearch';
    const entity = 'User';
    const getAllUser = async () => {
        const resp = await axios.get('/api/user/getAll');
        return await resp.data;
    };
    const query = useQuery({
        queryKey: [RQ_GET_ALL_USER],
        queryFn: getAllUser,
    });
    return (
        <div className="p-8">
            <div className="flex flex-col md:flex-row justify-between">
                <h2 className="text-5xl font-bold tracking-tight text-green-600">
                    User
                </h2>
                <div className="flex flex-col space-y-2 md:flex-row md:space-y-0 gap-x-4">
                    {!createdUser &&
                        !deleteClickedIndicator &&
                        (!editClickedIndicator ? (
                            <CreateButton objName="User" form={<UserForm />} />
                        ) : null)}
                    {!createdUser && !deleteClickedIndicator && (
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
                    {!createdUser && !editClickedIndicator && (
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
            {!createdUser && !deleteClickedIndicator && (
                <EditComponent
                    getDataByIdEndpoint="/api/user/getById"
                    renderEditForm={data => <UserForm initialData={data} />}
                    editClickedIndicator={editClickedIndicator}
                    setEditClickedIndicator={setEditClickedIndicator}
                    getDataEndpoint={getDataEndpoint}
                    entity={entity}
                    getContextByIdQueryKey={[RQ_GET_USER_BY_ID]}
                    getContextViaSearchQueryKey={[RQ_GET_USER_VIA_SEARCH]}
                />
            )}
            {!createdUser && !editClickedIndicator && (
                <DeleteComponent
                    getDataEndpoint={getDataEndpoint}
                    entity={entity}
                    deleteClickedIndicator={deleteClickedIndicator}
                    setDeleteClickedIndicator={setDeleteClickedIndicator}
                    deleteEndpoint="/api/user/delete"
                    getQueryKey={[RQ_GET_USER_VIA_SEARCH]}
                />
            )}
            {createdUser ||
            deleteClickedIndicator ||
            editClickedIndicator ? null : query.data ? (
                <DataTable
                    data={query.data.message}
                    columns={userColumn}
                    searchColumnName="applicationUserId"
                />
            ) : (
                <TableSuspenseSkeleton />
            )}
            <div className="flex justify-center ">
                <PostCreate
                    createdObj={createdUser}
                    setCreatedObj={setCreatedUser}
                    createdEntityName="User"
                    attachToEntityName="Policy"
                    attachToEntity_GetViaSearchEndpoint="/api/policy/getPolicyViaSearch"
                    attachToEntity_GetViaSearchEndpoint_QueryKey={
                        RQ_GET_POLICY_VIA_SEARCH
                    }
                />
            </div>
        </div>
    );
}
