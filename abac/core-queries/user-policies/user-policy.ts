export const CREATE_USER_POLICY = `
INSERT INTO UserPolicy (abacId, policyId) VALUES (?, ?);
`;

export const GET_POLICIES_GIVEN_ABACID = `
SELECT policyId
FROM UserPolicy
WHERE abacId = ?;
`;

export const DELETE_USER_POLICY_GIVEN_ABACID = `
DELETE FROM UserPolicy WHERE abacId = ?;
`;

export const CREATE_USER_POLICY_GIVEN_ABACID = `
INSERT INTO UserPolicy (id, abacId, policyId) VALUES (UUID(), ?, ?);
`;
