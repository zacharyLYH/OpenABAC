export const GET_ACTIONS_PROVIDED_APPLICATIONUSERID = `
SELECT 
a.actionName, a.actionDescription
FROM
User u
    JOIN
UserPolicy up ON u.id = up.abacId
    JOIN
Policy p ON up.policyId = p.id
    JOIN
PolicyAction pa ON p.id = pa.policyId
    JOIN
Action a ON pa.actionId = a.id
WHERE
u.applicationUserId = ?;
`;

export const GET_ACTIONS_WITH_CONTEXT_PROVIDED_APPLICATIONUSERID = `
SELECT 
a.actionName, a.actionDescription, c.contextDescription, c.operator, c.entity, c.textValue, c.timeValue1, c.timeValue2
FROM
User u
    JOIN
UserPolicy up ON u.id = up.abacId
    JOIN
Policy p ON up.policyId = p.id
    JOIN
PolicyAction pa ON p.id = pa.policyId
    JOIN
Action a ON pa.actionId = a.id
    JOIN
ActionContext ac ON a.id = ac.actionId
    JOIN
Context c ON ac.contextId = c.id
WHERE
u.applicationUserId = ?;
`;
