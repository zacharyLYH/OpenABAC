import { SearchAndSelectInterface } from '@/components/edit-page-components/search';
import { db } from '@/abac/database';
import { QueryCount, Query, User } from '@/abac/interface';
import {
    GET_ALL_USERS,
    GET_NUMBER_OF_USERS,
    GET_USER_BY_ID,
    GET_USER_VIA_SEARCH,
} from '@/abac/core-queries/user/user';

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
        const results = await db.query<QueryCount[]>(query);
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
        id: '0001U1',
        applicationUserId: 'JohnDoe',
        jsonCol: {
            ServerRoomAccess: '09:00:00,17:00:00',
            ProjectLocationAccess: ['MainOffice'],
        },
        modifiedDate: new Date('2023-01-01'),
        createdDate: new Date('2023-01-01'),
    },
    {
        id: '0001U2',
        applicationUserId: 'JaneSmith',
        jsonCol: null,
        modifiedDate: new Date('2023-01-01'),
        createdDate: new Date('2023-01-01'),
    },
    {
        id: '0001U3',
        applicationUserId: 'AliceJohnson',
        jsonCol: {
            DevServerMaintenance: '02:00:00,04:00:00',
            UserDataAccess: 'Administrator',
        },
        modifiedDate: new Date('2023-01-01'),
        createdDate: new Date('2023-01-01'),
    },
    {
        id: '0001U4',
        applicationUserId: 'BobBrown',
        jsonCol: {
            ProjectRegionalAccess: ['US', 'EU', 'JP'],
            ExpenseLimit: '1000',
        },
        modifiedDate: new Date('2023-01-01'),
        createdDate: new Date('2023-01-01'),
    },
    {
        id: '0001U5',
        applicationUserId: 'CharlieDavis',
        jsonCol: null,
        modifiedDate: new Date('2023-01-01'),
        createdDate: new Date('2023-01-01'),
    },
    {
        id: '0001U6',
        applicationUserId: 'DianaEvans',
        jsonCol: {
            FinancialRecordAccess: 'Intern',
            EmployeeAccountStatus: 'Active',
        },
        modifiedDate: new Date('2023-01-01'),
        createdDate: new Date('2023-01-01'),
    },
    {
        id: '0001U7',
        applicationUserId: 'EthanFoster',
        jsonCol: {
            ProjectDocType: 'Confidential',
            DatabaseSensitivity: 'High',
        },
        modifiedDate: new Date('2023-01-01'),
        createdDate: new Date('2023-01-01'),
    },
    {
        id: '0001U8',
        applicationUserId: 'FionaGreen',
        jsonCol: { PublicDocEdit: 'Public', FeatureAppVersion: '5.0' },
        modifiedDate: new Date('2023-01-01'),
        createdDate: new Date('2023-01-01'),
    },
    {
        id: '0001U9',
        applicationUserId: 'GeorgeHarris',
        jsonCol: null,
        modifiedDate: new Date('2023-01-01'),
        createdDate: new Date('2023-01-01'),
    },
    {
        id: '0001U10',
        applicationUserId: 'HannahIvy',
        jsonCol: {
            DatabaseSensitivity: 'Low',
            DeviceTypeAccess: ['Laptop', 'Desktop'],
        },
        modifiedDate: new Date('2023-01-01'),
        createdDate: new Date('2023-01-01'),
    },
    {
        id: '0001U11',
        applicationUserId: 'IanJones',
        jsonCol: { ExpenseLimit: '5000', EmployeeAccountStatus: 'Suspended' },
        modifiedDate: new Date('2023-01-01'),
        createdDate: new Date('2023-01-01'),
    },
    {
        id: '0001U12',
        applicationUserId: 'JuliaKlein',
        jsonCol: null,
        modifiedDate: new Date('2023-01-01'),
        createdDate: new Date('2023-01-01'),
    },
    {
        id: '0001U13',
        applicationUserId: 'KevinLee',
        jsonCol: {
            FeatureAppVersion: '4.9',
            UserLastActivity: '2023-01-01 00:00:00',
        },
        modifiedDate: new Date('2023-01-01'),
        createdDate: new Date('2023-01-01'),
    },
    {
        id: '0001U14',
        applicationUserId: 'LauraMorgan',
        jsonCol: {
            DeviceTypeAccess: ['Smartphone', 'Tablet'],
            UserGroupToolAccess: ['Engineering', 'Product'],
        },
        modifiedDate: new Date('2023-01-01'),
        createdDate: new Date('2023-01-01'),
    },
    {
        id: '0001U15',
        applicationUserId: 'MikeNolan',
        jsonCol: {
            ProjectResourceAccess: 'Alpha',
            EmployeeContractType: 'Permanent',
        },
        modifiedDate: new Date('2023-01-01'),
        createdDate: new Date('2023-01-01'),
    },
    {
        id: '0001U16',
        applicationUserId: 'NinaOwens',
        jsonCol: {
            ServerAccess: 'Critical',
            EnvironmentAccess: 'Development,Staging',
        },
        modifiedDate: new Date('2023-01-01'),
        createdDate: new Date('2023-01-01'),
    },
    {
        id: '0001U17',
        applicationUserId: 'OliverPerez',
        jsonCol: null,
        modifiedDate: new Date('2023-01-01'),
        createdDate: new Date('2023-01-01'),
    },
    {
        id: '0001U18',
        applicationUserId: 'PamelaQuinn',
        jsonCol: {
            UserLastActivity: '2022-06-30 00:00:00',
            SecurityClearance: 'Level3',
        },
        modifiedDate: new Date('2023-01-01'),
        createdDate: new Date('2023-01-01'),
    },
    {
        id: '0001U19',
        applicationUserId: 'QuincyReed',
        jsonCol: {
            InfrastructureRole: 'CloudAdmin',
            ContractType: 'Enterprise',
        },
        modifiedDate: new Date('2023-01-01'),
        createdDate: new Date('2023-01-01'),
    },
    {
        id: '0001U20',
        applicationUserId: 'RachelStone',
        jsonCol: null,
        modifiedDate: new Date('2023-01-01'),
        createdDate: new Date('2023-01-01'),
    },
];
