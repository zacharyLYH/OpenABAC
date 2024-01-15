"use client"

import { ContextForm } from '@/app/home/context/context-form';
import { CreateButton } from '@/components/edit-page-components/create-button';
import useContextStore from '@/zustand/edit-pages/context-store';
import { AttachToAction } from './attachAnAction';
import { Separator } from '@/components/ui/separator';
import { EditButton } from '@/components/edit-page-components/edit-button';
import { DeleteButton } from '@/components/edit-page-components/delete-button';

export default function ContextPage() {
    const { createdContext, editClickedIndicator, setEditClickedIndicator, deleteClickedIndicator, setDeleteClickedIndicator } = useContextStore()
    const getDataEndpoint = '/api/context/getContextViaSearch'
    const entity = 'Context'

    return (
        <div className='p-8'>
            <div className='flex flex-row justify-between'>
                <h2 className="text-5xl font-bold tracking-tight">Context</h2>
            </div>
            <Separator className='my-4' />
            <div className='flex flex-col gap-y-4'>
                {!createdContext && !deleteClickedIndicator && (
                    !editClickedIndicator ? <CreateButton objName="Context" form={<ContextForm />} /> : null
                )}

                {!createdContext && !deleteClickedIndicator && (
                    <EditButton
                        getDataByIdEndpoint='/api/context/getById'
                        renderEditForm={(data) => <ContextForm initialData={data} />}
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
                        deleteEndpoint='/api/context/delete'
                    />
                )}

            </div>
            <div className='flex justify-center '>
                {createdContext ? <AttachToAction /> : null}
            </div>
        </div>
    );
}
