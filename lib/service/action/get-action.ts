import { db } from '@/lib/database';
import { Action, Count, Query } from '@/lib/interface';
import {
    GET_ACTION_COUNT,
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
