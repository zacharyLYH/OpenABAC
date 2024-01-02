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
