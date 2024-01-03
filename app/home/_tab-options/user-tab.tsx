import { TableSuspenseSkeleton } from '@/components/table-suspense';
import { userColumn } from '@/components/table/column-defs/user-column/user-column';
import { DataTable } from '@/components/table/data-table';
import { User } from '@/lib/interface';
import { getAllUsers } from '@/lib/service/user/get-user';
import { Suspense } from 'react';

export default async function ViewUserTab() {
    // const delay = (ms: number) => //mock suspense boundary for table
    //     new Promise(resolve => setTimeout(resolve, ms));
    // await delay(10000);
    const data: User[] = await getAllUsers();
    return (
        <section>
            {}
            <Suspense fallback={<TableSuspenseSkeleton />}>
                <DataTable
                    data={data}
                    columns={userColumn}
                    searchColumnName="applicationUserId"
                />
            </Suspense>
        </section>
    );
}
