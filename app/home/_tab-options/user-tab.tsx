import { TableSuspenseSkeleton } from '@/components/table-suspense';
import { userColumn } from '@/components/table/column-defs/user-column/user-column';
import { DataTable } from '@/components/table/data-table';
import { User } from '@/lib/interface';
import { getAllUsers } from '@/lib/service/user/get-user';
import { Suspense } from 'react';

interface ViewUserTabProps {
    user: User[];
}

export default async function ViewUserTab({ user }: ViewUserTabProps) {
    // const delay = (ms: number) => //mock suspense boundary for table
    //     new Promise(resolve => setTimeout(resolve, ms));
    // await delay(10000);
    return (
        <section>
            <Suspense fallback={<TableSuspenseSkeleton />}>
                <DataTable
                    data={user}
                    columns={userColumn}
                    searchColumnName="applicationUserId"
                />
            </Suspense>
        </section>
    );
}
