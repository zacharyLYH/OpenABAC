"use client"

import { User } from "@/lib/interface"
import { ColumnDef } from "@tanstack/react-table"
import { DataTableColumnHeader } from "../../column-header";
import { copyColumn, getPolicies, selectColumn } from "../column-template";

const renderJsonCell = (cell: any) => {
    return <pre>{JSON.stringify(cell.getValue(), null, 2)}</pre>;
};


export const userColumn: ColumnDef<User>[] = [
    ...selectColumn<User>(),
    {
        accessorKey: "applicationUserId",
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="Application User Id" />
        )
    },
    {
        accessorKey: "jsonCol",
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="JSON Column" />
        ),
        cell: renderJsonCell
    },
    {
        accessorKey: "modifiedDate",
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="Modified Date" />
        )
    },
    {
        accessorKey: "createdDate",
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="Created Date" />
        )
    },
    ...getPolicies<User>(),
    ...copyColumn<User>()
];
