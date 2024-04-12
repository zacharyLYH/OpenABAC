import { ARE_CONTEXTNAMES_UNIQUE, CREATE_CONTEXT } from '@/abac/core-queries/context/context';
import { db } from '@/abac/database';
import {
    ABACRequestResponse,
    Context,
    Query,
    QueryCount,
} from '@/abac/interface';
import { validateContext } from './contextValidator';

export async function createContextObject(
    listOfContexts: Context[],
): Promise<ABACRequestResponse> {
    const contextNames = listOfContexts.map(pol => pol.contextName);
    if (new Set(contextNames).size !== listOfContexts.length) {
        return {
            success: false,
            message: `Some contextNames have been duplicated in the payload.`,
        };
    }
    const checkUniqueContextNames: Query = {
        sql: ARE_CONTEXTNAMES_UNIQUE(listOfContexts.length),
        params: contextNames,
    };
    const uniqueResult = await db.query<QueryCount[]>(checkUniqueContextNames);
    if (uniqueResult[0].count !== 0) {
        return {
            success: false,
            message: `One or more contextNames have been taken.`,
        };
    }
    const createContextQuery: Query[] = [];
    for (const ctx of listOfContexts) {
        const validContext = validateContext(ctx)
        if(!validContext.success){
            return validContext
        }
        createContextQuery.push({
            sql: CREATE_CONTEXT,
            params: [
                ctx.contextName,
                ctx.contextDescription ?? null,
                ctx.operator,
                ctx.entity,
                ctx.textValue ?? null,
                ctx.timeValue1 ?? null,
                ctx.timeValue2 ?? null
            ],
        });
    }
    await db.executeTransaction(createContextQuery);
    return {
        success: true,
        data: listOfContexts
    };
}
