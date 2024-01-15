'use client';

import { ColumnDef } from '@tanstack/react-table';
import { DataTableColumnHeader } from '../../column-header';
import { removeFromDeleteList } from '../column-template';
import { SearchAndSelectInterface } from '@/components/edit-page-components/search';

export function attachColumn<T extends SearchAndSelectInterface>(
    removeFromItemsToBeDeleted: (item: SearchAndSelectInterface) => void,
): ColumnDef<T>[] {
    return [
        {
            accessorKey: 'value',
            header: ({ column }) => (
                <DataTableColumnHeader column={column} title="To Attach" />
            ),
        },
        ...removeFromDeleteList<T>(removeFromItemsToBeDeleted),
    ];
}
