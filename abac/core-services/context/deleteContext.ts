import { db } from '@/abac/database';
import {
    ABACRequestResponse,
    Context,
    Query,
    QueryCount,
} from '@/abac/interface';
import {
    CHECK_CONTEXTID_STILL_ATTACHED,
    DELETE_ACTIONCONTEXT_GIVEN_CONTEXTID,
} from '@/abac/core-queries/action-context/action-context';
import { DELETE_CONTEXT_GIVEN_ID, GET_CONTEXT_GIVEN_CONTEXTNAME } from '@/abac/core-queries/context/context';

export async function deleteContextObject(
    contextName: string,
): Promise<ABACRequestResponse> {
    const contextQuery: Query = {
        sql: GET_CONTEXT_GIVEN_CONTEXTNAME,
        params: [contextName],
    };
    const contextResult = await db.query<Context[]>(contextQuery);
    if (contextResult.length === 0) {
        return { 
            success: false,
            message: `${contextName} is not an existing context.` };
    }
    const checkAnyActionsAttached: Query = {
        sql: CHECK_CONTEXTID_STILL_ATTACHED,
        params: [contextResult[0].id],
    };
    const checkAnyActionsAttachedResult = await db.query<QueryCount[]>(
        checkAnyActionsAttached,
    );
    if (checkAnyActionsAttachedResult.length > 0) {
        return {
            success: false,
            message: `There are ${checkAnyActionsAttachedResult.length} actions still attached to ${contextName}. Can't delete action until all context no context is attached to an action.`,
        };
    }
    const deleteActionQuery: Query = {
        sql: DELETE_CONTEXT_GIVEN_ID,
        params: [contextName],
    };
    const deletePolicyActionQuery: Query = {
        sql: DELETE_ACTIONCONTEXT_GIVEN_CONTEXTID,
        params: [contextResult[0].id],
    };
    await db.executeTransaction([
        deleteActionQuery,
        deletePolicyActionQuery,
    ]);
    return {
        success: true,
    };
}
