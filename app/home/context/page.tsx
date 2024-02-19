'use client';

import { ContextForm } from '@/app/home/context/context-form';
import { CreateButton } from '@/components/edit-page-components/create-button';
import useContextStore from '@/zustand/edit-pages/context-store';
import { Separator } from '@/components/ui/separator';
import { EditComponent } from '@/components/edit-page-components/edit-component';
import { DeleteComponent } from '@/components/edit-page-components/delete-component';
import { useQuery } from '@tanstack/react-query';
import {
    RQ_GET_ACTION_VIA_SEARCH,
    RQ_GET_ALL_CONTEXT,
    RQ_GET_CONTEXT_BY_ID,
    RQ_GET_CONTEXT_VIA_SEARCH,
} from '@/react-query/query-keys';
import { TableSuspenseSkeleton } from '@/components/table-suspense';
import { DataTable } from '@/components/table/data-table';
import { contextColumn } from '@/components/table/column-defs/context-column/context-column';
import { Button } from '@/components/ui/button';
import axios from 'axios';
import { PostCreate } from '@/components/edit-page-components/post-create-component';

export default function ContextPage() {
    const {
        createdContext,
        setCreatedContext,
        editClickedIndicator,
        setEditClickedIndicator,
        deleteClickedIndicator,
        setDeleteClickedIndicator,
    } = useContextStore();
    const getDataEndpoint = '/api/context/getContextViaSearch';
    const entity = 'Context';
    const getAllContext = async () => {
        const resp = await axios.get('/api/context/getAll');
        return await resp.data;
    };
    const query = useQuery({
        queryKey: [RQ_GET_ALL_CONTEXT],
        queryFn: getAllContext,
    });
    return (
        <div className="p-8">
            <div className="flex flex-col md:flex-row justify-between">
                <h2 className="text-5xl font-bold tracking-tight text-green-600">
                    Context
                </h2>
                <div className="flex flex-col space-y-2 md:flex-row md:space-y-0 gap-x-4">
                    {!createdContext &&
                        !deleteClickedIndicator &&
                        (!editClickedIndicator ? (
                            <CreateButton
                                objName="Context"
                                form={<ContextForm />}
                            />
                        ) : null)}
                    {!createdContext && !deleteClickedIndicator && (
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
                    {!createdContext && !editClickedIndicator && (
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
            {!createdContext && !deleteClickedIndicator && (
                <EditComponent
                    getDataByIdEndpoint="/api/context/getById"
                    renderEditForm={data => <ContextForm initialData={data} />}
                    editClickedIndicator={editClickedIndicator}
                    setEditClickedIndicator={setEditClickedIndicator}
                    getDataEndpoint={getDataEndpoint}
                    entity={entity}
                    getContextByIdQueryKey={[RQ_GET_CONTEXT_BY_ID]}
                    getContextViaSearchQueryKey={[RQ_GET_CONTEXT_VIA_SEARCH]}
                />
            )}
            {!createdContext && !editClickedIndicator && (
                <DeleteComponent
                    getDataEndpoint={getDataEndpoint}
                    entity={entity}
                    deleteClickedIndicator={deleteClickedIndicator}
                    setDeleteClickedIndicator={setDeleteClickedIndicator}
                    deleteEndpoint="/api/context/delete"
                    getQueryKey={[RQ_GET_CONTEXT_VIA_SEARCH]}
                />
            )}
            {createdContext ||
            deleteClickedIndicator ||
            editClickedIndicator ? null : query.data ? (
                <DataTable
                    data={query.data.message}
                    columns={contextColumn}
                    searchColumnName="contextName"
                />
            ) : (
                <TableSuspenseSkeleton />
            )}
            <div className="flex justify-center ">
                <PostCreate
                    createdObj={createdContext}
                    setCreatedObj={setCreatedContext}
                    createdEntityName="Context"
                    attachToEntityName="Action"
                    attachToEntity_GetViaSearchEndpoint="/api/action/getActionViaSearch"
                    attachToEntity_GetViaSearchEndpoint_QueryKey={
                        RQ_GET_ACTION_VIA_SEARCH
                    }
                />
            </div>
        </div>
    );
}
