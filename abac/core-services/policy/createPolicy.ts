import {
    ARE_POLICYNAMES_UNIQUE,
    CREATE_POLICIES,
} from '@/abac/core-queries/policies/policies';
import { db } from '@/abac/database';
import {
    ABACRequestResponse,
    Policy,
    Query,
    QueryCount,
} from '@/abac/interface';

export async function createPolicyObject(
    listOfPolicies: Policy[],
): Promise<ABACRequestResponse> {
    const policyNames = listOfPolicies.map(pol => pol.policyName);
    if (new Set(policyNames).size !== policyNames.length) {
        return {
            success: false,
            message: `Some policyNames have been duplicated in the payload.`,
        };
    }
    const checkUniquePolicyNames: Query = {
        sql: ARE_POLICYNAMES_UNIQUE(listOfPolicies.length),
        params: policyNames,
    };
    const uniqueResult = await db.query<QueryCount[]>(checkUniquePolicyNames);
    if (uniqueResult[0].count != 0) {
        return {
            success: false,
            message: `One or more policyNames have been taken.`,
        };
    }
    const createPolicyQuery: Query[] = [];
    for (const pol of listOfPolicies) {
        createPolicyQuery.push({
            sql: CREATE_POLICIES,
            params: [
                pol.policyName,
                pol.policyDescription ?? null,
                pol.allow ?? true,
            ],
        });
    }
    await db.executeTransaction(createPolicyQuery);
    return {
        success: true,
    };
}
