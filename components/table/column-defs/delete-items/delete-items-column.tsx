'use client';

import { ColumnDef } from '@tanstack/react-table';
import { DataTableColumnHeader } from '../../column-header';
import { deleteButton, removeFromDeleteList } from '../column-template';
import { SearchAndSelectInterface } from '@/components/edit-page-components/search';

export function deleteItemColumn<T extends SearchAndSelectInterface>(
    removeFromItemsToBeDeleted: (item: SearchAndSelectInterface) => void,
    header: string,
    deleteEndpoint?: string,
    uiStateOnSuccessfulDelete?: (id: string | string[]) => void,
): ColumnDef<T>[] {
    return [
        {
            accessorKey: 'value',
            header: ({ column }) => (
                <DataTableColumnHeader column={column} title={header} />
            ),
        },
        ...deleteButton<T>(deleteEndpoint, uiStateOnSuccessfulDelete),
        ...removeFromDeleteList<T>(removeFromItemsToBeDeleted),
    ];
}
