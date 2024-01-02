import { userColumn } from "@/components/table/column-defs/user-column/user-column";
import { DataTable } from "@/components/table/data-table";
import { User } from "@/lib/interface";
import { getUser } from "@/lib/service/user/get-user";

export default async function ViewUserTab() {
    const data: User[] = await getUser()
    return (
        <>
            <div>
                1. Show users paginated
                2. A dropdown filter
                3. An option
            </div>
            <DataTable data={data} columns={userColumn} searchColumnName="applicationUserId" />
        </>
    )
}