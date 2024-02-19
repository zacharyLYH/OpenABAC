'use client';

import { Action } from '@/abac/interface';
import { ColumnDef } from '@tanstack/react-table';
import { DataTableColumnHeader } from '../../column-header';
import { copyColumn } from '../column-template';

export const actionColumn: ColumnDef<Action>[] = [
    {
        accessorKey: 'actionName',
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="Action Name" />
        ),
    },
    {
        accessorKey: 'actionDescription',
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="Action Description" />
        ),
    },
    {
        accessorKey: 'modifiedDate',
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="Modified Date" />
        ),
    },
    ...copyColumn<Action>(),
];
