import { GET_POLICY_GIVEN_POLICYNAME } from '@/abac/core-queries/policies/policies';
import { CHECK_OWNER_OF_POLICY } from '@/abac/core-queries/user-policies/user-policy';
import { db } from '@/abac/database';
import {
    ABACRequestResponse,
    Action,
    Policy,
    Query,
    QueryCount,
} from '@/abac/interface';
import { getAndCheckAbacId } from '../core-services-utils';
import { GET_ACTIONS_GIVEN_POLICY_ID } from '@/abac/core-queries/policy-action/policy-action';

export async function getPolicyIncludingActions(
    policyName: string,
    applicationUserId: string,
): Promise<ABACRequestResponse> {
    const abacId = await getAndCheckAbacId(applicationUserId);
    const checkOwnerOfPolicy: Query = {
        sql: CHECK_OWNER_OF_POLICY,
        params: [policyName, abacId],
    };
    const ownerOfPolicyQuery = await db.query<QueryCount[]>(checkOwnerOfPolicy);
    if (ownerOfPolicyQuery[0].count !== 1) {
        return {
            success: false,
            message: `This user doesn't own the ${policyName}.`,
        };
    }
    const policiesQuery: Query = {
        sql: GET_POLICY_GIVEN_POLICYNAME,
        params: [policyName],
    };
    const policyResult = await db.query<Policy[]>(policiesQuery);
    if (policyResult.length === 0) {
        return { data: {} };
    }
    const actionsQuery: Query = {
        sql: GET_ACTIONS_GIVEN_POLICY_ID,
        params: [policyResult[0].id],
    };
    const actionsResult = await db.query<Action[]>(actionsQuery);
    const actionNames = actionsResult.map(action => action.actionName);
    return {
        data: {
            policyResult,
            actionNames,
        },
    };
}
