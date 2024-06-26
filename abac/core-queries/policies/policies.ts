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

export function ARE_POLICYNAMES_UNIQUE(paramNumber: number) {
    let base = `
SELECT COUNT(*) AS count
FROM Policy
WHERE policyName in
`;
    const placeholders = Array(paramNumber).fill('?').join(', ');
    const query = `${base}(${placeholders})`;
    return query;
}

export const GET_POLICY_GIVEN_ID = `
SELECT policyName, policyDescription
FROM Policy
WHERE id = ?;
`;

export const DELETE_SINGLE_POLICY_GIVEN_NAME = `
DELETE FROM Policy WHERE policyName = ?;
`;

export function DELETE_POLICIES_GIVEN_NAME(paramNumber: number) {
    const base = `
DELETE FROM Policy WHERE policyName in (?);
`;
    const placeholders = Array(paramNumber).fill('?').join(', ');
    const query = `${base}(${placeholders})`;
    return query;
}

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

export function CHECK_POLICIES_EXIST_BY_POLICYNAME(paramNumber: number) {
    let base = `
SELECT count(*) as count from Policy where 
policyName in 
`;
    const placeholders = Array(paramNumber).fill('?').join(', ');
    const query = `${base}(${placeholders})`;
    return query;
}

export function GET_POLICY_ID_GIVEN_NAME(paramNumber: number) {
    const base = `
        SELECT policyName, id from Policy where
        policyName in
    `;
    const placeholders = Array(paramNumber).fill('?').join(', ');
    const query = `${base}(${placeholders})`;
    return query;
}

//doesn't work. if a policy has no action, this query will not even return the policy
export const GET_POLICY_AND_ACTION_VIA_POLICYNAME = ` 
SELECT P.id, P.policyName, P.policyDescription, P.allow, A.actionName
FROM Policy P
JOIN PolicyAction Pa on Pa.policyId = P.id
JOIN Action A on A.id = Pa.actionId
WHERE P.policyName = ?;
`;

export const UPDATE_QUERY_GIVEN_POLICYNAME = `
UPDATE Policy
SET policyName = ?, policyDescription = ?, allow = ?
WHERE policyName = ?;
`;

export const GET_POLICY_GIVEN_POLICYNAME = `
SELECT id, policyDescription
FROM Policy
WHERE policyName = ?;
`;
