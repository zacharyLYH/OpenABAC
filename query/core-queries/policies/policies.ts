export const GET_ALLOW_OR_DISALLOW_POLICIES_PROVIDED_APPLICATIONUSERID = `
SELECT 
p.policyName, p.policyDescription
FROM
User u
    JOIN
UserPolicy up ON u.id = up.abacId
    JOIN
Policy p ON up.policyId = p.id
WHERE
u.applicationUserId = ?, p.allow = ?;
`;

export const IS_POLICYNAME_UNIQUE = `
SELECT COUNT(*) AS count
FROM Policy
WHERE policyName = ?;
`;

export const GET_POLICY_GIVEN_ID = `
SELECT policyName, policyDescription
FROM Policy
WHERE id = ?;
`;

export const DELETE_POLICIES_GIVEN_ID = `
DELETE FROM Policy WHERE id = ?;
`;

export const CREATE_POLICIES = `
INSERT INTO Policy (id, policyName, policyDescription, allow) VALUES (UUID(), ?, ?, ?);
`;

export const GET_NUMBER_OF_POLICIES = `
SELECT COUNT(*) AS count
FROM Policy;
`
