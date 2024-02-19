import { SearchAndSelectInterface } from '@/components/edit-page-components/search';
import { db } from '@/abac/database';
import { Context, Count, Query } from '@/abac/interface';
import {
    GET_ALL_CONTEXT,
    GET_CONTEXT_COUNT,
    GET_CONTEXT_GIVEN_ID,
    GET_CONTEXT_VIA_SEARCH,
} from '@/abac/core-queries/context/context';

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

export const getContextById = async (id: string) => {
    if (process.env.IS_PRODUCTION === 'false') {
        return mockData.filter(mock => mock.id === id);
    } else {
        const query: Query = {
            sql: GET_CONTEXT_GIVEN_ID,
            params: [id],
        };
        const results = await db.query<Context[]>(query);
        return results;
    }
};

export const getContextViaSearch = async () => {
    if (process.env.IS_PRODUCTION === 'false') {
        return mockData.map(item => ({
            id: item.id,
            value: item.contextDescription,
        }));
    } else {
        const query: Query = {
            sql: GET_CONTEXT_VIA_SEARCH,
        };
        const results = await db.query<SearchAndSelectInterface[]>(query);
        return results;
    }
};

const mockData = [
    {
        id: '0000001',
        contextDescription: 'Access to server room during business hours',
        operator: 'BETWEEN',
        entity: 'ServerRoomAccess',
        timeValue1: '09:00:00',
        timeValue2: '17:00:00',
        modifiedDate: new Date('2023-01-01'),
        createdDate: new Date('2023-01-01'),
    },
    {
        id: '0000002',
        contextDescription:
            'No access to development servers during maintenance',
        operator: 'NOT BETWEEN',
        entity: 'DevServerMaintenance',
        timeValue1: '02:00:00',
        timeValue2: '04:00:00',
        modifiedDate: new Date('2023-01-01'),
        createdDate: new Date('2023-01-01'),
    },
    {
        id: '0000003',
        contextDescription: 'Access to project resources from main office',
        operator: 'IN',
        entity: 'ProjectLocationAccess',
        textValue: 'MainOffice',
        modifiedDate: new Date('2023-01-01'),
        createdDate: new Date('2023-01-01'),
    },
    {
        id: '0000004',
        contextDescription: 'Project access restricted to specific regions',
        operator: 'IN',
        entity: 'ProjectRegionalAccess',
        textValue: 'US,EU,JP',
        modifiedDate: new Date('2023-01-01'),
        createdDate: new Date('2023-01-01'),
    },
    {
        id: '0000005',
        contextDescription: 'Only administrators can access user data',
        operator: '==',
        entity: 'UserDataAccess',
        textValue: 'Administrator',
        modifiedDate: new Date('2023-01-01'),
        createdDate: new Date('2023-01-01'),
    },
    {
        id: '0000006',
        contextDescription: 'Interns cannot access financial records',
        operator: '!=',
        entity: 'FinancialRecordAccess',
        textValue: 'Intern',
        modifiedDate: new Date('2023-01-01'),
        createdDate: new Date('2023-01-01'),
    },
    {
        id: '0000007',
        contextDescription: 'Read access to confidential project documents',
        operator: '==',
        entity: 'ProjectDocType',
        textValue: 'Confidential',
        modifiedDate: new Date('2023-01-01'),
        createdDate: new Date('2023-01-01'),
    },
    {
        id: '0000008',
        contextDescription: 'Edit access to public documentation',
        operator: '==',
        entity: 'PublicDocEdit',
        textValue: 'Public',
        modifiedDate: new Date('2023-01-01'),
        createdDate: new Date('2023-01-01'),
    },
    {
        id: '0000009',
        contextDescription: 'Access to highly sensitive database',
        operator: '==',
        entity: 'DatabaseSensitivity',
        textValue: 'High',
        modifiedDate: new Date('2023-01-01'),
        createdDate: new Date('2023-01-01'),
    },
    {
        id: '0000010',
        contextDescription: 'Access to less sensitive database',
        operator: '==',
        entity: 'DatabaseSensitivity',
        textValue: 'Low',
        modifiedDate: new Date('2023-01-01'),
        createdDate: new Date('2023-01-01'),
    },
    {
        id: '000011',
        contextDescription: 'Expense approval limit for regular employees',
        operator: '<=',
        entity: 'ExpenseLimit',
        timeValue1: '1000',
        modifiedDate: new Date('2023-01-01'),
        createdDate: new Date('2023-01-01'),
    },
    {
        id: '000012',
        contextDescription: 'Expense approval limit for managers',
        operator: '<=',
        entity: 'ExpenseLimit',
        timeValue1: '5000',
        modifiedDate: new Date('2023-01-01'),
        createdDate: new Date('2023-01-01'),
    },
    {
        id: '000013',
        contextDescription: 'System access for active employee accounts',
        operator: '==',
        entity: 'EmployeeAccountStatus',
        textValue: 'Active',
        modifiedDate: new Date('2023-01-01'),
        createdDate: new Date('2023-01-01'),
    },
    {
        id: '000014',
        contextDescription: 'No system access for suspended employee accounts',
        operator: '==',
        entity: 'EmployeeAccountStatus',
        textValue: 'Suspended',
        modifiedDate: new Date('2023-01-01'),
        createdDate: new Date('2023-01-01'),
    },
    {
        id: '000015',
        contextDescription: 'Application access from company-issued devices',
        operator: 'IN',
        entity: 'DeviceTypeAccess',
        textValue: 'Laptop,Desktop',
        modifiedDate: new Date('2023-01-01'),
        createdDate: new Date('2023-01-01'),
    },
    {
        id: '000016',
        contextDescription:
            'Restrict application access from personal mobile devices',
        operator: 'NOT IN',
        entity: 'DeviceTypeAccess',
        textValue: 'Smartphone,Tablet',
        modifiedDate: new Date('2023-01-01'),
        createdDate: new Date('2023-01-01'),
    },
    {
        id: '000017',
        contextDescription: 'Feature available in app version 5.0 and above',
        operator: '>=',
        entity: 'FeatureAppVersion',
        timeValue1: '5.0',
        modifiedDate: new Date('2023-01-01'),
        createdDate: new Date('2023-01-01'),
    },
    {
        id: '000018',
        contextDescription: 'Feature not available in app versions below 5.0',
        operator: '<',
        entity: 'FeatureAppVersion',
        timeValue1: '5.0',
        modifiedDate: new Date('2023-01-01'),
        createdDate: new Date('2023-01-01'),
    },
    {
        id: '000019',
        contextDescription:
            'Project access for users active within the last month',
        operator: '>',
        entity: 'UserLastActivity',
        timeValue1: '2023-01-01 00:00:00',
        modifiedDate: new Date('2023-01-01'),
        createdDate: new Date('2023-01-01'),
    },
    {
        id: '000020',
        contextDescription:
            'No project access for users inactive for over 6 months',
        operator: '<',
        entity: 'UserLastActivity',
        timeValue1: '2022-07-01 00:00:00',
        modifiedDate: new Date('2023-01-01'),
        createdDate: new Date('2023-01-01'),
    },
    {
        id: '000021',
        contextDescription: 'Tool access for engineering and product teams',
        operator: 'IN',
        entity: 'UserGroupToolAccess',
        textValue: 'Engineering,Product',
        modifiedDate: new Date('2023-01-01'),
        createdDate: new Date('2023-01-01'),
    },
    {
        id: '000022',
        contextDescription: 'No tool access for external consultant groups',
        operator: 'NOT IN',
        entity: 'UserGroupToolAccess',
        textValue: 'Consultants',
        modifiedDate: new Date('2023-01-01'),
        createdDate: new Date('2023-01-01'),
    },
    {
        id: '000023',
        contextDescription: 'Access to resources for Project Alpha',
        operator: '==',
        entity: 'ProjectResourceAccess',
        textValue: 'Alpha',
        modifiedDate: new Date('2023-01-01'),
        createdDate: new Date('2023-01-01'),
    },
    {
        id: '000024',
        contextDescription: 'No access to resources for Project Beta',
        operator: '!=',
        entity: 'ProjectResourceAccess',
        textValue: 'Beta',
        modifiedDate: new Date('2023-01-01'),
        createdDate: new Date('2023-01-01'),
    },
    {
        id: '000025',
        contextDescription: 'Full tool access for permanent employees',
        operator: '==',
        entity: 'EmployeeContractType',
        textValue: 'Permanent',
        modifiedDate: new Date('2023-01-01'),
        createdDate: new Date('2023-01-01'),
    },
    {
        id: '000026',
        contextDescription: 'Restriction for non-enterprise contract users',
        operator: '!=',
        entity: 'ContractType',
        textValue: 'Enterprise',
        modifiedDate: new Date('2023-01-01'),
        createdDate: new Date('2023-01-01'),
    },
    {
        id: '000027',
        contextDescription: 'Access for high-security clearance',
        operator: '>=',
        entity: 'SecurityClearance',
        timeValue1: 'Level3',
        modifiedDate: new Date('2023-01-01'),
        createdDate: new Date('2023-01-01'),
    },
    {
        id: '000028',
        contextDescription: 'Restriction for low-security clearance',
        operator: '<',
        entity: 'SecurityClearance',
        timeValue1: 'Level3',
        modifiedDate: new Date('2023-01-01'),
        createdDate: new Date('2023-01-01'),
    },
    {
        id: '000029',
        contextDescription: 'Access for cloud infrastructure management',
        operator: '==',
        entity: 'InfrastructureRole',
        textValue: 'CloudAdmin',
        modifiedDate: new Date('2023-01-01'),
        createdDate: new Date('2023-01-01'),
    },
    {
        id: '000030',
        contextDescription: 'Restriction from critical server access',
        operator: '!=',
        entity: 'ServerAccess',
        textValue: 'Critical',
        modifiedDate: new Date('2023-01-01'),
        createdDate: new Date('2023-01-01'),
    },
    {
        id: '000031',
        contextDescription: 'Access to development environment',
        operator: 'IN',
        entity: 'EnvironmentAccess',
        textValue: 'Development,Staging',
        modifiedDate: new Date('2023-01-01'),
        createdDate: new Date('2023-01-01'),
    },
    {
        id: '000032',
        contextDescription: 'Restriction from production environment',
        operator: '!=',
        entity: 'EnvironmentAccess',
        textValue: 'Production',
        modifiedDate: new Date('2023-01-01'),
        createdDate: new Date('2023-01-01'),
    },
    {
        id: '000033',
        contextDescription: 'Access for team leads',
        operator: '==',
        entity: 'UserRole',
        textValue: 'TeamLead',
        modifiedDate: new Date('2023-01-01'),
        createdDate: new Date('2023-01-01'),
    },
    {
        id: '000034',
        contextDescription: 'Access based on employment duration',
        operator: '>=',
        entity: 'EmploymentDuration',
        timeValue1: '365',
        modifiedDate: new Date('2023-01-01'),
        createdDate: new Date('2023-01-01'),
    },
    {
        id: '000035',
        contextDescription: 'Access to financial records',
        operator: '==',
        entity: 'DataAccess',
        textValue: 'Financial',
        modifiedDate: new Date('2023-01-01'),
        createdDate: new Date('2023-01-01'),
    },
    {
        id: '000036',
        contextDescription: 'Restriction from HR records',
        operator: '!=',
        entity: 'DataAccess',
        textValue: 'HR',
        modifiedDate: new Date('2023-01-01'),
        createdDate: new Date('2023-01-01'),
    },
    {
        id: '000037',
        contextDescription: 'Access for on-site employees',
        operator: '==',
        entity: 'EmployeeType',
        textValue: 'OnSite',
        modifiedDate: new Date('2023-01-01'),
        createdDate: new Date('2023-01-01'),
    },
    {
        id: '000038',
        contextDescription: 'Restriction for remote employees',
        operator: '==',
        entity: 'EmployeeType',
        textValue: 'Remote',
        modifiedDate: new Date('2023-01-01'),
        createdDate: new Date('2023-01-01'),
    },
];
