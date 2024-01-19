'use client';

import { Context } from '@/lib/interface';
import { ColumnDef } from '@tanstack/react-table';
import { DataTableColumnHeader } from '../../column-header';
import { copyColumn } from '../column-template';

export const contextColumn: ColumnDef<Context>[] = [
    {
        accessorKey: 'contextDescription',
        header: ({ column }) => (
            <DataTableColumnHeader
                column={column}
                title="Context Description"
            />
        ),
    },
    {
        accessorKey: 'operator',
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="Operator used" />
        ),
    },
    {
        accessorKey: 'entity',
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="Entity" />
        ),
    },
    {
        accessorKey: 'textValue',
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="Text" />
        ),
    },
    {
        accessorKey: 'timeValue1',
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="Time1" />
        ),
    },
    {
        accessorKey: 'timeValue2',
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="Time2" />
        ),
    },
    ...copyColumn<Context>(),
];
