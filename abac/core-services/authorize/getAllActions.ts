import { GET_ALLOWED_OR_DISALLOWED_ACTIONS_PROVIDED_APPLICATIONUSERID } from '@/abac/core-queries/actions/actions';
import { db } from '@/abac/database';
import { ABACRequestResponse, Action, Query } from '@/abac/interface';

export async function getAllAllowedActionsProvidedApplicationUserId(
    applicationUserId: string,
): Promise<ABACRequestResponse> {
    const query: Query = {
        sql: GET_ALLOWED_OR_DISALLOWED_ACTIONS_PROVIDED_APPLICATIONUSERID,
        params: [applicationUserId, true],
    };
    const results = await db.query<Action[]>(query);
    return {
        actions: Array.from(new Set(results.map(action => action.actionName))),
    };
}
