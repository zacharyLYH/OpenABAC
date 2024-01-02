"use client"

import { Checkbox } from "@/components/ui/checkbox";
import { ColumnDef } from "@tanstack/react-table"
import { CopyButton } from "../copy-button";

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

