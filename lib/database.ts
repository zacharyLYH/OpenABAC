import mysql, { Connection, RowDataPacket, ResultSetHeader, ProcedureCallPacket } from 'mysql2/promise';
import { TransactionQueries, Query } from './interface';

class Database {
    private static instance: Database;
    private connection: Connection | null = null;

    private constructor() { }

    public static getInstance(): Database {
        if (!Database.instance) {
            Database.instance = new Database();
        }
        return Database.instance;
    }

    public async getConnection(): Promise<Connection> {
        if (this.connection === null) {
            try {
                if (process.env.IS_PRODUCTION === 'false') {
                    this.connection = await mysql.createConnection({
                        host: process.env.DATABASE_HOST_DEV,
                        user: process.env.DATABASE_USER_DEV,
                        password: process.env.DATABASE_PASSWORD_DEV,
                        database: process.env.DATABASE_NAME_DEV,
                        port: parseInt(process.env.DATABASE_PORT_DEV || '3306')
                    });
                } else {
                    this.connection = await mysql.createConnection({
                        host: process.env.DATABASE_HOST,
                        user: process.env.DATABASE_USER,
                        password: process.env.DATABASE_PASSWORD,
                        database: process.env.DATABASE_NAME,
                        port: parseInt(process.env.DATABASE_PORT || '3306')
                    });
                }
            } catch (error) {
                console.error('Error connecting to database:', error);
                throw error;
            }
        }
        return this.connection;
    }

    public async query<T>(query: Query): Promise<T> {
        const connection = await this.getConnection();
        const [results] = await connection.execute<ResultSetHeader | RowDataPacket[] | RowDataPacket[][] | ResultSetHeader[] | ProcedureCallPacket>(query.sql, query.params);
        return results as T;
    }

    public async executeTransaction(queries: TransactionQueries): Promise<void> {
        const connection = await this.getConnection();
        try {
            await connection.beginTransaction();
            for (const query of queries) {
                await connection.execute<ResultSetHeader | RowDataPacket[] | RowDataPacket[][] | ResultSetHeader[] | ProcedureCallPacket>(query.sql, query.params);
            }
            await connection.commit();
        } catch (error) {
            await connection.rollback();
            console.error('Transaction failed:', error);
            throw error;
        } finally {
            connection.end();
        }
    }
}

export const db = Database.getInstance();
