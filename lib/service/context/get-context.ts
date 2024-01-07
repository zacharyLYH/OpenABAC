import { db } from '@/lib/database';
import { Context, Count, Query } from '@/lib/interface';
import {
    GET_ALL_CONTEXT,
    GET_CONTEXT_COUNT,
} from '@/query/core-queries/context/context';

export const getAllContext = async () => {
    if (process.env.IS_PRODUCTION === 'false') {
        return mockData;
    } else {
        const query: Query = {
            sql: GET_ALL_CONTEXT,
        };
        const results = await db.query<Context[]>(query);
        return results;
    }
};

export const getContextCount = async () => {
    if (process.env.IS_PRODUCTION === 'false') {
        return mockData.length;
    } else {
        const query: Query = {
            sql: GET_CONTEXT_COUNT,
        };
        const results = await db.query<Count[]>(query);
        return results[0].count;
    }
};

const mockData = [
    {
        id: 'uuid-1',
        contextDescription: 'Context Desc 1',
        operator: 'equals',
        entity: 'Entity1',
        textValue: 'Text1',
        timeValue1: '2023-01-01T00:00:00.000Z',
        timeValue2: '2023-01-02T00:00:00.000Z',
        modifiedDate: new Date('2023-01-01'),
        createdDate: new Date('2023-01-01'),
    },
    {
        id: 'uuid-2',
        contextDescription: 'Context Desc 2',
        operator: 'less_than',
        entity: 'Entity2',
        textValue: undefined,
        timeValue1: '2023-01-03T00:00:00.000Z',
        timeValue2: '2023-01-04T00:00:00.000Z',
        modifiedDate: new Date('2023-01-01'),
        createdDate: new Date('2023-01-01'),
    },
    {
        id: 'uuid-3',
        contextDescription: 'Context Desc 3',
        operator: 'greater_than',
        entity: 'Entity3',
        textValue: 'Text3',
        timeValue1: undefined,
        timeValue2: undefined,
        modifiedDate: new Date('2023-01-01'),
        createdDate: new Date('2023-01-01'),
    },
    {
        id: 'uuid-4',
        contextDescription: 'Context Desc 4',
        operator: 'not_equal',
        entity: 'Entity4',
        textValue: 'Text4',
        timeValue1: '2023-01-05T00:00:00.000Z',
        timeValue2: '2023-01-06T00:00:00.000Z',
        modifiedDate: new Date('2023-01-01'),
        createdDate: new Date('2023-01-01'),
    },
    {
        id: 'uuid-5',
        contextDescription: 'Context Desc 5',
        operator: 'equals',
        entity: 'Entity5',
        textValue: undefined,
        timeValue1: '2023-01-07T00:00:00.000Z',
        timeValue2: '2023-01-08T00:00:00.000Z',
        modifiedDate: new Date('2023-01-01'),
        createdDate: new Date('2023-01-01'),
    },
];
