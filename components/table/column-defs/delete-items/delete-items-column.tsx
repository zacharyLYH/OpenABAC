'use client';

import { ColumnDef } from '@tanstack/react-table';
import { DataTableColumnHeader } from '../../column-header';
import { deleteButton, removeFromDeleteList, selectColumn } from '../column-template';
import { SearchAndSelectInterface } from '@/components/edit-page-components/search';

export function deleteItemColumn<T extends SearchAndSelectInterface>(deleteEndpoint: string, removeFromItemsToBeDeleted: (item: SearchAndSelectInterface) => void): ColumnDef<T>[] {
    return [
        ...selectColumn<T>(),
        {
            accessorKey: 'value',
            header: ({ column }) => (
                <DataTableColumnHeader column={column} title="To Delete" />
            ),
        },
        ...deleteButton<T>(deleteEndpoint),
        ...removeFromDeleteList<T>(removeFromItemsToBeDeleted)
    ];
}