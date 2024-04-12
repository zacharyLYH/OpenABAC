export const CREATE_ACTION_CONTEXT = `
INSERT INTO ActionContext (id, actionId, contextId) VALUES (UUID(), ?, ?);
`;

export const DELETE_ACTION_CONTEXT_GIVEN_ACTIONID = `
DELETE FROM ActionContext WHERE actionId = ?;
`;

export const GET_CONTEXTID_GIVEN_ACTIONID = `
SELECT contextId  
FROM ActionContext
WHERE actionId = ?;
`;

export const GET_ALL_CONTEXT_GIVEN_ACTIONID = `
SELECT C.contextName
FROM Context C
JOIN ActionContext AC ON AC.contextId = C.id
WHERE AC.actionId = ?;
`;
