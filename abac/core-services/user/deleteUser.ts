import { COUNT_NUMBER_OF_POLICY_USING_ABACID } from '@/abac/core-queries/user-policies/user-policy';
import { DELETE_USER_GIVEN_APPLICATIONUSERID } from '@/abac/core-queries/user/user';
import { db } from '@/abac/database';
import { ABACRequestResponse, Query, QueryCount } from '@/abac/interface';
import { ResultSetHeader } from 'mysql2/promise';
import { getAndCheckAbacId } from '../core-services-utils';

export async function deleteUserObject(
    applicationUserId: string,
): Promise<ABACRequestResponse> {
    const idResult = await getAndCheckAbacId(applicationUserId);
    const anyPolicyAttachedQuery: Query = {
        sql: COUNT_NUMBER_OF_POLICY_USING_ABACID,
        params: [idResult],
    };
    const anyPolicyAttachedResult = await db.query<QueryCount[]>(
        anyPolicyAttachedQuery,
    );
    if (anyPolicyAttachedResult[0].count !== 0) {
        return {
            success: false,
            data: `There are ${anyPolicyAttachedResult[0].count} policy(s) still attached to ${applicationUserId}. Make sure to clear them first before deleting this user.`,
        };
    }
    const query: Query = {
        sql: DELETE_USER_GIVEN_APPLICATIONUSERID,
        params: [applicationUserId],
    };
    const results = await db.query<ResultSetHeader>(query);
    if (results.affectedRows === 1) {
        return {
            success: true,
            data: applicationUserId,
        };
    } else {
        return {
            success: false,
            data: `Something seems to be wrong. The number of affectedRows is ${results.affectedRows}.`,
        };
    }
}
