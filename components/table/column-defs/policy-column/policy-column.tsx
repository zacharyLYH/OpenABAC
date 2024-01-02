"use client"

import { Policy, User } from "@/lib/interface"
import { ColumnDef } from "@tanstack/react-table"
import { DataTableColumnHeader } from "../../column-header";
import { copyColumn } from "../column-template";

export const policyColumn: ColumnDef<Policy>[] = [
    {
        accessorKey: "policyName",
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="Policy Name" />
        )
    },
    {
        accessorKey: "policyDescription",
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="PolicyDescription" />
        ),
    },
    {
        accessorKey: "allow",
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="Allow" />
        ),
    },
    {
        accessorKey: "createdDate",
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="Created Date" />
        )
    },
    ...copyColumn<Policy>()
];
