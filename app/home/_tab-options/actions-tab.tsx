import { TableSuspenseSkeleton } from '@/components/table-suspense';
import { actionColumn } from '@/components/table/column-defs/action-column/action-column';
import { DataTable } from '@/components/table/data-table';
import { Action } from '@/lib/interface';
import { getAllActions } from '@/lib/service/action/get-action';
import { Suspense } from 'react';

interface ViewActionsTabProps {
    action: Action[];
}

export default async function ViewActionsTab({ action }: ViewActionsTabProps) {
    // const delay = (ms: number) => //mock suspense boundary for table
    //     new Promise(resolve => setTimeout(resolve, ms));
    // await delay(10000);
    return (
        <section>
            {}
            <Suspense fallback={<TableSuspenseSkeleton />}>
                <DataTable
                    data={action}
                    columns={actionColumn}
                    searchColumnName="actionName"
                />
            </Suspense>
        </section>
    );
}
