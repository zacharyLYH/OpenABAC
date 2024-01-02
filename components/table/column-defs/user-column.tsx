"use client"

import { User } from "@/lib/interface"
import { ColumnDef } from "@tanstack/react-table"
import { DataTableColumnHeader } from "../column-header";
import { copyColumn, selectColumn } from "./column-template";

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
        )
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
    ...copyColumn<User>()
];
