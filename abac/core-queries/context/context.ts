export const GET_CONTEXT_GIVEN_ID = `
SELECT id, contextName, contextDescription, operator, entity, textValue, timeValue1, timeValue2
FROM Context
WHERE id = ?;
`;

export const DELETE_CONTEXT_GIVEN_ID = `
DELETE FROM Context WHERE id = ?;
`;

export const IS_CONTEXT_UNIQUE = `
SELECT id
FROM Context
WHERE operator = ? AND entity = ? AND textValue = ? AND timeValue1 = ? AND timeValue2 = ?;
`;

export const CREATE_CONTEXT = `
INSERT INTO Context (id, contextName, contextDescription, operator, entity, textValue, timeValue1, timeValue2) VALUES (UUID(), ?, ?, ?, ?, ?, ?, ?);
`;

export const UPDATE_CONTEXT_GIVEN_CONTEXTNAME = `
UPDATE Context
SET contextName = ?, contextDescription = ?, operator = ?, entity = ?, textValue = ?, timeValue1 = ?, timeValue2 = ?
WHERE contextName = ?;
`;

export const GET_ALL_CONTEXT = `
SELECT id, contextName, contextDescription, operator, entity, textValue, timeValue1, timeValue2
FROM Context;
`;

export const GET_CONTEXT_COUNT = `
SELECT COUNT(*) AS count
FROM Context;
`;

export const GET_CONTEXT_VIA_SEARCH = `
SELECT id AS id, contextName AS value
FROM Context;
`;

export const GET_ALL_CONTEXT_GIVEN_ACTION_ID = `
SELECT contextDescription, operator, entity, textValue, timeValue1, timeValue2
FROM Context
JOIN ContextAction ca ON ca.actionId = ?
`;

export function GET_CONTEXT_ID_GIVEN_NAME(paramNumber: number) {
    const base = `SELECT id, contextName FROM Context WHERE contextName in `;
    const placeholders = Array(paramNumber).fill('?').join(', ');
    const query = `${base}(${placeholders})`;
    return query;
}

export function ARE_CONTEXTNAMES_UNIQUE(paramNumber: number) {
    let base = `
SELECT COUNT(*) AS count
FROM Context
WHERE contextName in
`;
    const placeholders = Array(paramNumber).fill('?').join(', ');
    const query = `${base}(${placeholders})`;
    return query;
}

export const GET_CONTEXT_GIVEN_CONTEXTNAME = `
SELECT * FROM Context
WHERE contextName = ?;
`;

export const GET_ALL_ACTION_GIVEN_CONTEXTID = `
SELECT actionName
FROM Action
JOIN ContextAction ca ON ca.contextId = ?
`;
