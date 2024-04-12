import { db } from '@/abac/database';
import {
    ABACRequestResponse,
    Action,
    Query,
    QueryCount,
} from '@/abac/interface';
import {
    GET_ACTION_GIVEN_ACTIONNAME,
    UPDATE_ACTION_GIVEN_ACTIONNAME,
} from '@/abac/core-queries/actions/actions';

/*
This api should be ran by the host app.
*/
export async function updateActionObject(
    actionNameToUpdate: string,
    newActionName: string,
    newActionDescription: string,
): Promise<ABACRequestResponse> {
    const checkActionExists: Query = {
        sql: GET_ACTION_GIVEN_ACTIONNAME,
        params: [actionNameToUpdate],
    };
    const checkActionExistsResults =
        await db.query<Action[]>(checkActionExists);
    if (checkActionExistsResults.length !== 1) {
        return {
            success: false,
            message: `${actionNameToUpdate} doesn't exist.`,
        };
    }
    const updateActionQuery: Query = {
        sql: UPDATE_ACTION_GIVEN_ACTIONNAME,
        params: [newActionName, newActionDescription, actionNameToUpdate],
    };
    await db.query(updateActionQuery);
    return {
        success: true,
        data: {
            policyName: newActionName,
            policyDescription: newActionDescription,
        },
    };
}
