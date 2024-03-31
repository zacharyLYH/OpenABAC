import mysql, {
    Connection,
    RowDataPacket,
    ResultSetHeader,
    ProcedureCallPacket,
} from 'mysql2/promise';
import { TransactionQueries, Query } from './interface';

class Database {
    private static instance: Database;
    private connection: Connection | null = null;

    private constructor() {}

    public static getInstance(): Database {
        if (!Database.instance) {
            Database.instance = new Database();
        }
        return Database.instance;
    }

    public async getConnection(): Promise<Connection> {
        if (this.connection) {
            const pingResult = await this.connection.ping().catch(() => [null]);
            if (pingResult === undefined) {
                return this.connection;
            }
        }
        try {
            if (process.env.USE_PRODUCTION_DB === 'false') {
                this.connection = await mysql.createConnection({
                    host: process.env.DATABASE_HOST_DEV,
                    user: process.env.DATABASE_USER_DEV,
                    password: process.env.DATABASE_PASSWORD_DEV,
                    database: process.env.DATABASE_NAME_DEV,
                    port: parseInt(process.env.DATABASE_PORT_DEV || '3306'),
                });
            } else {
                this.connection = await mysql.createConnection({
                    host: process.env.DATABASE_HOST,
                    user: process.env.DATABASE_USER,
                    password: process.env.DATABASE_PASSWORD,
                    database: process.env.DATABASE_NAME,
                    port: parseInt(process.env.DATABASE_PORT || '3306'),
                    ssl: {
                        rejectUnauthorized: true,
                    },
                });
            }
            return this.connection;
        } catch (error) {
            console.error('Error connecting to database:', error);
            throw error;
        }
    }

    public async query<T>(query: Query): Promise<T> {
        const connection = await this.getConnection();
        const [results] = await connection.execute<
            | ResultSetHeader
            | RowDataPacket[]
            | RowDataPacket[][]
            | ResultSetHeader[]
            | ProcedureCallPacket
        >(query.sql, query.params);
        const plainResults = JSON.parse(JSON.stringify(results));
        return plainResults as T;
    }

    public async executeTransaction<T>(
        queries: TransactionQueries,
        connection?: any,
    ): Promise<T> {
        try {
            if (!connection) {
                connection = await this.getConnection();
            }
            await connection.beginTransaction();

            let result: T | null = null;
            for (let i = 0; i < queries.length; i++) {
                const query = queries[i];

                const [rows] = (await connection.execute(
                    query.sql,
                    query.params,
                )) as any;

                if (i === queries.length - 1) {
                    result = rows as T;
                }
            }

            await connection.commit();
            if (result === null) {
                throw new Error('Expected result, but none was found.');
            }
            return result;
        } catch (error) {
            await connection.rollback();
            console.error('Transaction failed:', error);
            throw error;
        } finally {
            await connection.end();
        }
    }
}

export const db = Database.getInstance();
