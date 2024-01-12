export const GET_CONTEXT_GIVEN_ID = `
SELECT id, contextDescription, operator, entity, textValue, timeValue1, timeValue2
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
INSERT INTO Context (id, contextDescription, operator, entity, textValue, timeValue1, timeValue2) VALUES (UUID(), ?, ?, ?, ?, ?, ?);
`;

export const UPDATE_CONTEXT_GIVEN_ID = `
UPDATE Context
SET contextDescription = ?, operator = ?, entity = ?, textValue = ?, timeValue1 = ?, timeValue2 = ?
WHERE id = ?;
`;

export const GET_ALL_CONTEXT = `
SELECT id, contextDescription, operator, entity, textValue, timeValue1, timeValue2
FROM Context;
`;

export const GET_CONTEXT_COUNT = `
SELECT COUNT(*) AS count
FROM Context;
`;

export const GET_CONTEXT_VIA_SEARCH = `
SELECT id AS id, contextDescription AS value
FROM Action;
`