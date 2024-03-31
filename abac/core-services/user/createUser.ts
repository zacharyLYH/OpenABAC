import {
    CREATE_USER,
    IS_USER_APPLICATIONUSERID_UNIQUE,
} from '@/abac/core-queries/user/user';
import { db } from '@/abac/database';
import { ABACRequestResponse, Query, QueryCount, User } from '@/abac/interface';

export async function createUserObject(
    applicationUserId: string,
    jsonCol: any,
): Promise<ABACRequestResponse> {
    const checkUniqueApplicationUserId: Query = {
        sql: IS_USER_APPLICATIONUSERID_UNIQUE,
        params: [applicationUserId],
    };
    const uniqueResult = await db.query<QueryCount[]>(
        checkUniqueApplicationUserId,
    );
    if (uniqueResult[0].count != 0) {
        return {
            success: false,
            data: `${applicationUserId} has been taken.`,
        };
    }
    const query: Query = {
        sql: CREATE_USER,
        params: [applicationUserId, jsonCol],
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
