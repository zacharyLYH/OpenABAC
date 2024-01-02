export interface Query {
    sql: string;
    params?: any[];
}

export type TransactionQueries = Query[];

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