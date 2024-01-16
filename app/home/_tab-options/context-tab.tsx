import { TableSuspenseSkeleton } from '@/components/table-suspense';
import { contextColumn } from '@/components/table/column-defs/context-column/context-column';
import { DataTable } from '@/components/table/data-table';
import { Context } from '@/lib/interface';
import { Suspense } from 'react';

interface ViewContextsTabProps {
    context: Context[];
}

export default async function ViewContextsTab({
    context,
}: ViewContextsTabProps) {
    // const delay = (ms: number) => //mock suspense boundary for table
    //     new Promise(resolve => setTimeout(resolve, ms));
    // await delay(10000);
    return (
        <section>
            {}
            <Suspense fallback={<TableSuspenseSkeleton />}>
                <DataTable
                    data={context}
                    columns={contextColumn}
                    searchColumnName="contextDescription"
                />
            </Suspense>
        </section>
    );
}
