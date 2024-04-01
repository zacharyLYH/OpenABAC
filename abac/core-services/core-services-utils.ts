import { GET_ID_USING_APPLICATIONUSERID } from '../core-queries/user/user';
import { db } from '../database';
import { Query, User } from '../interface';

export async function getAndCheckAbacId(applicationUserId: string) {
    const getUser: Query = {
        sql: GET_ID_USING_APPLICATIONUSERID,
        params: [applicationUserId],
    };
    const abacId = await db.query<User[]>(getUser);
    if (!abacId) {
        throw Error(`User ${applicationUserId} does not exist in ABAC.`);
    } else {
        return abacId[0].id;
    }
}
