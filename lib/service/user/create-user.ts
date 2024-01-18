import { CREATE_USER } from '@/query/core-queries/user/user';
import { Query, User } from '../../interface';
import { db } from '../../database';

export async function createUser(jsonCol: any, applicationUserId: string) {
    try {
        const query: Query = {
            sql: CREATE_USER,
            params: [applicationUserId, jsonCol],
        };
        const result = await db.query(query);
        console.log(result);
    } catch (error) {
        console.error('An error occurred while creating a user:', error);
        // Handle the error gracefully here
    }
}
