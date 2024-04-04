import { CHECK_OWNER_OF_POLICY } from '@/abac/core-queries/user-policies/user-policy';
import { db } from '@/abac/database';
import {
    ABACRequestResponse,
    Policy,
    Query,
    QueryCount,
    User,
} from '@/abac/interface';
import { getAndCheckAbacId } from '../core-services-utils';
import {
    DELETE_SINGLE_POLICY_GIVEN_NAME,
    GET_POLICY_GIVEN_POLICYNAME,
} from '@/abac/core-queries/policies/policies';
import { DOES_POLICY_HAVE_ANY_ACTION_ATTACHED } from '@/abac/core-queries/policy-action/policy-action';

export async function deletePolicyObject(
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
    const policyIdQuery: Query = {
        sql: GET_POLICY_GIVEN_POLICYNAME,
        params: [policyName],
    };
    const policyId = (await db.query<Policy[]>(policyIdQuery))[0].id;
    const anyActionStillAttachedQuery: Query = {
        sql: DOES_POLICY_HAVE_ANY_ACTION_ATTACHED,
        params: [policyId],
    };
    const anyActionStillAttached = await db.query<QueryCount[]>(
        anyActionStillAttachedQuery,
    );
    if (anyActionStillAttached[0].count !== 0) {
        return {
            success: false,
            message:
                'There are actions still attached to this policy. No action can be attached while trying to delete a policy.',
        };
    }
    const deletePolicyQuery: Query = {
        sql: DELETE_SINGLE_POLICY_GIVEN_NAME,
        params: [policyName],
    };
    await db.query(deletePolicyQuery);
    return {
        success: true,
    };
}
