import { TableSuspenseSkeleton } from '@/components/table-suspense';
import { actionColumn } from '@/components/table/column-defs/action-column/action-column';
import { DataTable } from '@/components/table/data-table';
import { Action } from '@/lib/interface';
import { getAllActions } from '@/lib/service/action/get-action';
import { Suspense } from 'react';

export default async function ViewActionsTab() {
    // const delay = (ms: number) => //mock suspense boundary for table
    //     new Promise(resolve => setTimeout(resolve, ms));
    // await delay(10000);
    const data: Action[] = await getAllActions();
    return (
        <section>
            {}
            <Suspense fallback={<TableSuspenseSkeleton />}>
                <DataTable
                    data={data}
                    columns={actionColumn}
                    searchColumnName="actionName"
                />
            </Suspense>
        </section>
    );
}
