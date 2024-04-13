import { CHECK_OWNER_OF_POLICY } from '@/abac/core-queries/user-policies/user-policy';
import { db } from '@/abac/database';
import { ABACRequestResponse, Query, QueryCount } from '@/abac/interface';
import { getAndCheckAbacId } from '../core-services-utils';
import { UPDATE_QUERY_GIVEN_POLICYNAME } from '@/abac/core-queries/policies/policies';
import { ResultSetHeader } from 'mysql2';

export async function updateContextObject(
    contextNameToUpdate: string,
    newContextName: string,
    newContextDescription: string,
    newContextOperator: string,
    newContextEntity: string,
    newTextValue: string | null,
    newTimeValue1: string | null,
    newTimeValue2: string | null,
): Promise<ABACRequestResponse> {}
