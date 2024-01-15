'use client';

import { Checkbox } from '@/components/ui/checkbox';
import { ColumnDef } from '@tanstack/react-table';
import { CopyButton } from '../copy-button';
import { GetPoliciesButton } from './user-column/show-user-policy-button';
import { User } from '@/lib/interface';
import { SearchAndSelectInterface } from '@/components/edit-page-components/search';
import { DeleteRowButton } from '../delete-row-button';
import { RemoveRowFromTableButton } from '../remove-row-from-table';

export function selectColumn<T>(): ColumnDef<T>[] {
    return [
        {
            id: 'select',
            header: ({ table }) => (
                <Checkbox
                    checked={
                        table.getIsAllPageRowsSelected() ||
                        (table.getIsSomePageRowsSelected() && 'indeterminate')
                    }
                    onCheckedChange={value =>
                        table.toggleAllPageRowsSelected(!!value)
                    }
                    aria-label="Select all"
                />
            ),
            cell: ({ row }) => (
                <Checkbox
                    checked={row.getIsSelected()}
                    onCheckedChange={value => row.toggleSelected(!!value)}
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
            id: 'copy',
            cell: ({ row }) => <CopyButton data={row.original} />,
        },
    ];
}

export function getPolicies<T extends User>(): ColumnDef<T>[] {
    return [
        {
            id: 'policies',
            cell: ({ row }) => (
                <GetPoliciesButton applicationUserId={row.original.id} />
            ),
        },
    ];
}

export function deleteButton<T extends SearchAndSelectInterface>(
    deleteEndpoint: string,
    uiStateOnSuccessfulDelete: (id: string | string[]) => void,
): ColumnDef<T>[] {
    return [
        {
            id: 'delete',
            cell: ({ row }) => (
                <DeleteRowButton
                    uiStateOnSuccessfulDelete={uiStateOnSuccessfulDelete}
                    itemId={row.original.id}
                    deleteEndpoint={deleteEndpoint}
                />
            ),
        },
    ];
}

export function removeFromDeleteList<T extends SearchAndSelectInterface>(
    removeFromItemsToBeDeleted: (item: SearchAndSelectInterface) => void,
): ColumnDef<T>[] {
    return [
        {
            id: 'remove',
            cell: ({ row }) => (
                <RemoveRowFromTableButton
                    item={row.original}
                    removeFunction={removeFromItemsToBeDeleted}
                />
            ),
        },
    ];
}
