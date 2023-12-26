import mysql, { Connection, PoolConnection, RowDataPacket, ResultSetHeader, ProcedureCallPacket } from 'mysql2/promise';

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
                this.connection = await mysql.createConnection({
                    host: process.env.DATABASE_HOST,
                    user: process.env.DATABASE_USER,
                    password: process.env.DATABASE_PASSWORD,
                    database: process.env.DATABASE_NAME,
                    port: parseInt(process.env.DATABASE_PORT || '3306')
                });
            } catch (error) {
                console.error('Error connecting to database:', error);
                throw error;
            }
        }
        return this.connection;
    }

    public async query<T>(sql: string, params?: any[]): Promise<T> {
        const connection = await this.getConnection();
        const [results] = await connection.execute<ResultSetHeader | RowDataPacket[] | RowDataPacket[][] | ResultSetHeader[] | ProcedureCallPacket>(sql, params);
        return results as T;
    }

    public async transactionQuery<T>(
        client: PoolConnection, sql: string, params?: any[]
    ): Promise<T> {
        try {
            const [results] = await client.execute<ResultSetHeader | RowDataPacket[] | RowDataPacket[][] | ResultSetHeader[] | ProcedureCallPacket>(sql, params);
            return results as T;
        } catch (error) {
            console.error('Error executing transaction query:', error);
            throw error;
        }
    }
}

export const db = Database.getInstance();
