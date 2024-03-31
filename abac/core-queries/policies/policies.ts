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
u.id = ? and p.allow = ?;
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
`;

export const GET_ALL_POLICIES = `
SELECT 
    id, 
    policyName, 
    policyDescription, 
    modifiedDate,
    CASE 
        WHEN allow THEN 'Allow List' 
        ELSE 'Deny List' 
    END AS allow
FROM Policy;
`;

export const GET_POLICY_COUNT = `
SELECT COUNT(*) AS count
FROM Policy;
`;

export const GET_POLICY_VIA_SEARCH = `
SELECT id AS id, policyName AS value
FROM Policy;
`;

export const GET_POLICY_BY_ID = `
SELECT policyName, policyDescription, allow, modifiedDate
FROM Action
WHERE ID = ?;
`;
