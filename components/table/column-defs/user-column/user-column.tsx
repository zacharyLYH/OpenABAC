'use client';

import { User } from '@/lib/interface';
import { ColumnDef } from '@tanstack/react-table';
import { DataTableColumnHeader } from '../../column-header';
import { copyColumn, getPolicies, selectColumn } from '../column-template';

const renderJsonCell = (cell: any) => {
    const jsonStr = JSON.stringify(cell.getValue(), null, 2);
    const lines = jsonStr.split('\n');
    const maxLines = 5;

    const displayedText =
        lines.length > maxLines
            ? lines.slice(0, maxLines - 1).join('\n') + '\n...'
            : jsonStr;

    return <pre>{displayedText}</pre>;
};

export const userColumn: ColumnDef<User>[] = [
    ...selectColumn<User>(),
    {
        accessorKey: 'applicationUserId',
        header: ({ column }) => (
            <DataTableColumnHeader
                column={column}
                title="Application User Id"
            />
        ),
    },
    {
        accessorKey: 'jsonCol',
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="JSON Column" />
        ),
        cell: renderJsonCell,
    },
    {
        accessorKey: 'modifiedDate',
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="Modified Date" />
        ),
    },
    ...getPolicies<User>(),
    ...copyColumn<User>(),
];
