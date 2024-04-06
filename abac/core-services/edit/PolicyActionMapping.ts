import { GET_POLICY_ID_GIVEN_NAME } from '@/abac/core-queries/policies/policies';
import { db } from '@/abac/database';
import {
    ABACRequestResponse,
    Action,
    Policy,
    Query,
    QueryCount,
} from '@/abac/interface';
import { getAndCheckAbacId } from '../core-services-utils';
import { CHECK_OWNER_OF_POLICY } from '@/abac/core-queries/user-policies/user-policy';
import { GET_ACTION_ID_GIVEN_NAME } from '@/abac/core-queries/actions/actions';
import {
    CREATE_POLICY_ACTION,
    DELETE_POLICY_ACTION_GIVEN_POLICYID,
} from '@/abac/core-queries/policy-action/policy-action';

export async function policyActionMapping(
    applicationUserId: string,
    policyName: string,
    actionNames: string[],
): Promise<ABACRequestResponse> {
    if (new Set(actionNames).size !== actionNames.length) {
        return {
            success: false,
            data: `One or more actions are duplicates.`,
        };
    }

    //Check policy exists
    const checkPolicyExist: Query = {
        sql: GET_POLICY_ID_GIVEN_NAME(1),
        params: [policyName],
    };
    const checkPolicyQuery = await db.query<Policy[]>(checkPolicyExist);
    if (checkPolicyQuery.length !== 1) {
        return {
            success: false,
            data: `The policy doesn't exist. Make sure policy exists before attaching an action to it.`,
        };
    }

    //Check policy owner is the abacId
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

    //Check actions exist
    const checkAllActionsExist: Query = {
        sql: GET_ACTION_ID_GIVEN_NAME(actionNames.length),
        params: actionNames,
    };
    const checkAllActionsQuery = await db.query<Action[]>(checkAllActionsExist);
    if (checkAllActionsQuery.length !== actionNames.length) {
        return {
            success: false,
            data: `One or more actions don't exist.`,
        };
    }

    const actionNameToIdMap: Map<string, string> = new Map();

    checkAllActionsQuery.forEach(action => {
        actionNameToIdMap.set(action.actionName, action.id);
    });

    const upsertPolicyActionTxn: Query[] = [
        {
            sql: DELETE_POLICY_ACTION_GIVEN_POLICYID,
            params: [checkPolicyQuery[0].id],
        },
    ];
    for (const name of actionNames) {
        upsertPolicyActionTxn.push({
            sql: CREATE_POLICY_ACTION,
            params: [checkPolicyQuery[0].id, actionNameToIdMap.get(name)],
        });
    }
    await db.executeTransaction(upsertPolicyActionTxn);
    return {
        success: true,
        data: actionNames,
    };
}
