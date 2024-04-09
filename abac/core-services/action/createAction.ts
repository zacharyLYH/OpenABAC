import {
    ARE_ACTIONNAMES_UNIQUE,
    CREATE_ACTIONS,
} from '@/abac/core-queries/actions/actions';
import { db } from '@/abac/database';
import {
    ABACRequestResponse,
    Action,
    Query,
    QueryCount,
} from '@/abac/interface';

export async function createActionObject(
    listOfActions: Action[],
): Promise<ABACRequestResponse> {
    const actionNames = listOfActions.map(ac => ac.actionName);
    if (new Set(actionNames).size !== listOfActions.length) {
        return {
            success: false,
            message: `Some actionNames have been duplicated in the payload.`,
        };
    }
    const checkUniqueActionNames: Query = {
        sql: ARE_ACTIONNAMES_UNIQUE(listOfActions.length),
        params: actionNames,
    };
    const uniqueResult = await db.query<QueryCount[]>(checkUniqueActionNames);
    if (uniqueResult[0].count != 0) {
        return {
            success: false,
            message: `One or more actionNames have been taken.`,
        };
    }
    const createActionQuery: Query[] = [];
    for (const ac of listOfActions) {
        createActionQuery.push({
            sql: CREATE_ACTIONS,
            params: [ac.actionName, ac.actionDescription ?? null],
        });
    }
    await db.executeTransaction(createActionQuery);
    return {
        success: true,
    };
}
