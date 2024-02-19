'use server';

import { db } from '@/abac/database';
import { Context, Query } from '@/abac/interface';
import { CREATE_CONTEXT } from '@/abac/core-queries/context/context';

export const createContext = async (context: Context) => {
    const query: Query = {
        sql: CREATE_CONTEXT,
        params: [
            context.contextDescription,
            context.operator,
            context.entity,
            context.textValue ?? null,
            context.timeValue1 ?? null,
            context.timeValue2 ?? null,
        ],
    };
    const results = await db.query<Context[]>(query);
    return results;
};
