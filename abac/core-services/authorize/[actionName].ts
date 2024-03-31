import { CHECK_IF_USER_HAS_THIS_ACTION } from '@/abac/core-queries/actions/actions';
import { db } from '@/abac/database';
import { ABACRequestResponse, Action, Query } from '@/abac/interface';

export async function authorizeActionNameGivenApplicationUserId(
    applicationUserId: string,
    actionName: string,
): Promise<ABACRequestResponse> {
    const query: Query = {
        sql: CHECK_IF_USER_HAS_THIS_ACTION,
        params: [applicationUserId, actionName],
    };
    const results = await db.query<Action[]>(query);
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
    /*
    Do context filtering logic here.
    */
}
