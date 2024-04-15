export interface Query {
    sql: string;
    params?: any[];
}

export type TransactionQueries = Query[];

export interface QueryCount {
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

export interface Context {
    id?: string;
    contextDescription: string;
    contextName: string;
    operator: string;
    entity: string;
    textValue?: string | undefined | null;
    timeValue1?: string | undefined | null;
    timeValue2?: string | undefined | null;
    modifiedDate?: Date;
    createdDate?: Date;
}

export interface ABACRequestResponse {
    authorized?: boolean;
    data?: any;
    message?: string;
    statusCode?: number;
    actions?: string[];
    success?: boolean;
}
