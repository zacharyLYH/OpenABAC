"use client"

import { ContextForm } from '@/app/home/context/context-form';
import { CreateButton } from '@/components/edit-page-components/create-button';
import useContextStore from '@/zustand/edit-pages/context-store';
import { AttachToAction } from './attachAnAction';
import { Separator } from '@/components/ui/separator';
import { EditButton } from '@/components/edit-page-components/edit-button';

export default function ContextPage() {
    const { createdContext, editClickedIndicator, setEditClickedIndicator } = useContextStore()

    return (
        <div className='p-8'>
            <div className='flex flex-row justify-between'>
                <h2 className="text-5xl font-bold tracking-tight">Context</h2>
            </div>
            <Separator className='my-4' />
            <div className='flex flex-col gap-y-4'>
                {createdContext ? null :
                    !editClickedIndicator ? <CreateButton objName="Context" form={<ContextForm />} /> : null}
                {createdContext ? null :
                    <EditButton getDataByIdEndpoint='/api/context/getById' renderEditForm={(data) => <ContextForm initialData={data} />} editClickedIndicator={editClickedIndicator}
                        setEditClickedIndicator={setEditClickedIndicator} getDataEndpoint='/api/context/getContextViaSearch' entity='Context' />}
            </div>
            <div className='flex justify-center '>
                {createdContext ? <AttachToAction /> : null}
            </div>
        </div>
    );
}
