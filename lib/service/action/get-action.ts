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
        id: "0000A1",
        actionName: "CreateNewProject",
        actionDescription: "Create new projects",
        modifiedDate: new Date("2023-01-01"),
        createdDate: new Date("2023-01-01")
    },
    {
        id: "0000A2",
        actionName: "Read/ProjectAlpha",
        actionDescription: "Read project Alpha",
        modifiedDate: new Date("2023-01-01"),
        createdDate: new Date("2023-01-01")
    },
    {
        id: "0000A3",
        actionName: "Write/ProjectAlpha",
        actionDescription: "Write project Alpha",
        modifiedDate: new Date("2023-01-01"),
        createdDate: new Date("2023-01-01")
    },
    {
        id: "0000A4",
        actionName: "Delete/ProjectAlpha",
        actionDescription: "Delete project Alpha",
        modifiedDate: new Date("2023-01-01"),
        createdDate: new Date("2023-01-01")
    },
    {
        id: "0000A5",
        actionName: "MergeToDev/ProjectAlpha",
        actionDescription: "Merge project Alpha to Dev",
        modifiedDate: new Date("2023-01-01"),
        createdDate: new Date("2023-01-01")
    },
    {
        id: "0000A6",
        actionName: "AcceptPRToDev/ProjectAlpha",
        actionDescription: "Accept a PR in project Alpha to Dev",
        modifiedDate: new Date("2023-01-01"),
        createdDate: new Date("2023-01-01")
    },
    {
        id: "0000A7",
        actionName: "MergeToProd/ProjectAlpha",
        actionDescription: "Merge project Alpha to Production",
        modifiedDate: new Date("2023-01-01"),
        createdDate: new Date("2023-01-01")
    },
    {
        id: "0000A8",
        actionName: "AddDevs/ProjectAlpha",
        actionDescription: "Add devs to project Alpha",
        modifiedDate: new Date("2023-01-01"),
        createdDate: new Date("2023-01-01")
    },
    {
        id: "0000A9",
        actionName: "RemoveDevs/ProjectAlpha",
        actionDescription: "Remove devs from project Alpha",
        modifiedDate: new Date("2023-01-01"),
        createdDate: new Date("2023-01-01")
    },
    {
        id: "000A10",
        actionName: "AccessProdCluster/ProjectAlpha",
        actionDescription: "Access production cluster for project Alpha",
        modifiedDate: new Date("2023-01-01"),
        createdDate: new Date("2023-01-01")
    },
    {
        id: "000A11",
        actionName: "AccessTestResults/ProjectAlpha",
        actionDescription: "Access automated test results for project Alpha",
        modifiedDate: new Date("2023-01-01"),
        createdDate: new Date("2023-01-01")
    },
    {
        id: "000A12",
        actionName: "UpdateProdCluster/ProjectAlpha",
        actionDescription: "Update production compute cluster for project Alpha",
        modifiedDate: new Date("2023-01-01"),
        createdDate: new Date("2023-01-01")
    },
    {
        id: "000A13",
        actionName: "RunAutomatedTest/ProjectAlpha",
        actionDescription: "Trigger automated test run for project Alpha",
        modifiedDate: new Date("2023-01-01"),
        createdDate: new Date("2023-01-01")
    },
    {
        id: "000A14",
        actionName: "UploadAutomatedTestScript/ProjectAlpha",
        actionDescription: "Upload a new test script for automated tests for project Alpha",
        modifiedDate: new Date("2023-01-01"),
        createdDate: new Date("2023-01-01")
    },
    {
        id: "000A15",
        actionName: "EditCICDPipeline/ProjectAlpha",
        actionDescription: "Edit CICD pipeline for project Alpha",
        modifiedDate: new Date("2023-01-01"),
        createdDate: new Date("2023-01-01")
    },
    {
        id: "0000B0",
        actionName: "ProdDBConsoleAccess/ProjectAlpha",
        actionDescription: "Access the production database console for Project Alpha",
        modifiedDate: new Date("2023-01-01"),
        createdDate: new Date("2023-01-01")
    },
    {
        id: "0000B1",
        actionName: "DevDBConsoleAccess/ProjectAlpha",
        actionDescription: "Access the development database console for Project Alpha",
        modifiedDate: new Date("2023-01-01"),
        createdDate: new Date("2023-01-01")
    },
    {
        id: "0000B2",
        actionName: "AccessCoreDBSettings/ProjectAlpha",
        actionDescription: "Access core database settings for Project Alpha",
        modifiedDate: new Date("2023-01-01"),
        createdDate: new Date("2023-01-01")
    },
    {
        id: "0000B3",
        actionName: "AccessAdvancedDBSettings/ProjectAlpha",
        actionDescription: "Access advanced database settings for Project Alpha",
        modifiedDate: new Date("2023-01-01"),
        createdDate: new Date("2023-01-01")
    },
    {
        id: "0000B4",
        actionName: "EditWhitelist/ProjectAlpha",
        actionDescription: "Edit the whitelist for Project Alpha",
        modifiedDate: new Date("2023-01-01"),
        createdDate: new Date("2023-01-01")
    },
    {
        id: "0000B5",
        actionName: "EditBlacklist/ProjectAlpha",
        actionDescription: "Edit the blacklist for Project Alpha",
        modifiedDate: new Date("2023-01-01"),
        createdDate: new Date("2023-01-01")
    },
    {
        id: "0000B6",
        actionName: "RedeployApp/ProjectAlpha",
        actionDescription: "Redeploy the application for Project Alpha",
        modifiedDate: new Date("2023-01-01"),
        createdDate: new Date("2023-01-01")
    },
    {
        id: "0000B7",
        actionName: "RestartCluster/ProjectAlpha",
        actionDescription: "Restart the server cluster for Project Alpha",
        modifiedDate: new Date("2023-01-01"),
        createdDate: new Date("2023-01-01")
    },
    {
        id: "0000B8",
        actionName: "EditMessageQueue/ProjectAlpha",
        actionDescription: "Edit the message queue settings for Project Alpha",
        modifiedDate: new Date("2023-01-01"),
        createdDate: new Date("2023-01-01")
    },
    {
        id: "0000B9",
        actionName: "ViewMessageQueue/ProjectAlpha",
        actionDescription: "View the message queue for Project Alpha",
        modifiedDate: new Date("2023-01-01"),
        createdDate: new Date("2023-01-01")
    },
    {
        id: "000B10",
        actionName: "Read/ProjectBeta",
        actionDescription: "Read project Beta",
        modifiedDate: new Date("2023-01-01"),
        createdDate: new Date("2023-01-01")
    },
    {
        id: "000B11",
        actionName: "Write/ProjectBeta",
        actionDescription: "Write project Beta",
        modifiedDate: new Date("2023-01-01"),
        createdDate: new Date("2023-01-01")
    },
    {
        id: "000B12",
        actionName: "Delete/ProjectBeta",
        actionDescription: "Delete project Beta",
        modifiedDate: new Date("2023-01-01"),
        createdDate: new Date("2023-01-01")
    },
    {
        id: "000B13",
        actionName: "MergeToDev/ProjectBeta",
        actionDescription: "Merge project Beta to Dev",
        modifiedDate: new Date("2023-01-01"),
        createdDate: new Date("2023-01-01")
    },
    {
        id: "000B14",
        actionName: "AcceptPRToDev/ProjectBeta",
        actionDescription: "Accept a PR in project Beta",
        modifiedDate: new Date("2023-01-01"),
        createdDate: new Date("2023-01-01")
    },
    {
        id: "000B15",
        actionName: "MergeToProd/ProjectBeta",
        actionDescription: "Merge project Beta to Production",
        modifiedDate: new Date("2023-01-01"),
        createdDate: new Date("2023-01-01")
    },
    {
        id: "0000C0",
        actionName: "AddDevs/ProjectBeta",
        actionDescription: "Add devs to project Beta",
        modifiedDate: new Date("2023-01-01"),
        createdDate: new Date("2023-01-01")
    },
    {
        id: "0000C1",
        actionName: "RemoveDevs/ProjectBeta",
        actionDescription: "Remove devs from project Beta",
        modifiedDate: new Date("2023-01-01"),
        createdDate: new Date("2023-01-01")
    },
    {
        id: "0000C2",
        actionName: "AccessProdCluster/ProjectBeta",
        actionDescription: "Access production cluster for project Beta",
        modifiedDate: new Date("2023-01-01"),
        createdDate: new Date("2023-01-01")
    },
    {
        id: "0000C3",
        actionName: "AccessTestResults/ProjectBeta",
        actionDescription: "Access automated test results for project Beta",
        modifiedDate: new Date("2023-01-01"),
        createdDate: new Date("2023-01-01")
    },
    {
        id: "0000C4",
        actionName: "UpdateProdCluster/ProjectBeta",
        actionDescription: "Update production compute cluster for project Beta",
        modifiedDate: new Date("2023-01-01"),
        createdDate: new Date("2023-01-01")
    },
    {
        id: "0000C5",
        actionName: "RunAutomatedTest/ProjectBeta",
        actionDescription: "Trigger automated test run for project Beta",
        modifiedDate: new Date("2023-01-01"),
        createdDate: new Date("2023-01-01")
    },
    {
        id: "0000C6",
        actionName: "UploadAutomatedTestScript/ProjectBeta",
        actionDescription: "Upload a new test script for automated tests for project Beta",
        modifiedDate: new Date("2023-01-01"),
        createdDate: new Date("2023-01-01")
    },
    {
        id: "0000C7",
        actionName: "EditCICDPipeline/ProjectBeta",
        actionDescription: "Edit CICD pipeline for project Beta",
        modifiedDate: new Date("2023-01-01"),
        createdDate: new Date("2023-01-01")
    },
    {
        id: "0000C8",
        actionName: "ProdDBConsoleAccess/ProjectBeta",
        actionDescription: "Access the production database console for Project Beta",
        modifiedDate: new Date("2023-01-01"),
        createdDate: new Date("2023-01-01")
    },
    {
        id: "0000C9",
        actionName: "DevDBConsoleAccess/ProjectBeta",
        actionDescription: "Access the development database console for Project Beta",
        modifiedDate: new Date("2023-01-01"),
        createdDate: new Date("2023-01-01")
    },
    {
        id: "000C10",
        actionName: "AccessCoreDBSettings/ProjectBeta",
        actionDescription: "Access core database settings for Project Beta",
        modifiedDate: new Date("2023-01-01"),
        createdDate: new Date("2023-01-01")
    },
    {
        id: "000C11",
        actionName: "AccessAdvancedDBSettings/ProjectBeta",
        actionDescription: "Access advanced database settings for Project Beta",
        modifiedDate: new Date("2023-01-01"),
        createdDate: new Date("2023-01-01")
    },
    {
        id: "000C12",
        actionName: "EditWhitelist/ProjectBeta",
        actionDescription: "Edit the whitelist for Project Beta",
        modifiedDate: new Date("2023-01-01"),
        createdDate: new Date("2023-01-01")
    },
    {
        id: "000C13",
        actionName: "EditBlacklist/ProjectBeta",
        actionDescription: "Edit the blacklist for Project Beta",
        modifiedDate: new Date("2023-01-01"),
        createdDate: new Date("2023-01-01")
    },
    {
        id: "000C14",
        actionName: "RedeployApp/ProjectBeta",
        actionDescription: "Redeploy the application for Project Beta",
        modifiedDate: new Date("2023-01-01"),
        createdDate: new Date("2023-01-01")
    },
    {
        id: "000C15",
        actionName: "RestartCluster/ProjectBeta",
        actionDescription: "Restart the server cluster for Project Beta",
        modifiedDate: new Date("2023-01-01"),
        createdDate: new Date("2023-01-01")
    },
    {
        id: "000C16",
        actionName: "EditMessageQueue/ProjectBeta",
        actionDescription: "Edit the message queue settings for Project Beta",
        modifiedDate: new Date("2023-01-01"),
        createdDate: new Date("2023-01-01")
    },
    {
        id: "000C17",
        actionName: "ViewMessageQueue/ProjectBeta",
        actionDescription: "View the message queue for Project Beta",
        modifiedDate: new Date("2023-01-01"),
        createdDate: new Date("2023-01-01")
    },
    {
        id: "QK7B81",
        actionName: "Read/ProjectDelta",
        actionDescription: "Read project Delta",
        modifiedDate: new Date("2023-01-01"),
        createdDate: new Date("2023-01-01")
    },
    {
        id: "QK7B82",
        actionName: "Write/ProjectDelta",
        actionDescription: "Write project Delta",
        modifiedDate: new Date("2023-01-01"),
        createdDate: new Date("2023-01-01")
    },
    {
        id: "QK7B83",
        actionName: "Delete/ProjectDelta",
        actionDescription: "Delete project Delta",
        modifiedDate: new Date("2023-01-01"),
        createdDate: new Date("2023-01-01")
    },
    {
        id: "QK7B84",
        actionName: "MergeToDev/ProjectDelta",
        actionDescription: "Merge project Delta to Dev",
        modifiedDate: new Date("2023-01-01"),
        createdDate: new Date("2023-01-01")
    },
    {
        id: "QK7B85",
        actionName: "AcceptPRToDev/ProjectDelta",
        actionDescription: "Accept a PR in project Delta",
        modifiedDate: new Date("2023-01-01"),
        createdDate: new Date("2023-01-01")
    },
    {
        id: "QK7B86",
        actionName: "MergeToProd/ProjectDelta",
        actionDescription: "Merge project Delta to Production",
        modifiedDate: new Date("2023-01-01"),
        createdDate: new Date("2023-01-01")
    },
    {
        id: "QK7B87",
        actionName: "AddDevs/ProjectDelta",
        actionDescription: "Add devs to project Delta",
        modifiedDate: new Date("2023-01-01"),
        createdDate: new Date("2023-01-01")
    },
    {
        id: "QK7B88",
        actionName: "RemoveDevs/ProjectDelta",
        actionDescription: "Remove devs from project Delta",
        modifiedDate: new Date("2023-01-01"),
        createdDate: new Date("2023-01-01")
    },
    {
        id: "QK7B89",
        actionName: "AccessProdCluster/ProjectDelta",
        actionDescription: "Access production cluster for project Delta",
        modifiedDate: new Date("2023-01-01"),
        createdDate: new Date("2023-01-01")
    },
    {
        id: "QK7B810",
        actionName: "AccessTestResults/ProjectDelta",
        actionDescription: "Access automated test results for project Delta",
        modifiedDate: new Date("2023-01-01"),
        createdDate: new Date("2023-01-01")
    },
    {
        id: "QK7B811",
        actionName: "UpdateProdCluster/ProjectDelta",
        actionDescription: "Update production compute cluster for project Delta",
        modifiedDate: new Date("2023-01-01"),
        createdDate: new Date("2023-01-01")
    },
    {
        id: "QK7B812",
        actionName: "RunAutomatedTest/ProjectDelta",
        actionDescription: "Trigger automated test run for project Delta",
        modifiedDate: new Date("2023-01-01"),
        createdDate: new Date("2023-01-01")
    },
    {
        id: "QK7B813",
        actionName: "UploadAutomatedTestScript/ProjectDelta",
        actionDescription: "Upload a new test script for automated tests for project Delta",
        modifiedDate: new Date("2023-01-01"),
        createdDate: new Date("2023-01-01")
    },
    {
        id: "QK7B814",
        actionName: "EditCICDPipeline/ProjectDelta",
        actionDescription: "Edit CICD pipeline for project Delta",
        modifiedDate: new Date("2023-01-01"),
        createdDate: new Date("2023-01-01")
    },
    {
        id: "QK7B815",
        actionName: "ProdDBConsoleAccess/ProjectDelta",
        actionDescription: "Access the production database console for Project Delta",
        modifiedDate: new Date("2023-01-01"),
        createdDate: new Date("2023-01-01")
    },
    {
        id: "QK7B816",
        actionName: "DevDBConsoleAccess/ProjectDelta",
        actionDescription: "Access the development database console for Project Delta",
        modifiedDate: new Date("2023-01-01"),
        createdDate: new Date("2023-01-01")
    },
    {
        id: "QK7B817",
        actionName: "AccessCoreDBSettings/ProjectDelta",
        actionDescription: "Access core database settings for Project Delta",
        modifiedDate: new Date("2023-01-01"),
        createdDate: new Date("2023-01-01")
    },
    {
        id: "QK7B818",
        actionName: "AccessAdvancedDBSettings/ProjectDelta",
        actionDescription: "Access advanced database settings for Project Delta",
        modifiedDate: new Date("2023-01-01"),
        createdDate: new Date("2023-01-01")
    },
    {
        id: "QK7B819",
        actionName: "EditWhitelist/ProjectDelta",
        actionDescription: "Edit the whitelist for Project Delta",
        modifiedDate: new Date("2023-01-01"),
        createdDate: new Date("2023-01-01")
    },
    {
        id: "QK7B820",
        actionName: "EditBlacklist/ProjectDelta",
        actionDescription: "Edit the blacklist for Project Delta",
        modifiedDate: new Date("2023-01-01"),
        createdDate: new Date("2023-01-01")
    },
    {
        id: "QK7B821",
        actionName: "RedeployApp/ProjectDelta",
        actionDescription: "Redeploy the application for Project Delta",
        modifiedDate: new Date("2023-01-01"),
        createdDate: new Date("2023-01-01")
    },
    {
        id: "QK7B822",
        actionName: "RestartCluster/ProjectDelta",
        actionDescription: "Restart the server cluster for Project Delta",
        modifiedDate: new Date("2023-01-01"),
        createdDate: new Date("2023-01-01")
    },
    {
        id: "QK7B823",
        actionName: "EditMessageQueue/ProjectDelta",
        actionDescription: "Edit the message queue settings for Project Delta",
        modifiedDate: new Date("2023-01-01"),
        createdDate: new Date("2023-01-01")
    },
    {
        id: "QK7B824",
        actionName: "ViewMessageQueue/ProjectDelta",
        actionDescription: "View the message queue for Project Delta",
        modifiedDate: new Date("2023-01-01"),
        createdDate: new Date("2023-01-01")
    },
    {
        id: "12TR561",
        actionName: "Read/ProjectGamma",
        actionDescription: "Read project Gamma",
        modifiedDate: new Date("2023-01-01"),
        createdDate: new Date("2023-01-01")
    },
    {
        id: "12TR562",
        actionName: "Write/ProjectGamma",
        actionDescription: "Write project Gamma",
        modifiedDate: new Date("2023-01-01"),
        createdDate: new Date("2023-01-01")
    },
    {
        id: "12TR563",
        actionName: "Delete/ProjectGamma",
        actionDescription: "Delete project Gamma",
        modifiedDate: new Date("2023-01-01"),
        createdDate: new Date("2023-01-01")
    },
    {
        id: "12TR564",
        actionName: "MergeToDev/ProjectGamma",
        actionDescription: "Merge project Gamma to Dev",
        modifiedDate: new Date("2023-01-01"),
        createdDate: new Date("2023-01-01")
    },
    {
        id: "12TR565",
        actionName: "AcceptPRToDev/ProjectGamma",
        actionDescription: "Accept a PR in project Gamma",
        modifiedDate: new Date("2023-01-01"),
        createdDate: new Date("2023-01-01")
    },
    {
        id: "12TR566",
        actionName: "MergeToProd/ProjectGamma",
        actionDescription: "Merge project Gamma to Production",
        modifiedDate: new Date("2023-01-01"),
        createdDate: new Date("2023-01-01")
    },
    {
        id: "12TR567",
        actionName: "AddDevs/ProjectGamma",
        actionDescription: "Add devs to project Gamma",
        modifiedDate: new Date("2023-01-01"),
        createdDate: new Date("2023-01-01")
    },
    {
        id: "12TR568",
        actionName: "RemoveDevs/ProjectGamma",
        actionDescription: "Remove devs from project Gamma",
        modifiedDate: new Date("2023-01-01"),
        createdDate: new Date("2023-01-01")
    },
    {
        id: "12TR569",
        actionName: "AccessProdCluster/ProjectGamma",
        actionDescription: "Access production cluster for project Gamma",
        modifiedDate: new Date("2023-01-01"),
        createdDate: new Date("2023-01-01")
    },
    {
        id: "12TR5610",
        actionName: "AccessTestResults/ProjectGamma",
        actionDescription: "Access automated test results for project Gamma",
        modifiedDate: new Date("2023-01-01"),
        createdDate: new Date("2023-01-01")
    },
    {
        id: "12TR5611",
        actionName: "UpdateProdCluster/ProjectGamma",
        actionDescription: "Update production compute cluster for project Gamma",
        modifiedDate: new Date("2023-01-01"),
        createdDate: new Date("2023-01-01")
    },
    {
        id: "12TR5612",
        actionName: "RunAutomatedTest/ProjectGamma",
        actionDescription: "Trigger automated test run for project Gamma",
        modifiedDate: new Date("2023-01-01"),
        createdDate: new Date("2023-01-01")
    },
    {
        id: "12TR5613",
        actionName: "UploadAutomatedTestScript/ProjectGamma",
        actionDescription: "Upload a new test script for automated tests for project Gamma",
        modifiedDate: new Date("2023-01-01"),
        createdDate: new Date("2023-01-01")
    },
    {
        id: "12TR5614",
        actionName: "EditCICDPipeline/ProjectGamma",
        actionDescription: "Edit CICD pipeline for project Gamma",
        modifiedDate: new Date("2023-01-01"),
        createdDate: new Date("2023-01-01")
    },
    {
        id: "12TR5615",
        actionName: "ProdDBConsoleAccess/ProjectGamma",
        actionDescription: "Access the production database console for Project Gamma",
        modifiedDate: new Date("2023-01-01"),
        createdDate: new Date("2023-01-01")
    },
    {
        id: "12TR5616",
        actionName: "DevDBConsoleAccess/ProjectGamma",
        actionDescription: "Access the development database console for Project Gamma",
        modifiedDate: new Date("2023-01-01"),
        createdDate: new Date("2023-01-01")
    },
    {
        id: "12TR5617",
        actionName: "AccessCoreDBSettings/ProjectGamma",
        actionDescription: "Access core database settings for Project Gamma",
        modifiedDate: new Date("2023-01-01"),
        createdDate: new Date("2023-01-01")
    },
    {
        id: "12TR5618",
        actionName: "AccessAdvancedDBSettings/ProjectGamma",
        actionDescription: "Access advanced database settings for Project Gamma",
        modifiedDate: new Date("2023-01-01"),
        createdDate: new Date("2023-01-01")
    },
    {
        id: "12TR5619",
        actionName: "EditWhitelist/ProjectGamma",
        actionDescription: "Edit the whitelist for Project Gamma",
        modifiedDate: new Date("2023-01-01"),
        createdDate: new Date("2023-01-01")
    },
    {
        id: "12TR5620",
        actionName: "EditBlacklist/ProjectGamma",
        actionDescription: "Edit the blacklist for Project Gamma",
        modifiedDate: new Date("2023-01-01"),
        createdDate: new Date("2023-01-01")
    },
    {
        id: "12TR5621",
        actionName: "RedeployApp/ProjectGamma",
        actionDescription: "Redeploy the application for Project Gamma",
        modifiedDate: new Date("2023-01-01"),
        createdDate: new Date("2023-01-01")
    },
    {
        id: "12TR5622",
        actionName: "RestartCluster/ProjectGamma",
        actionDescription: "Restart the server cluster for Project Gamma",
        modifiedDate: new Date("2023-01-01"),
        createdDate: new Date("2023-01-01")
    },
    {
        id: "12TR5623",
        actionName: "EditMessageQueue/ProjectGamma",
        actionDescription: "Edit the message queue settings for Project Gamma",
        modifiedDate: new Date("2023-01-01"),
        createdDate: new Date("2023-01-01")
    },
    {
        id: "12TR5624",
        actionName: "ViewMessageQueue/ProjectGamma",
        actionDescription: "View the message queue for Project Gamma",
        modifiedDate: new Date("2023-01-01"),
        createdDate: new Date("2023-01-01")
    },
];
