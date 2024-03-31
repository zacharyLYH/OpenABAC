import { GET_ALLOW_OR_DISALLOW_POLICIES_PROVIDED_APPLICATIONUSERID } from '@/abac/core-queries/policies/policies';
import { GET_USER_GIVEN_APPLICATIONUSERID } from '@/abac/core-queries/user/user';
import { db } from '@/abac/database';
import { ABACRequestResponse, Policy, Query, User } from '@/abac/interface';

export async function getEntireUserObjProvidedApplicaionUserId(
    applicationUserId: string,
): Promise<ABACRequestResponse> {
    const query: Query = {
        sql: GET_USER_GIVEN_APPLICATIONUSERID,
        params: [applicationUserId],
    };
    const results = await db.query<User[]>(query);
    if (results.length === 0) {
        return {
            success: false,
            data: {},
        };
    }
    const policyQuery: Query = {
        sql: GET_ALLOW_OR_DISALLOW_POLICIES_PROVIDED_APPLICATIONUSERID,
        params: [results[0].id, true],
    };
    const policyQueryResults = await db.query<Policy[]>(policyQuery);
    const policyName = Array.from(
        new Set(policyQueryResults.map(res => res.policyName)),
    );
    return {
        success: true,
        data: {
            id: results[0].id,
            jsonCol: results[0].jsonCol,
            policies: policyName,
        },
    };
}
