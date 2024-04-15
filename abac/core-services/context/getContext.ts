import { db } from '@/abac/database';
import { ABACRequestResponse, Action, Context, Query } from '@/abac/interface';
import {
    GET_ALL_ACTION_GIVEN_CONTEXTID,
    GET_CONTEXT_GIVEN_CONTEXTNAME,
} from '@/abac/core-queries/context/context';

export async function getContextIncludingActions(
    contextName: string,
): Promise<ABACRequestResponse> {
    const contextQuery: Query = {
        sql: GET_CONTEXT_GIVEN_CONTEXTNAME,
        params: [contextName],
    };
    const contextResult = await db.query<Context[]>(contextQuery);
    if (contextResult.length === 0) {
        return { data: {} };
    }
    const actionsQuery: Query = {
        sql: GET_ALL_ACTION_GIVEN_CONTEXTID,
        params: [contextResult[0].id],
    };
    const actionsResult = await db.query<Action[]>(actionsQuery);
    const actionNames = actionsResult.map(action => action.actionName);
    return {
        data: {
            contextResult,
            actionNames,
        },
    };
}
