import { db } from '@/abac/database';
import {
    ABACRequestResponse,
    Context,
    Policy,
    Query,
    QueryCount,
} from '@/abac/interface';
import { getAndCheckAbacId } from '../core-services-utils';
import { GET_POLICY_GIVEN_ACTION_ID } from '@/abac/core-queries/policy-action/policy-action';
import {
    CHECK_IF_USER_HAS_THIS_ACTION_USING_ABACID,
    GET_ACTION_GIVEN_ACTIONNAME,
} from '@/abac/core-queries/actions/actions';
import { GET_CONTEXT_GIVEN_ID } from '@/abac/core-queries/context/context';

export async function getActionIncludingPolicyAndContext(
    actionName: string,
    applicationUserId: string,
): Promise<ABACRequestResponse> {
    const abacId = await getAndCheckAbacId(applicationUserId);
    const checkOwnerOfAction: Query = {
        sql: CHECK_IF_USER_HAS_THIS_ACTION_USING_ABACID,
        params: [abacId, actionName],
    };
    const ownerOfActionQuery = await db.query<QueryCount[]>(checkOwnerOfAction);
    if (ownerOfActionQuery[0].count !== 1) {
        return {
            success: false,
            message: `This user doesn't own the ${actionName} action.`,
        };
    }
    const actionQuery: Query = {
        sql: GET_ACTION_GIVEN_ACTIONNAME,
        params: [actionName],
    };
    const actionResult = await db.query<Policy[]>(actionQuery);
    if (actionResult.length === 0) {
        return { data: {} };
    }
    //Get associated policyNames
    const policiessQuery: Query = {
        sql: GET_POLICY_GIVEN_ACTION_ID,
        params: [actionResult[0].id],
    };
    const policiesResult = await db.query<Policy[]>(policiessQuery);
    const policyList = policiesResult.map(pol => pol.policyName);
    //Get associated contextNames
    const contextQuery: Query = {
        sql: GET_CONTEXT_GIVEN_ID,
        params: [actionResult[0].id],
    };
    const contextResult = await db.query<Context[]>(contextQuery);
    const contextList = contextResult.map(con => con.contextName);
    return {
        data: {
            actionResult,
            policyList,
            contextList,
        },
    };
}
