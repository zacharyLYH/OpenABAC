'use client';

import { ContextForm } from '@/app/home/context/context-form';
import { CreateButton } from '@/components/edit-page-components/create-button';
import useContextStore from '@/zustand/edit-pages/context-store';
import { AttachToAction } from './attachAnAction';
import { Separator } from '@/components/ui/separator';
import { EditButton } from '@/components/edit-page-components/edit-button';
import { DeleteButton } from '@/components/edit-page-components/delete-button';
import { useQuery } from '@tanstack/react-query';
import { RQ_GET_ALL_CONTEXT } from '@/query/react-query/query-keys'
import axios from "axios";
import { Context } from '@/lib/interface';
import { Suspense } from 'react';
import { TableSuspenseSkeleton } from '@/components/table-suspense';
import { DataTable } from '@/components/table/data-table';
import { contextColumn } from '@/components/table/column-defs/context-column/context-column';

export default function ContextPage() {
    const {
        createdContext,
        editClickedIndicator,
        setEditClickedIndicator,
        deleteClickedIndicator,
        setDeleteClickedIndicator,
    } = useContextStore();
    const getDataEndpoint = '/api/context/getContextViaSearch';
    const entity = 'Context';
    const getAllContext = async () => {
        const resp = await axios.get("/api/context/getAll")
        return await resp.data
    }
    const query = useQuery({ queryKey: [RQ_GET_ALL_CONTEXT], queryFn: getAllContext })
    const context: Context[] = query.data.message
    return (
        <div className="p-8">
            <div className="flex flex-row justify-between">
                <h2 className="text-5xl font-bold tracking-tight">Context</h2>
                <div className="flex flex-row gap-x-4">
                    {!createdContext &&
                        !deleteClickedIndicator &&
                        (!editClickedIndicator ? (
                            <CreateButton
                                objName="Context"
                                form={<ContextForm />}
                            />
                        ) : null)}

                    {!createdContext && !deleteClickedIndicator && (
                        <EditButton
                            getDataByIdEndpoint="/api/context/getById"
                            renderEditForm={data => (
                                <ContextForm initialData={data} />
                            )}
                            editClickedIndicator={editClickedIndicator}
                            setEditClickedIndicator={setEditClickedIndicator}
                            getDataEndpoint={getDataEndpoint}
                            entity={entity}
                        />
                    )}

                    {!createdContext && !editClickedIndicator && (
                        <DeleteButton
                            getDataEndpoint={getDataEndpoint}
                            entity={entity}
                            deleteClickedIndicator={deleteClickedIndicator}
                            setDeleteClickedIndicator={setDeleteClickedIndicator}
                            deleteEndpoint="/api/context/delete"
                        />
                    )}
                </div>
            </div>
            <Separator className='my-8' />
            <Suspense fallback={<TableSuspenseSkeleton />}>
                <DataTable
                    data={context}
                    columns={contextColumn}
                    searchColumnName="contextDescription"
                />
            </Suspense>
            <div className="flex justify-center ">
                {createdContext ? <AttachToAction /> : null}
            </div>
        </div>
    );
}
