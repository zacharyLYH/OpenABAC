export const CREATE_ACTION_CONTEXT = `
INSERT INTO ActionContext (actionId, contextId) VALUES (?, ?);
`;

export const DELETE_ACTION_CONTEXT_GIVEN_ACTIONID = `
DELETE FROM ActionContext WHERE actionId = ?;
`;

export const GET_CONTEXT_GIVEN_ACTIONID = `
SELECT contextId  
FROM ActionContext
WHERE actionId = ?;
`;
