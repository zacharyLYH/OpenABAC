import {
    CREATE_USER,
    DELETE_USER_GIVEN_APPLICATIONUSERID,
    GET_USER_GIVEN_APPLICATIONUSERID,
} from '@/abac/core-queries/user/user';
import { db } from '@/abac/database';
import { ABACRequestResponse, Query, User } from '@/abac/interface';

export async function upsertUserObject(
    applicationUserId: string,
    jsonCol: any,
    newApplicationUserId: string,
): Promise<ABACRequestResponse> {
    const query: Query[] = [
        {
            sql: DELETE_USER_GIVEN_APPLICATIONUSERID,
            params: [applicationUserId],
        },
        {
            sql: CREATE_USER,
            params: [newApplicationUserId, jsonCol],
        },
        {
            sql: GET_USER_GIVEN_APPLICATIONUSERID,
            params: [newApplicationUserId],
        },
    ];
    const results = await db.executeTransaction<User[]>(query);
    if (results.length === 0) {
        return {
            success: false,
            data: {},
        };
    }
    return {
        success: true,
        data: results[0],
    };
}
