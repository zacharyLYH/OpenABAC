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
    allow: boolean | string;
}

export interface Action {
    id: string;
    actionName: string;
    actionDescription: string;
    modifiedDate: Date;
    createdDate: Date;
}

export interface Context {
    id?: string;
    contextDescription: string;
    operator: string;
    entity: string;
    textValue?: string | undefined;
    timeValue1?: string | undefined;
    timeValue2?: string | undefined;
    modifiedDate?: Date;
    createdDate?: Date;
}
