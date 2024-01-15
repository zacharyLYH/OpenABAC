import { SearchAndSelectInterface } from '@/components/edit-page-components/search';
import { db } from '@/lib/database';
import { Action, Count, Query } from '@/lib/interface';
import {
    GET_ACTION_BY_ID,
    GET_ACTION_COUNT,
    GET_ACTION_VIA_SEARCH,
    GET_ALL_ACTIONS,
} from '@/query/core-queries/actions/actions';

export const getAllActions = async () => {
    if (process.env.IS_PRODUCTION === 'false') {
        return mockData;
    } else {
        const query: Query = {
            sql: GET_ALL_ACTIONS,
        };
        const results = await db.query<Action[]>(query);
        return results;
    }
};

export const getActionCount = async () => {
    if (process.env.IS_PRODUCTION === 'false') {
        return mockData.length;
    } else {
        const query: Query = {
            sql: GET_ACTION_COUNT,
        };
        const results = await db.query<Count[]>(query);
        return results[0].count;
    }
};

export const getActionViaSearch = async () => {
    if (process.env.IS_PRODUCTION === 'false') {
        return mockData.map(item => ({
            id: item.id,
            value: item.actionName,
        }));
    } else {
        const query: Query = {
            sql: GET_ACTION_VIA_SEARCH,
        };
        const results = await db.query<SearchAndSelectInterface[]>(query);
        return results;
    }
};

export const getActionById = async (id: string) => {
    if (process.env.IS_PRODUCTION === 'false') {
        return mockData.filter(mock => mock.id === id);
    } else {
        const query: Query = {
            sql: GET_ACTION_BY_ID,
            params: [id],
        };
        const results = await db.query<Action[]>(query);
        return results;
    }
};

const mockData = [
    {
        id: 'uuid1',
        actionName: 'Login',
        actionDescription: 'User login action',
        modifiedDate: new Date(),
        createdDate: new Date('2023-01-05'),
    },
    {
        id: 'uuid2',
        actionName: 'Logout',
        actionDescription: 'User logout action',
        modifiedDate: new Date(),
        createdDate: new Date('2023-01-05'),
    },
    {
        id: 'uuid3',
        actionName: 'ViewProfile',
        actionDescription: 'View user profile',
        modifiedDate: new Date(),
        createdDate: new Date('2023-01-05'),
    },
];
