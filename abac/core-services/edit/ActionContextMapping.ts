import { db } from '@/abac/database';
import {
    ABACRequestResponse,
    Action,
    Context,
    Query,
} from '@/abac/interface';
import { GET_ACTION_GIVEN_ACTIONNAME,  } from '@/abac/core-queries/actions/actions';
import { GET_CONTEXT_ID_GIVEN_NAME } from '@/abac/core-queries/context/context';
import { CREATE_ACTION_CONTEXT, DELETE_ACTION_CONTEXT_GIVEN_ACTIONID } from '@/abac/core-queries/action-context/action-context';

export async function actionContextMapping(
    actionName: string,
    contextNames: string[],
): Promise<ABACRequestResponse> {
    if (new Set(contextNames).size !== contextNames.length) {
        return {
            success: false,
            data: `One or more context are duplicates.`,
        };
    }

    //Check action exists
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

    //Check context exist
    const checkAllContextsExist: Query = {
        sql: GET_CONTEXT_ID_GIVEN_NAME(contextNames.length),
        params: contextNames,
    };
    const checkAllContextQuery = await db.query<Context[]>(checkAllContextsExist);
    if (checkAllContextQuery.length !== contextNames.length) {
        return {
            success: false,
            data: `One or more context don't exist.`,
        };
    }

    const contextNameToIdMap: Map<string, string> = new Map();

    checkAllContextQuery.forEach(ctx => {
        contextNameToIdMap.set(ctx.contextName, ctx.id!);
    });

    const upsertActionContextTxn: Query[] = [
        {
            sql: DELETE_ACTION_CONTEXT_GIVEN_ACTIONID,
            params: [checkActionExistsResults[0].id],
        },
    ];
    for (const name of contextNames) {
        upsertActionContextTxn.push({
            sql: CREATE_ACTION_CONTEXT,
            params: [checkActionExistsResults[0].id, contextNameToIdMap.get(name)],
        });
    }
    await db.executeTransaction(upsertActionContextTxn);
    return {
        success: true,
        data: contextNames,
    };
}
