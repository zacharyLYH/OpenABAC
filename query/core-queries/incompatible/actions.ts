export const CHECK_COMPATIBILITY_GIVEN_ACTIONIDS = `
SELECT COUNT(*) AS NumberOfIncompatibleActions
FROM IncompatibleActions
WHERE (actionId1 = ? AND actionId2 = ?)
    OR (actionId1 = ? AND actionId2 = ?);
`;

export const CREATE_INCOMPATIBLE_ACTIONS = `
INSERT INTO IncompatibleActions (actionId1, actionId2) VALUES (?, ?);
`;

export const DELETE_INCOMPATIBLE_ACTIONS = `
DELETE FROM IncompatibleActions WHERE (actionId1 = ? AND actionId2 = ?)
    OR (actionId1 = ? AND actionId2 = ?);
`;
