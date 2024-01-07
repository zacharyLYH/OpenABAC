import { TableSuspenseSkeleton } from '@/components/table-suspense';
import { policyColumn } from '@/components/table/column-defs/policy-column/policy-column';
import { DataTable } from '@/components/table/data-table';
import { Policy } from '@/lib/interface';
import { getAllPolicy } from '@/lib/service/policy/get-policy';
import { Suspense } from 'react';

interface PolicyTabProps {
    policy: Policy[];
}

export default async function ViewPolicyTab({ policy }: PolicyTabProps) {
    // const delay = (ms: number) => //mock suspense boundary for table
    //     new Promise(resolve => setTimeout(resolve, ms));
    // await delay(10000);
    return (
        <section>
            <Suspense fallback={<TableSuspenseSkeleton />}>
                <DataTable
                    data={policy}
                    columns={policyColumn}
                    searchColumnName="policyName"
                />
            </Suspense>
        </section>
    );
}
