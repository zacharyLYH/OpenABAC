import { db } from '@/abac/database';
import { ABACRequestResponse, Context, Query,  } from '@/abac/interface';
import { GET_CONTEXT_GIVEN_CONTEXTNAME, UPDATE_CONTEXT_GIVEN_CONTEXTNAME } from '@/abac/core-queries/context/context';
import { validateContext } from './contextValidator';

export async function updateContextObject(
    contextNameToUpdate: string,
    newContextName: string,
    newContextDescription: string,
    newContextOperator: string,
    newContextEntity: string,
    newTextValue: string | null,
    newTimeValue1: string | null,
    newTimeValue2: string | null,
): Promise<ABACRequestResponse> {
    const validContext = validateContext({
        contextName: newContextName,
        contextDescription: newContextDescription,
        operator: newContextOperator,
        entity: newContextEntity,
        textValue: newTextValue,
        timeValue1: newTimeValue1,
        timeValue2: newTimeValue2
    })
    if(!validContext.success){
        return validContext
    }
    const contextQuery: Query = {
        sql: GET_CONTEXT_GIVEN_CONTEXTNAME,
        params: [contextNameToUpdate],
    };
    const contextResult = await db.query<Context[]>(contextQuery);
    if (contextResult.length === 0) {
        return { 
            success: false,
            message: `${contextNameToUpdate} is not an existing context.` };
    }
    const updateContextQuery: Query = {
        sql: UPDATE_CONTEXT_GIVEN_CONTEXTNAME,
        params: [
            newContextName,
            newContextDescription,
            newContextOperator,
            newContextEntity,
            newTextValue,
            newTimeValue1,
            newTimeValue2
        ],
    };
    await db.query(updateContextQuery);
    return {
        success: true,
    };
}
