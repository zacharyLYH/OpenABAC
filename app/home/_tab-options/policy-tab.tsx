import { TableSuspenseSkeleton } from '@/components/table-suspense';
import { policyColumn } from '@/components/table/column-defs/policy-column/policy-column';
import { DataTable } from '@/components/table/data-table';
import { Policy } from '@/lib/interface';
import { getAllPolicy } from '@/lib/service/policy/get-policy';
import { Suspense } from 'react';

export default async function ViewPolicyTab() {
    // const delay = (ms: number) => //mock suspense boundary for table
    //     new Promise(resolve => setTimeout(resolve, ms));
    // await delay(10000);
    const data: Policy[] = await getAllPolicy();

    return (
        <section>
            <Suspense fallback={<TableSuspenseSkeleton />}>
                <DataTable
                    data={data}
                    columns={policyColumn}
                    searchColumnName="policyName"
                />
            </Suspense>
        </section>
    );
}
