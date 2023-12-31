export const CHECK_COMPATIBILITY_GIVEN_POLICYIDS = `
SELECT COUNT(*) AS NumberOfIncompatiblePolicies
FROM IncompatiblePolicies
WHERE (policyId1 = ? AND policyId2 = ?)
    OR (policyId1 = ? AND policyId2 = ?);
`;

export const CREATE_INCOMPATIBLE_POLICIES = `
INSERT INTO IncompatiblePolicies (policyId1, policyId2) VALUES (?, ?);
`;

export const DELETE_INCOMPATIBLE_POLICIES = `
DELETE FROM IncompatiblePolicies WHERE (policyId1 = ? AND policyId2 = ?)
    OR (policyId1 = ? AND policyId2 = ?);
`;
