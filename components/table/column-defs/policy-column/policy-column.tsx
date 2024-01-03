'use client';

import { Policy } from '@/lib/interface';
import { ColumnDef } from '@tanstack/react-table';
import { DataTableColumnHeader } from '../../column-header';
import { copyColumn } from '../column-template';

export const policyColumn: ColumnDef<Policy>[] = [
    {
        accessorKey: 'policyName',
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="Policy Name" />
        ),
    },
    {
        accessorKey: 'policyDescription',
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="PolicyDescription" />
        ),
    },
    {
        accessorKey: 'allow',
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="Allow" />
        ),
    },
    {
        accessorKey: 'modifiedDate',
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="Modified Date" />
        ),
    },
    ...copyColumn<Policy>(),
];
