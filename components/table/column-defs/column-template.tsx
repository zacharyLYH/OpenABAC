"use client"

import { Checkbox } from "@/components/ui/checkbox";
import { ColumnDef } from "@tanstack/react-table"
import { CopyButton } from "../copy-button";
import { GetPoliciesButton } from "./user-column/show-user-policy-button";
import { User } from "@/lib/interface";

export function selectColumn<T>(): ColumnDef<T>[] {
    return [
        {
            id: "select",
            header: ({ table }) => (
                <Checkbox
                    checked={
                        table.getIsAllPageRowsSelected() ||
                        (table.getIsSomePageRowsSelected() && "indeterminate")
                    }
                    onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
                    aria-label="Select all"
                />
            ),
            cell: ({ row }) => (
                <Checkbox
                    checked={row.getIsSelected()}
                    onCheckedChange={(value) => row.toggleSelected(!!value)}
                    aria-label="Select row"
                />
            ),
            enableSorting: false,
            enableHiding: false,
        },
    ];
}

export function copyColumn<T>(): ColumnDef<T>[] {
    return [
        {
            id: "copy",
            cell: ({ row }) => <CopyButton data={row.original} />,
        },
    ];
}

export function getPolicies<T extends User>(): ColumnDef<T>[] {
    return [
        {
            id: "policies",
            cell: ({ row }) => <GetPoliciesButton applicationUserId={row.original.id} />,
        },
    ];
}

