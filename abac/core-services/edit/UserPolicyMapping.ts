import { GET_POLICY_ID_GIVEN_NAME } from '@/abac/core-queries/policies/policies';
import { db } from '@/abac/database';
import { ABACRequestResponse, Policy, Query } from '@/abac/interface';
import { getAndCheckAbacId } from '../core-services-utils';
import {
    CREATE_USER_POLICY_GIVEN_ABACID,
    DELETE_USER_POLICY_GIVEN_ABACID,
} from '@/abac/core-queries/user-policies/user-policy';

export async function userPolicyMapping(
    applicationUserId: string,
    policyNames: string[],
): Promise<ABACRequestResponse> {
    if (new Set(policyNames).size !== policyNames.length) {
        return {
            success: false,
            data: `One or more policies are duplicates.`,
        };
    }
    const abacId = await getAndCheckAbacId(applicationUserId);
    const checkAllPoliciesExist: Query = {
        sql: GET_POLICY_ID_GIVEN_NAME(policyNames.length),
        params: policyNames,
    };
    const checkAllPoliciesQuery = await db.query<Policy[]>(
        checkAllPoliciesExist,
    );
    if (checkAllPoliciesQuery.length !== policyNames.length) {
        return {
            success: false,
            data: `One or more policies don't exist. Make sure those policies exist before assigning them.`,
        };
    }
    const policyNameToIdMap: Map<string, string> = new Map();

    checkAllPoliciesQuery.forEach(policy => {
        policyNameToIdMap.set(policy.policyName, policy.id);
    });

    const upsertUserPolicyTxn: Query[] = [
        {
            sql: DELETE_USER_POLICY_GIVEN_ABACID,
            params: [abacId],
        },
    ];
    for (const name of policyNames) {
        upsertUserPolicyTxn.push({
            sql: CREATE_USER_POLICY_GIVEN_ABACID,
            params: [abacId, policyNameToIdMap.get(name)],
        });
    }
    await db.executeTransaction(upsertUserPolicyTxn);
    return {
        success: true,
        data: policyNames,
    };
}
