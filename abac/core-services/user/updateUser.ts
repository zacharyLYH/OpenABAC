import { UPDATE_USER_GIVEN_APPLICATIONUSERID } from '@/abac/core-queries/user/user';
import { db } from '@/abac/database';
import { ABACRequestResponse, Query, User } from '@/abac/interface';

export async function updateUserObject(
    applicationUserId: string,
    jsonCol: any,
    newApplicationUserId: string,
): Promise<ABACRequestResponse> {
    const query: Query = {
        sql: UPDATE_USER_GIVEN_APPLICATIONUSERID,
        params: [jsonCol, newApplicationUserId, applicationUserId],
    };
    const results = await db.query<User[]>(query);
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
