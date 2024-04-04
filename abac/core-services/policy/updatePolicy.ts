import { CHECK_OWNER_OF_POLICY } from '@/abac/core-queries/user-policies/user-policy';
import { db } from '@/abac/database';
import { ABACRequestResponse, Query, QueryCount } from '@/abac/interface';
import { getAndCheckAbacId } from '../core-services-utils';
import { UPDATE_QUERY_GIVEN_POLICYNAME } from '@/abac/core-queries/policies/policies';
import { ResultSetHeader } from 'mysql2';

export async function updatePolicyObject(
    applicationUserId: string,
    policyNameToUpdate: string,
    newPolicyName: string,
    newPolicyDescription: string,
    newAllow: boolean,
): Promise<ABACRequestResponse> {
    const abacId = await getAndCheckAbacId(applicationUserId);
    const checkPolicyOwner: Query = {
        sql: CHECK_OWNER_OF_POLICY,
        params: [policyNameToUpdate, abacId],
    };
    const checkPolicyOwnerResults =
        await db.query<QueryCount[]>(checkPolicyOwner);
    if (checkPolicyOwnerResults[0].count !== 1) {
        return {
            success: false,
            message: "It seems like the requester doesn't own the policy.",
        };
    }
    const updatePolicyQuery: Query = {
        sql: UPDATE_QUERY_GIVEN_POLICYNAME,
        params: [
            newPolicyName,
            newPolicyDescription,
            newAllow,
            policyNameToUpdate,
        ],
    };
    const updatePolicyQueryResults =
        await db.query<ResultSetHeader>(updatePolicyQuery);
    if (updatePolicyQueryResults.affectedRows !== 1) {
        return {
            success: false,
            message: 'Something went wrong in the update query.',
        };
    }
    return {
        success: true,
        data: {
            policyName: newPolicyName,
            policyDescription: newPolicyDescription,
            allow: newAllow,
        },
    };
}
