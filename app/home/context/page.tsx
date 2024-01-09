"use client"

import { CreateContextForm } from '@/app/home/context/createContextForm';
import { CreateButton } from '@/components/edit-page-components/create-button';
import useContextStore from '@/zustand/edit-pages/context-store';
import { AttachToAction } from './attachToAction';
import { Separator } from '@/components/ui/separator';

export default function ContextPage() {
    const { createdContext } = useContextStore()
    return (
        <div className='p-8'>
            <div className='flex flex-row justify-between'>
                <h2 className="text-5xl font-bold tracking-tight">Context</h2>
                {createdContext ? null :
                    <CreateButton objName="Context" form={<CreateContextForm />} />}
            </div>
            <Separator className='my-4' />
            <div className='flex justify-center '>
                {createdContext ? <AttachToAction /> : null}
            </div>

        </div>
    );
}
