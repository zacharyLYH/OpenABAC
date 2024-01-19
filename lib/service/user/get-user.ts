import { SearchAndSelectInterface } from '@/components/edit-page-components/search';
import { db } from '@/lib/database';
import { Count, Query, User } from '@/lib/interface';
import {
    GET_ALL_USERS,
    GET_NUMBER_OF_USERS,
    GET_USER_BY_ID,
    GET_USER_VIA_SEARCH,
} from '@/query/core-queries/user/user';

export const getAllUsers = async () => {
    if (process.env.IS_PRODUCTION === 'false') {
        return mockData;
    } else {
        let results: User[] = [];
        const query: Query = {
            sql: GET_ALL_USERS,
        };
        results = await db.query<User[]>(query);
        return results;
    }
};

export const getUserCount = async () => {
    if (process.env.IS_PRODUCTION === 'false') {
        return mockData.length;
    } else {
        const query: Query = {
            sql: GET_NUMBER_OF_USERS,
        };
        const results = await db.query<Count[]>(query);
        return results[0].count;
    }
};

export const getUserViaSearch = async () => {
    if (process.env.IS_PRODUCTION === 'false') {
        return mockData.map(item => ({
            id: item.id,
            value: item.applicationUserId,
        }));
    } else {
        const query: Query = {
            sql: GET_USER_VIA_SEARCH,
        };
        const results = await db.query<SearchAndSelectInterface[]>(query);
        return results;
    }
};

export const getUserById = async (id: string) => {
    if (process.env.IS_PRODUCTION === 'false') {
        return mockData.filter(mock => mock.id === id);
    } else {
        const query: Query = {
            sql: GET_USER_BY_ID,
            params: [id],
        };
        const results = await db.query<User[]>(query);
        return results;
    }
};

const mockData = [
    {
        jsonCol: {
            name: 'John Doe',
            age: 30,
            occupation: 'Engineer',
        },
        applicationUserId: '012345',
        id: '001',
        modifiedDate: new Date(), // Current date and time
        createdDate: new Date('2023-01-01'), // Specific date
    },
    {
        jsonCol: {
            name: 'Jane Smith',
            age: 25,
            occupation: 'Designer',
        },
        applicationUserId: '012346',
        id: '002',
        modifiedDate: new Date(), // Current date and time
        createdDate: new Date('2023-01-02'), // Specific date
    },
    {
        jsonCol: {
            name: 'Bob Brown',
            age: 32,
            occupation: 'Teacher',
        },
        applicationUserId: '012348',
        id: '004',
        modifiedDate: new Date(),
        createdDate: new Date('2023-01-04'),
    },
    {
        jsonCol: {
            name: 'Carol White',
            age: 29,
            occupation: 'Doctor',
        },
        applicationUserId: '0123497',
        id: '005',
        modifiedDate: new Date(),
        createdDate: new Date('2023-01-05'),
    },
    {
        jsonCol: {
            name: 'Mike Wazowski',
            age: 29,
            occupation: 'Doctor',
            gender: 'Not applicable',
        },
        applicationUserId: '012349',
        id: '006',
        modifiedDate: new Date(),
        createdDate: new Date('2023-01-05'),
    },
];
