export const GET_ALLOWED_OR_DISALLOWED_ACTIONS_PROVIDED_APPLICATIONUSERID = `
SELECT 
a.actionName, a.actionDescription
FROM
User u
    JOIN
UserPolicy up ON u.id = up.abacId
    JOIN
Policy p ON up.policyId = p.id
    JOIN
PolicyAction pa ON p.id = pa.policyId
    JOIN
Action a ON pa.actionId = a.id
WHERE
u.applicationUserId = ? AND p.allow = ?;
`;

export const GET_ALLOWED_OR_DISALLOWED_ACTIONS_WITH_CONTEXT_PROVIDED_APPLICATIONUSERID = `
SELECT 
a.actionName, a.actionDescription, c.contextDescription, c.operator, c.entity, c.textValue, c.timeValue1, c.timeValue2
FROM
User u
    JOIN
UserPolicy up ON u.id = up.abacId
    JOIN
Policy p ON up.policyId = p.id
    JOIN
PolicyAction pa ON p.id = pa.policyId
    JOIN
Action a ON pa.actionId = a.id
    JOIN
ActionContext ac ON a.id = ac.actionId
    JOIN
Context c ON ac.contextId = c.id
WHERE
u.applicationUserId = ? AND  p.allow = ?;
`;

export const DELETE_ACTIONS_GIVEN_ID = `
DELETE FROM Action WHERE id = ?;
`;

export const CREATE_ACTIONS = `
INSERT INTO Action (id, actionName, actionDescription) VALUES (UUID(), ?, ?);
`;

export const IS_ACTIONNAME_UNIQUE = `
SELECT COUNT(*) AS count
FROM Action
WHERE actionName = ?;
`;

export const GET_NUMBER_OF_ACTIONS = `
SELECT COUNT(*) AS count
FROM Action;
`;

export const GET_ALL_ACTIONS = `
SELECT id, actionName, actionDescription, modifiedDate
FROM Action;
`;

export const GET_ACTION_COUNT = `
SELECT COUNT(*) AS count
FROM Action;
`;

export const GET_ACTION_VIA_SEARCH = `
SELECT id AS id, actionName AS value
FROM Action;
`;

//Untested
export const GET_ACTION_BY_ID = `
SELECT actionName, actionDescription, modifiedDate
FROM Action
WHERE ID = ?;
`;

export const CHECK_IF_USER_HAS_THIS_ACTION = `
SELECT 
    a.id, a.actionName, a.actionDescription
FROM
    User u
        JOIN
    UserPolicy up ON u.id = up.abacId
        JOIN
    Policy p ON up.policyId = p.id
        JOIN
    PolicyAction pa ON p.id = pa.policyId
        JOIN
    Action a ON pa.actionId = a.id
WHERE
    u.applicationUserId = ? AND a.actionName = ? AND p.allow = true;
`;

export const CHECK_IF_USER_HAS_THIS_ACTION_USING_ABACID = `
SELECT COUNT(DISTINCT a.id) AS count
FROM
    UserPolicy up
        JOIN
    Policy p ON up.policyId = p.id
        JOIN
    PolicyAction pa ON p.id = pa.policyId
        JOIN
    Action a ON pa.actionId = a.id
WHERE
    up.abacId = ? AND a.actionName = ?;
`;

export const AUTHORIZE_ACTIONS_SUDO = `
SELECT 
    a.actionName, a.actionDescription
FROM
    Action a
WHERE
    a.actionName = ?;
`;

export function GET_ACTION_ID_GIVEN_NAME(paramNumber: number) {
    const base = `SELECT id, actionName FROM Action WHERE actionName in `;
    const placeholders = Array(paramNumber).fill('?').join(', ');
    const query = `${base}(${placeholders})`;
    return query;
}

export function ARE_ACTIONNAMES_UNIQUE(paramNumber: number) {
    let base = `
SELECT COUNT(*) AS count
FROM Action
WHERE actionName in
`;
    const placeholders = Array(paramNumber).fill('?').join(', ');
    const query = `${base}(${placeholders})`;
    return query;
}

export const GET_ACTION_GIVEN_ACTIONNAME = `
SELECT id, actionName, actionDescription
FROM Action
WHERE actionName = ?;
`;

export const UPDATE_ACTION_GIVEN_ACTIONNAME = `
UPDATE Action Set actionName = ?, actionDescription = ?
WHERE actionName = ?;
`;

export const DELETE_ACTION_GIVEN_ACTION_NAME = `
DELETE FROM Action
WHERE actionName = ?; 
`;
