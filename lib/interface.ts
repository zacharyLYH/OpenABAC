export interface Query {
    sql: string;
    params?: any[];
}

export type TransactionQueries = Query[];
