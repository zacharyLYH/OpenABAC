import {
    COUNT_NUMBER_OF_POLICY_USING_ABACID,
    DELETE_USER_POLICY_GIVEN_ABACID,
} from '@/abac/core-queries/user-policies/user-policy';
import { DELETE_USER_GIVEN_APPLICATIONUSERID } from '@/abac/core-queries/user/user';
import { db } from '@/abac/database';
import { ABACRequestResponse, Query, QueryCount } from '@/abac/interface';
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
    const deleteUserQuery: Query = {
        sql: DELETE_USER_GIVEN_APPLICATIONUSERID,
        params: [applicationUserId],
    };
    const deleteUserPolicyQuery: Query = {
        sql: DELETE_USER_POLICY_GIVEN_ABACID,
        params: [idResult],
    };
    await db.executeTransaction([deleteUserQuery, deleteUserPolicyQuery]);
    return {
        success: true,
        data: applicationUserId,
    };
}
