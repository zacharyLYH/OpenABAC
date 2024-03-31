'use server';

import { SearchAndSelectInterface } from '@/components/edit-page-components/search';
import { db } from '@/abac/database';
import { Policy, Query, QueryCount } from '@/abac/interface';
import {
    GET_ALL_POLICIES,
    GET_POLICY_BY_ID,
    GET_POLICY_COUNT,
    GET_POLICY_GIVEN_ID,
    GET_POLICY_VIA_SEARCH,
} from '@/abac/core-queries/policies/policies';

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
        const results = await db.query<QueryCount[]>(query);
        return results[0].count;
    }
};

export const getPolicyViaSearch = async () => {
    if (process.env.IS_PRODUCTION === 'false') {
        return mockData.map(item => ({
            id: item.id,
            value: item.policyName,
        }));
    } else {
        const query: Query = {
            sql: GET_POLICY_VIA_SEARCH,
        };
        const results = await db.query<SearchAndSelectInterface[]>(query);
        return results;
    }
};

export const getPolicyById = async (id: string) => {
    if (process.env.IS_PRODUCTION === 'false') {
        return mockData.filter(mock => mock.id === id);
    } else {
        const query: Query = {
            sql: GET_POLICY_BY_ID,
            params: [id],
        };
        const results = await db.query<Policy[]>(query);
        return results;
    }
};

const mockData = [
    {
        id: '0000D1',
        policyName: 'DistinguishedDevPolicy',
        policyDescription:
            'Grants distinguished developers read, write, and delete access to all code bases.',
        allow: true,
        modifiedDate: new Date('2023-01-01'),
        createdDate: new Date('2023-01-01'),
    },
    {
        id: '0000D2',
        policyName: 'FullAccessCodeBase/ProjectAlpha',
        policyDescription:
            'Grants full access to the code base of Project Alpha.',
        allow: true,
        modifiedDate: new Date('2023-01-01'),
        createdDate: new Date('2023-01-01'),
    },
    {
        id: '0000D3',
        policyName: 'RWAcessCodeBase/ProjectAlpha',
        policyDescription:
            'Grants read and write access to the code base of Project Alpha.',
        allow: true,
        modifiedDate: new Date('2023-01-01'),
        createdDate: new Date('2023-01-01'),
    },
    {
        id: '0000D4',
        policyName: 'FullAccessGit/ProjectAlpha',
        policyDescription:
            'Grants full access to the Git repository of Project Alpha.',
        allow: true,
        modifiedDate: new Date('2023-01-01'),
        createdDate: new Date('2023-01-01'),
    },
    {
        id: '0000D5',
        policyName: 'ChangeDevRoster/ProjectAlpha',
        policyDescription:
            'Allows modification of the developer roster for Project Alpha.',
        allow: true,
        modifiedDate: new Date('2023-01-01'),
        createdDate: new Date('2023-01-01'),
    },
    {
        id: '0000D6',
        policyName: 'FullAccessProd/ProjectAlpha',
        policyDescription:
            'Grants full access to the production environment of Project Alpha.',
        allow: true,
        modifiedDate: new Date('2023-01-01'),
        createdDate: new Date('2023-01-01'),
    },
    {
        id: '0000D7',
        policyName: 'FullAccessTest/ProjectAlpha',
        policyDescription:
            'Grants full access to the test environment of Project Alpha.',
        allow: true,
        modifiedDate: new Date('2023-01-01'),
        createdDate: new Date('2023-01-01'),
    },
    {
        id: '0000D8',
        policyName: 'GitAccessOnlyProd/ProjectAlpha',
        policyDescription:
            'Grants Git repository access in the production environment of Project Alpha.',
        allow: true,
        modifiedDate: new Date('2023-01-01'),
        createdDate: new Date('2023-01-01'),
    },
    {
        id: '0000D9',
        policyName: 'NoAccessToProd/ProjectAlpha',
        policyDescription:
            'Explicit denial for access to anything related to Production in Project Alpha.',
        allow: false,
        modifiedDate: new Date('2023-01-01'),
        createdDate: new Date('2023-01-01'),
    },
    {
        id: '0000DA',
        policyName: 'FullAccessMQ/ProjectAlpha',
        policyDescription:
            'Grants full access to the message queue system of Project Alpha.',
        allow: true,
        modifiedDate: new Date('2023-01-01'),
        createdDate: new Date('2023-01-01'),
    },
    {
        id: '0000DB',
        policyName: 'GitAccessOnlyDev/ProjectAlpha',
        policyDescription:
            'Grants Git repository access in the development environment of Project Alpha.',
        allow: true,
        modifiedDate: new Date('2023-01-01'),
        createdDate: new Date('2023-01-01'),
    },
    {
        id: '0000DC',
        policyName: 'FullAccessDev/ProjectAlpha',
        policyDescription:
            'Grants full access to the development environment of Project Alpha.',
        allow: true,
        modifiedDate: new Date('2023-01-01'),
        createdDate: new Date('2023-01-01'),
    },
    {
        id: '0000DD',
        policyName: 'ViewOnlyMQ/ProjectAlpha',
        policyDescription:
            'Grants view-only access to the message queue system of Project Alpha.',
        allow: true,
        modifiedDate: new Date('2023-01-01'),
        createdDate: new Date('2023-01-01'),
    },
    {
        id: '0000DE',
        policyName: 'FullAccessDB/ProjectAlpha',
        policyDescription:
            'Grants full access to the database systems of Project Alpha.',
        allow: true,
        modifiedDate: new Date('2023-01-01'),
        createdDate: new Date('2023-01-01'),
    },

    {
        id: '987492',
        policyName: 'FullAccessCodeBase/ProjectBeta',
        policyDescription:
            'Grants full access to the code base of Project Beta.',
        allow: true,
        modifiedDate: new Date('2023-01-01'),
        createdDate: new Date('2023-01-01'),
    },
    {
        id: '987493',
        policyName: 'RWAcessCodeBase/ProjectBeta',
        policyDescription:
            'Grants read and write access to the code base of Project Beta.',
        allow: true,
        modifiedDate: new Date('2023-01-01'),
        createdDate: new Date('2023-01-01'),
    },
    {
        id: '987494',
        policyName: 'FullAccessGit/ProjectBeta',
        policyDescription:
            'Grants full access to the Git repository of Project Beta.',
        allow: true,
        modifiedDate: new Date('2023-01-01'),
        createdDate: new Date('2023-01-01'),
    },
    {
        id: '987495',
        policyName: 'ChangeDevRoster/ProjectBeta',
        policyDescription:
            'Allows modification of the developer roster for Project Beta.',
        allow: true,
        modifiedDate: new Date('2023-01-01'),
        createdDate: new Date('2023-01-01'),
    },
    {
        id: '987496',
        policyName: 'FullAccessProd/ProjectBeta',
        policyDescription:
            'Grants full access to the production environment of Project Beta.',
        allow: true,
        modifiedDate: new Date('2023-01-01'),
        createdDate: new Date('2023-01-01'),
    },
    {
        id: '987497',
        policyName: 'FullAccessTest/ProjectBeta',
        policyDescription:
            'Grants full access to the test environment of Project Beta.',
        allow: true,
        modifiedDate: new Date('2023-01-01'),
        createdDate: new Date('2023-01-01'),
    },
    {
        id: '987498',
        policyName: 'GitAccessOnlyProd/ProjectBeta',
        policyDescription:
            'Grants Git repository access in the production environment of Project Beta.',
        allow: true,
        modifiedDate: new Date('2023-01-01'),
        createdDate: new Date('2023-01-01'),
    },
    {
        id: '987499',
        policyName: 'NoAccessToProd/ProjectBeta',
        policyDescription:
            'Explicit denial for access to anything related to Production in Project Beta.',
        allow: false,
        modifiedDate: new Date('2023-01-01'),
        createdDate: new Date('2023-01-01'),
    },
    {
        id: '98749A',
        policyName: 'FullAccessMQ/ProjectBeta',
        policyDescription:
            'Grants full access to the message queue system of Project Beta.',
        allow: true,
        modifiedDate: new Date('2023-01-01'),
        createdDate: new Date('2023-01-01'),
    },
    {
        id: '98749B',
        policyName: 'GitAccessOnlyDev/ProjectBeta',
        policyDescription:
            'Grants Git repository access in the development environment of Project Beta.',
        allow: true,
        modifiedDate: new Date('2023-01-01'),
        createdDate: new Date('2023-01-01'),
    },
    {
        id: '98749C',
        policyName: 'FullAccessDev/ProjectBeta',
        policyDescription:
            'Grants full access to the development environment of Project Beta.',
        allow: true,
        modifiedDate: new Date('2023-01-01'),
        createdDate: new Date('2023-01-01'),
    },
    {
        id: '98749D',
        policyName: 'ViewOnlyMQ/ProjectBeta',
        policyDescription:
            'Grants view-only access to the message queue system of Project Beta.',
        allow: true,
        modifiedDate: new Date('2023-01-01'),
        createdDate: new Date('2023-01-01'),
    },
    {
        id: '98749E',
        policyName: 'FullAccessDB/ProjectBeta',
        policyDescription:
            'Grants full access to the database systems of Project Beta.',
        allow: true,
        modifiedDate: new Date('2023-01-01'),
        createdDate: new Date('2023-01-01'),
    },

    {
        id: 'GT5772',
        policyName: 'FullAccessCodeBase/ProjectDelta',
        policyDescription:
            'Grants full access to the code base of Project Delta.',
        allow: true,
        modifiedDate: new Date('2023-01-01'),
        createdDate: new Date('2023-01-01'),
    },
    {
        id: 'GT5773',
        policyName: 'RWAcessCodeBase/ProjectDelta',
        policyDescription:
            'Grants read and write access to the code base of Project Delta.',
        allow: true,
        modifiedDate: new Date('2023-01-01'),
        createdDate: new Date('2023-01-01'),
    },
    {
        id: 'GT5774',
        policyName: 'FullAccessGit/ProjectDelta',
        policyDescription:
            'Grants full access to the Git repository of Project Delta.',
        allow: true,
        modifiedDate: new Date('2023-01-01'),
        createdDate: new Date('2023-01-01'),
    },
    {
        id: 'GT5775',
        policyName: 'ChangeDevRoster/ProjectDelta',
        policyDescription:
            'Allows modification of the developer roster for Project Delta.',
        allow: true,
        modifiedDate: new Date('2023-01-01'),
        createdDate: new Date('2023-01-01'),
    },
    {
        id: 'GT5776',
        policyName: 'FullAccessProd/ProjectDelta',
        policyDescription:
            'Grants full access to the production environment of Project Delta.',
        allow: true,
        modifiedDate: new Date('2023-01-01'),
        createdDate: new Date('2023-01-01'),
    },
    {
        id: 'GT5777',
        policyName: 'FullAccessTest/ProjectDelta',
        policyDescription:
            'Grants full access to the test environment of Project Delta.',
        allow: true,
        modifiedDate: new Date('2023-01-01'),
        createdDate: new Date('2023-01-01'),
    },
    {
        id: 'GT5778',
        policyName: 'GitAccessOnlyProd/ProjectDelta',
        policyDescription:
            'Grants Git repository access in the production environment of Project Delta.',
        allow: true,
        modifiedDate: new Date('2023-01-01'),
        createdDate: new Date('2023-01-01'),
    },
    {
        id: 'GT5779',
        policyName: 'NoAccessToProd/ProjectDelta',
        policyDescription:
            'Explicit denial for access to anything related to Production in Project Delta.',
        allow: false,
        modifiedDate: new Date('2023-01-01'),
        createdDate: new Date('2023-01-01'),
    },
    {
        id: 'GT577A',
        policyName: 'FullAccessMQ/ProjectDelta',
        policyDescription:
            'Grants full access to the message queue system of Project Delta.',
        allow: true,
        modifiedDate: new Date('2023-01-01'),
        createdDate: new Date('2023-01-01'),
    },
    {
        id: 'GT577B',
        policyName: 'GitAccessOnlyDev/ProjectDelta',
        policyDescription:
            'Grants Git repository access in the development environment of Project Delta.',
        allow: true,
        modifiedDate: new Date('2023-01-01'),
        createdDate: new Date('2023-01-01'),
    },
    {
        id: 'GT577C',
        policyName: 'FullAccessDev/ProjectDelta',
        policyDescription:
            'Grants full access to the development environment of Project Delta.',
        allow: true,
        modifiedDate: new Date('2023-01-01'),
        createdDate: new Date('2023-01-01'),
    },
    {
        id: 'GT577D',
        policyName: 'ViewOnlyMQ/ProjectDelta',
        policyDescription:
            'Grants view-only access to the message queue system of Project Delta.',
        allow: true,
        modifiedDate: new Date('2023-01-01'),
        createdDate: new Date('2023-01-01'),
    },
    {
        id: 'GT577E',
        policyName: 'FullAccessDB/ProjectDelta',
        policyDescription:
            'Grants full access to the database systems of Project Delta.',
        allow: true,
        modifiedDate: new Date('2023-01-01'),
        createdDate: new Date('2023-01-01'),
    },

    {
        id: '9JKK82',
        policyName: 'FullAccessCodeBase/ProjectDelta',
        policyDescription:
            'Grants full access to the code base of Project Delta.',
        allow: true,
        modifiedDate: new Date('2023-01-01'),
        createdDate: new Date('2023-01-01'),
    },
    {
        id: '9JKK83',
        policyName: 'RWAcessCodeBase/ProjectDelta',
        policyDescription:
            'Grants read and write access to the code base of Project Delta.',
        allow: true,
        modifiedDate: new Date('2023-01-01'),
        createdDate: new Date('2023-01-01'),
    },
    {
        id: '9JKK84',
        policyName: 'FullAccessGit/ProjectDelta',
        policyDescription:
            'Grants full access to the Git repository of Project Delta.',
        allow: true,
        modifiedDate: new Date('2023-01-01'),
        createdDate: new Date('2023-01-01'),
    },
    {
        id: '9JKK85',
        policyName: 'ChangeDevRoster/ProjectDelta',
        policyDescription:
            'Allows modification of the developer roster for Project Delta.',
        allow: true,
        modifiedDate: new Date('2023-01-01'),
        createdDate: new Date('2023-01-01'),
    },
    {
        id: '9JKK86',
        policyName: 'FullAccessProd/ProjectDelta',
        policyDescription:
            'Grants full access to the production environment of Project Delta.',
        allow: true,
        modifiedDate: new Date('2023-01-01'),
        createdDate: new Date('2023-01-01'),
    },
    {
        id: '9JKK87',
        policyName: 'FullAccessTest/ProjectDelta',
        policyDescription:
            'Grants full access to the test environment of Project Delta.',
        allow: true,
        modifiedDate: new Date('2023-01-01'),
        createdDate: new Date('2023-01-01'),
    },
    {
        id: '9JKK88',
        policyName: 'GitAccessOnlyProd/ProjectDelta',
        policyDescription:
            'Grants Git repository access in the production environment of Project Delta.',
        allow: true,
        modifiedDate: new Date('2023-01-01'),
        createdDate: new Date('2023-01-01'),
    },
    {
        id: '9JKK89',
        policyName: 'NoAccessToProd/ProjectDelta',
        policyDescription:
            'Explicit denial for access to anything related to Production in Project Delta.',
        allow: false,
        modifiedDate: new Date('2023-01-01'),
        createdDate: new Date('2023-01-01'),
    },
    {
        id: '9JKK8A',
        policyName: 'FullAccessMQ/ProjectDelta',
        policyDescription:
            'Grants full access to the message queue system of Project Delta.',
        allow: true,
        modifiedDate: new Date('2023-01-01'),
        createdDate: new Date('2023-01-01'),
    },
    {
        id: '9JKK8B',
        policyName: 'GitAccessOnlyDev/ProjectDelta',
        policyDescription:
            'Grants Git repository access in the development environment of Project Delta.',
        allow: true,
        modifiedDate: new Date('2023-01-01'),
        createdDate: new Date('2023-01-01'),
    },
    {
        id: '9JKK8C',
        policyName: 'FullAccessDev/ProjectDelta',
        policyDescription:
            'Grants full access to the development environment of Project Delta.',
        allow: true,
        modifiedDate: new Date('2023-01-01'),
        createdDate: new Date('2023-01-01'),
    },
    {
        id: '9JKK8D',
        policyName: 'ViewOnlyMQ/ProjectDelta',
        policyDescription:
            'Grants view-only access to the message queue system of Project Delta.',
        allow: true,
        modifiedDate: new Date('2023-01-01'),
        createdDate: new Date('2023-01-01'),
    },
    {
        id: '9JKK8E',
        policyName: 'FullAccessDB/ProjectDelta',
        policyDescription:
            'Grants full access to the database systems of Project Delta.',
        allow: true,
        modifiedDate: new Date('2023-01-01'),
        createdDate: new Date('2023-01-01'),
    },
];
