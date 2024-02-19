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
import useActionStore from '@/zustand/edit-pages/action-store';
import {
    RQ_GET_ACTION_BY_ID,
    RQ_GET_ACTION_VIA_SEARCH,
    RQ_GET_ALL_ACTION,
    RQ_GET_POLICY_VIA_SEARCH,
} from '@/react-query/query-keys';
import { ActionForm } from './action-form';
import { actionColumn } from '@/components/table/column-defs/action-column/action-column';

export default function ActionPage() {
    const {
        createdAction,
        setCreatedAction,
        editClickedIndicator,
        setEditClickedIndicator,
        deleteClickedIndicator,
        setDeleteClickedIndicator,
    } = useActionStore();
    const getDataEndpoint = '/api/action/getActionViaSearch';
    const entity = 'Action';
    const getAllAction = async () => {
        const resp = await axios.get('/api/action/getAll');
        return await resp.data;
    };
    const query = useQuery({
        queryKey: [RQ_GET_ALL_ACTION],
        queryFn: getAllAction,
    });
    return (
        <div className="p-8">
            <div className="flex flex-col md:flex-row justify-between">
                <h2 className="text-5xl font-bold tracking-tight text-green-600">
                    Action
                </h2>
                <div className="flex flex-col space-y-2 md:flex-row md:space-y-0 gap-x-4">
                    {!createdAction &&
                        !deleteClickedIndicator &&
                        (!editClickedIndicator ? (
                            <CreateButton
                                objName="Action"
                                form={<ActionForm />}
                            />
                        ) : null)}
                    {!createdAction && !deleteClickedIndicator && (
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
                    {!createdAction && !editClickedIndicator && (
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
            {!createdAction && !deleteClickedIndicator && (
                <EditComponent
                    getDataByIdEndpoint="/api/action/getById"
                    renderEditForm={data => <ActionForm initialData={data} />}
                    editClickedIndicator={editClickedIndicator}
                    setEditClickedIndicator={setEditClickedIndicator}
                    getDataEndpoint={getDataEndpoint}
                    entity={entity}
                    getContextByIdQueryKey={[RQ_GET_ACTION_BY_ID]}
                    getContextViaSearchQueryKey={[RQ_GET_ACTION_VIA_SEARCH]}
                />
            )}
            {!createdAction && !editClickedIndicator && (
                <DeleteComponent
                    getDataEndpoint={getDataEndpoint}
                    entity={entity}
                    deleteClickedIndicator={deleteClickedIndicator}
                    setDeleteClickedIndicator={setDeleteClickedIndicator}
                    deleteEndpoint="/api/action/delete"
                    getQueryKey={[RQ_GET_ACTION_VIA_SEARCH]}
                />
            )}
            {createdAction ||
            deleteClickedIndicator ||
            editClickedIndicator ? null : query.data ? (
                <DataTable
                    data={query.data.message}
                    columns={actionColumn}
                    searchColumnName="actionName"
                />
            ) : (
                <TableSuspenseSkeleton />
            )}
            <div className="flex justify-center ">
                <PostCreate
                    createdObj={createdAction}
                    setCreatedObj={setCreatedAction}
                    createdEntityName="Action"
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
