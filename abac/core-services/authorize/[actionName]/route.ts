import {
    AUTHORIZE_ACTIONS_SUDO,
    AUTHORIZE_ACTIONS_WITH_CONTEXT_CHECK,
} from '@/abac/core-queries/actions/actions';
import { GET_ALL_CONTEXT_GIVEN_ACTION_ID } from '@/abac/core-queries/context/context';
import { db } from '@/abac/database';
import { ABACRequestResponse, Action, Query } from '@/abac/interface';

export async function authorizeActionNameGivenApplicationUserId(
    applicationUserId: string,
    actionName: string,
): Promise<ABACRequestResponse> {
    if (applicationUserId === 'sudo') {
        const queryForSudo: Query = {
            sql: AUTHORIZE_ACTIONS_SUDO,
            params: [actionName],
        };
        const results = await db.query<Action[]>(queryForSudo);
        console.log(results);
        if (results.length > 0) {
            return {
                authorized: true,
            };
        } else {
            return {
                authorized: false,
                message: 'This actionName does not exist.',
            };
        }
    } else {
        const query1: Query = {
            sql: AUTHORIZE_ACTIONS_WITH_CONTEXT_CHECK,
            params: [applicationUserId, actionName],
        };
        const authorizedAction = await db.query<Action[]>(query1);
        if (authorizedAction.length > 1) {
            const query2: Query = {
                sql: GET_ALL_CONTEXT_GIVEN_ACTION_ID,
                params: [authorizedAction[0].id],
            };
            const allContext = await db.query<Action[]>(query2);
            /*
            context logic in another file
            */
        } else {
            return {
                authorized: false,
                message: 'User not authorized to perform this action.',
                statusCode: 401,
            };
        }
    }
    return {};
}
