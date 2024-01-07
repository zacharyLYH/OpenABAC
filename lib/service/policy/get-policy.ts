'use server';

import { db } from '@/lib/database';
import { Count, Policy, Query } from '@/lib/interface';
import {
    GET_ALL_POLICIES,
    GET_POLICY_COUNT,
} from '@/query/core-queries/policies/policies';

export const getAllPolicy = async () => {
    if (process.env.IS_PRODUCTION === 'false') {
        return mockData;
    } else {
        const query: Query = {
            sql: GET_ALL_POLICIES,
        };
        const results = await db.query<Policy[]>(query);
        return results;
    }
};

export const getAllPolicyGivenApplicationUserId = async (
    applicationUserId: string,
) => {
    return mockData;
};

export const getPolicyCount = async () => {
    if (process.env.IS_PRODUCTION === 'false') {
        return mockData.length;
    } else {
        const query: Query = {
            sql: GET_POLICY_COUNT,
        };
        const results = await db.query<Count[]>(query);
        return results[0].count;
    }
};

const mockData = [
    {
        id: '1',
        policyName: 'Policy 1',
        policyDescription: 'Description of Policy 1',
        modifiedDate: new Date('2023-01-01'),
        createdDate: new Date('2023-01-01'),
        allow: true,
    },
    {
        id: '2',
        policyName: 'Policy 2',
        policyDescription: 'Description of Policy 2',
        modifiedDate: new Date('2023-01-02'),
        createdDate: new Date('2023-01-02'),
        allow: false,
    },
    {
        id: '11',
        policyName: 'Policy 11',
        policyDescription: 'Description of Policy 11',
        modifiedDate: new Date('2023-01-11'),
        createdDate: new Date('2023-01-11'),
        allow: true,
    },
    {
        id: '12',
        policyName: 'Policy 12',
        policyDescription: 'Description of Policy 12',
        modifiedDate: new Date('2023-01-12'),
        createdDate: new Date('2023-01-12'),
        allow: false,
    },
    {
        id: '10',
        policyName: 'Policy 10',
        policyDescription: 'Description of Policy 10',
        modifiedDate: new Date('2023-01-10'),
        createdDate: new Date('2023-01-10'),
        allow: true,
    },
    {
        id: '19',
        policyName: 'Policy 19',
        policyDescription: 'Description of Policy 19',
        modifiedDate: new Date('2023-01-19'),
        createdDate: new Date('2023-01-19'),
        allow: true,
    },
    {
        id: '20',
        policyName: 'Policy 20',
        policyDescription: 'Description of Policy 20',
        modifiedDate: new Date('2023-01-20'),
        createdDate: new Date('2023-01-20'),
        allow: false,
    },
];
