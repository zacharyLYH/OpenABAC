import { db } from '@/abac/database';
import {
    ABACRequestResponse,
    Action,
    Context,
    Policy,
    Query,
} from '@/abac/interface';
import {
    DELETE_POLICY_ACTION_GIVEN_ACTIONID,
    GET_POLICY_GIVEN_ACTION_ID,
} from '@/abac/core-queries/policy-action/policy-action';
import {
    DELETE_ACTION_GIVEN_ACTION_NAME,
    GET_ACTION_GIVEN_ACTIONNAME,
} from '@/abac/core-queries/actions/actions';
import {
    DELETE_ACTION_CONTEXT_GIVEN_ACTIONID,
    GET_ALL_CONTEXT_GIVEN_ACTIONID,
} from '@/abac/core-queries/action-context/action-context';

export async function deleteActionObject(
    actionName: string,
): Promise<ABACRequestResponse> {
    const checkActionExists: Query = {
        sql: GET_ACTION_GIVEN_ACTIONNAME,
        params: [actionName],
    };
    const checkActionExistsResults =
        await db.query<Action[]>(checkActionExists);
    if (checkActionExistsResults.length !== 1) {
        return {
            success: false,
            message: `${actionName} doesn't exist.`,
        };
    }
    const checkAnyPoliciesAttached: Query = {
        sql: GET_POLICY_GIVEN_ACTION_ID,
        params: [checkActionExistsResults[0].id],
    };
    const policies = await db.query<Policy[]>(checkAnyPoliciesAttached);
    if (policies.length > 0) {
        return {
            success: false,
            message: `${actionName} has ${policies.length} policies still attached. Can't delete action until all action isn't attached to any policy.`,
        };
    }
    const anyContextStillAttachedQuery: Query = {
        sql: GET_ALL_CONTEXT_GIVEN_ACTIONID,
        params: [checkActionExistsResults[0].id],
    };
    const anyContextStillAttached = await db.query<Context[]>(
        anyContextStillAttachedQuery,
    );
    if (anyContextStillAttached.length > 0) {
        return {
            success: false,
            message: `There are ${anyContextStillAttached.length} still attached to ${actionName}. Can't delete action until all context no context is attached to an action.`,
        };
    }
    const deleteActionQuery: Query = {
        sql: DELETE_ACTION_GIVEN_ACTION_NAME,
        params: [actionName],
    };
    const deletePolicyActionQuery: Query = {
        sql: DELETE_POLICY_ACTION_GIVEN_ACTIONID,
        params: [checkActionExistsResults[0].id],
    };
    const deleteActionContetQuery: Query = {
        sql: DELETE_ACTION_CONTEXT_GIVEN_ACTIONID,
        params: [checkActionExistsResults[0].id],
    };
    await db.executeTransaction([
        deleteActionQuery,
        deletePolicyActionQuery,
        deleteActionContetQuery,
    ]);
    return {
        success: true,
    };
}
