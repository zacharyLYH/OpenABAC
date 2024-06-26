export const CREATE_POLICY_ACTION = `
INSERT INTO PolicyAction (id, policyId, actionId) VALUES (UUID(), ?, ?);
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

export const DOES_POLICY_HAVE_ANY_ACTION_ATTACHED = `
SELECT count(*) as count
FROM PolicyAction
WHERE policyId = ?;
`;

export const GET_ACTIONS_GIVEN_POLICY_ID = `
SELECT A.actionName
FROM PolicyAction PA
JOIN Action A on A.id = PA.actionId
WHERE PA.policyId = ?
`;

export const GET_POLICY_GIVEN_ACTION_ID = `
SELECT P.policyName
FROM PolicyAction PA
JOIN Policy P on P.id = PA.policyId
WHERE PA.actionId = ?
`;
