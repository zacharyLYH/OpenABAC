export const GET_POLICIES_PROVIDED_APPLICATIONUSERID = `
SELECT 
p.policyName, p.policyDescription
FROM
User u
    JOIN
UserPolicy up ON u.id = up.abacId
    JOIN
Policy p ON up.policyId = p.id
WHERE
u.applicationUserId = ?;
`;
