import { TableSuspenseSkeleton } from '@/components/table-suspense';
import { contextColumn } from '@/components/table/column-defs/context-column/context-column';
import { DataTable } from '@/components/table/data-table';
import { Context } from '@/lib/interface';
import { getAllContext } from '@/lib/service/context/get-context';
import { Suspense } from 'react';

export default async function ViewContextsTab() {
    // const delay = (ms: number) => //mock suspense boundary for table
    //     new Promise(resolve => setTimeout(resolve, ms));
    // await delay(10000);
    const data: Context[] = await getAllContext();
    return (
        <section>
            {}
            <Suspense fallback={<TableSuspenseSkeleton />}>
                <DataTable
                    data={data}
                    columns={contextColumn}
                    searchColumnName="contextDescription"
                />
            </Suspense>
        </section>
    );
}
