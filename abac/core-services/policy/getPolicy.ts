import { GET_POLICY_AND_ACTION_VIA_POLICYNAME } from '@/abac/core-queries/policies/policies';
import { db } from '@/abac/database';
import { ABACRequestResponse, Policy, Query } from '@/abac/interface';

export async function getPolicyIncludingActions(
    policyName: string,
): Promise<ABACRequestResponse> {
    const query: Query = {
        sql: GET_POLICY_AND_ACTION_VIA_POLICYNAME,
        params: [policyName],
    };
    const results = await db.query<any>(query);
    const actionsAssociated: string[] = [];
    for (const rows of results) {
        actionsAssociated.push(rows.actionName);
    }
    const policy: Omit<Policy, 'modifiedDate' | 'createdDate'> = {
        id: results[0].id,
        policyName: results[0].policyName,
        policyDescription: results[0].policyDescription,
        allow: results[0].allow,
    };
    return {
        data: {
            policy,
            actionsAssociated,
        },
    };
}
