'use client';

import { ColumnDef } from '@tanstack/react-table';
import { DataTableColumnHeader } from '../../column-header';
import { deleteButton, removeFromDeleteList } from '../column-template';
import { SearchAndSelectInterface } from '@/components/edit-page-components/search';

export function deleteItemColumn<T extends SearchAndSelectInterface>(
    deleteEndpoint: string,
    removeFromItemsToBeDeleted: (item: SearchAndSelectInterface) => void,
    uiStateOnSuccessfulDelete: (id: string | string[]) => void,
): ColumnDef<T>[] {
    return [
        {
            accessorKey: 'value',
            header: ({ column }) => (
                <DataTableColumnHeader column={column} title="To Delete" />
            ),
        },
        ...deleteButton<T>(deleteEndpoint, uiStateOnSuccessfulDelete),
        ...removeFromDeleteList<T>(removeFromItemsToBeDeleted),
    ];
}
