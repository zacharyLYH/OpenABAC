export interface Query {
    sql: string;
    params?: any[];
}

export type TransactionQueries = Query[];

export interface Count {
    count: number;
}

export interface User {
    jsonCol: any;
    applicationUserId: string;
    id: string;
    modifiedDate: Date;
    createdDate: Date;
}

export interface Policy {
    id: string;
    policyName: string;
    policyDescription: string;
    modifiedDate: Date;
    createdDate: Date;
    allow: boolean;
}

export interface Action {
    id: string;
    actionName: string;
    actionDescription: string;
    modifiedDate: Date;
    createdDate: Date;
}
