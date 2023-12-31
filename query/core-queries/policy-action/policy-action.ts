export const CREATE_POLICY_ACTION = `
INSERT INTO PolicyAction (policyId, actionId) VALUES (?, ?);
`;

export const DELETE_POLICY_ACTION_GIVEN_POLICYID = `
DELETE FROM PolicyAction WHERE policyId = ?;
`;

export const DELETE_POLICY_ACTION_GIVEN_ACTIONID = `
DELETE FROM PolicyAction WHERE actionId = ?;
`;

export const GET_POLICY_ACTION_GIVEN_POLICYID = `
SELECT actionId
FROM PolicyAction
WHERE policyId = ?;
`;
