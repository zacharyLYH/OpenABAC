import { CHECK_IF_USER_HAS_THIS_ACTION } from '@/abac/core-queries/actions/actions';
import { GET_ALL_CONTEXT_GIVEN_ACTION_ID } from '@/abac/core-queries/context/context';
import { GET_JSON_COL_USING_APPLICATIONUSERID } from '@/abac/core-queries/user/user';
import { db } from '@/abac/database';
import {
    ABACRequestResponse,
    Action,
    Context,
    Query,
    User,
} from '@/abac/interface';
import { validateContext } from '../context/contextValidator';

/*
Provide: applicationUserId, actionName
1. Query the requested actionName with the applicationUserId to find a record that matches.
2. If such a record exists, for this action, find all the associated contexts
3. Get the jsonCol object from the user
4. For each context, take the entity property and find it in jsonCol. If found, depending on the operator, perform checks.
*/
export async function authorizeActionNameGivenApplicationUserId(
    applicationUserId: string,
    actionName: string,
): Promise<ABACRequestResponse> {
    const query: Query = {
        sql: CHECK_IF_USER_HAS_THIS_ACTION,
        params: [applicationUserId, actionName],
    };
    const action = await db.query<Action[]>(query);
    if (action.length === 0) {
        return {
            authorized: false,
            message: 'This actionName does not exist.',
        };
    }
    /*
    Do context filtering logic here.
    */
    const userQuery: Query = {
        sql: GET_JSON_COL_USING_APPLICATIONUSERID,
        params: [applicationUserId],
    };
    const user = (await db.query<User[]>(userQuery))[0];
    const contextAssociatedQuery: Query = {
        sql: GET_ALL_CONTEXT_GIVEN_ACTION_ID,
        params: [action[0].id],
    };
    const contextAssociated = await db.query<Context[]>(contextAssociatedQuery);
    if (!user.jsonCol && contextAssociated.length > 0) {
        return {
            authorized: false,
            message: `The user has no jsonCol but the action requested has contexts the user needs to fulfill.`,
        };
    }
    for (const ctx of contextAssociated) {
        const validate = validateContext(ctx);
        if (!validate.success) {
            return {
                authorized: false,
                ...validate,
            };
        }
        //BETWEEN is a special case that doesn't use any entityValue. It checks against the server's current time.
        if (ctx.operator === 'BETWEEN') {
            const currentTime = new Date();

            const timeValue1 = ctx.timeValue1 ? new Date(ctx.timeValue1) : null;
            const timeValue2 = ctx.timeValue2 ? new Date(ctx.timeValue2) : null;

            if (
                !(
                    timeValue1 instanceof Date &&
                    !isNaN(timeValue1.getTime()) &&
                    timeValue2 instanceof Date &&
                    !isNaN(timeValue2.getTime()) &&
                    currentTime > timeValue1 &&
                    currentTime < timeValue2
                )
            ) {
                return {
                    authorized: false,
                    message: `For the context ${ctx.contextName}, the currentTime is ${currentTime}, timeValue1 = ${timeValue1}, timeValue2 = ${timeValue2}. BETWEEN clause failed.`,
                };
            }
            continue;
        }
        const entityValue = user.jsonCol[ctx.entity];
        if (!entityValue) {
            return {
                authorized: false,
                message: `A required entity ${ctx.entity} from context ${ctx.contextName} for the requested action is missing.`,
            };
        }
        if (['>', '<', '>=', '<=', '==', '!='].includes(ctx.operator)) {
            const valueToCompare = ctx.timeValue1
                ? ctx.timeValue1
                : ctx.textValue;
            if (!valueToCompare) {
                return {
                    authorized: false,
                    message: `For the context ${ctx.contextName}, the operator is ${ctx.operator} but timeValue1 = "${ctx.timeValue1}" and textValue = "${ctx.textValue}". Either one must be provided if the operator is ${ctx.operator}.`,
                };
            }
            if (ctx.operator === '>') {
                if (!(valueToCompare > entityValue)) {
                    return {
                        authorized: false,
                        message: `For the context ${ctx.contextName}, ${valueToCompare} ${ctx.operator} ${entityValue}; as such the authorization failed.`,
                    };
                }
            } else if (ctx.operator === '<') {
                if (!(valueToCompare < entityValue)) {
                    return {
                        authorized: false,
                        message: `For the context ${ctx.contextName}, ${valueToCompare} ${ctx.operator} ${entityValue}; as such the authorization failed.`,
                    };
                }
            } else if (ctx.operator === '>=') {
                if (!(valueToCompare >= entityValue)) {
                    return {
                        authorized: false,
                        message: `For the context ${ctx.contextName}, ${valueToCompare} ${ctx.operator} ${entityValue}; as such the authorization failed.`,
                    };
                }
            } else if (ctx.operator === '<=') {
                if (!(valueToCompare <= entityValue)) {
                    return {
                        authorized: false,
                        message: `For the context ${ctx.contextName}, ${valueToCompare} ${ctx.operator} ${entityValue}; as such the authorization failed.`,
                    };
                }
            } else if (ctx.operator === '==') {
                if (!(valueToCompare == entityValue)) {
                    return {
                        authorized: false,
                        message: `For the context ${ctx.contextName}, ${valueToCompare} ${ctx.operator} ${entityValue}; as such the authorization failed.`,
                    };
                }
            } else if (ctx.operator === '!=') {
                if (!(valueToCompare != entityValue)) {
                    return {
                        authorized: false,
                        message: `For the context ${ctx.contextName}, ${valueToCompare} ${ctx.operator} ${entityValue}; as such the authorization failed.`,
                    };
                }
            } else {
                return {
                    authorized: false,
                    message: `For the context ${ctx.contextName}, there is an unknown operator ${ctx.operator}.`,
                };
            }
            continue;
        }
        if (ctx.operator === 'IN') {
            let valueToCompare: string[];
            if (ctx.textValue) {
                if (!ctx.textValue.trim()) {
                    valueToCompare = [];
                }
                const items = ctx.textValue.split(',');
                const trimmedItems = items.map(item => item.trim());
                const nonEmptyItems = trimmedItems.filter(item => item !== '');
                valueToCompare = nonEmptyItems;
            } else {
                return {
                    authorized: false,
                    message: `For the context ${ctx.contextName}, the operator is ${ctx.operator} but textValue = ${ctx.textValue}. textValue must be provided if the operator is ${ctx.operator}.`,
                };
            }
            if (!valueToCompare.includes(entityValue)) {
                return {
                    authorized: false,
                    message: `For the context ${ctx.contextName}, the operator is ${ctx.operator} but textValue = ${ctx.textValue} and entity value from jsonCol is "${entityValue}". The entity value must be found in the list of textValues otherwise authorization fails.`,
                };
            }
        }
    }
    return {
        authorized: true,
    };
}
