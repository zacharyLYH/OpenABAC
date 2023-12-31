export const GET_USER_GIVEN_APPLICATIONID = `
SELECT id, jsonCol
WHERE applicationId = ?;
`;

export const GET_USER_GIVEN_ID = `
SELECT applicationId, jsonCol
WHERE id = ?;
`;

export const IS_USER_APPLICATIONID_UNIQUE = `
SELECT COUNT(*) AS count
FROM User
WHERE applicationId = ?;
`;

export const CREATE_USER = `
INSERT INTO User (id, applicationId, jsonCol) VALUES (UUID(), ?, ?);
`;

export const DELETE_USER_GIVEN_APPLICATIONID = `
DELETE FROM User WHERE applicationId = ?;
`;

export const UPDATE_USER_GIVEN_ID = `
UPDATE User
SET jsonCol = ?, applicationId = ?
WHERE id = ?;
`;

export const UPDATE_USER_GIVEN_APPLICATIONID = `
UPDATE User
SET jsonCol = ?
WHERE applicationId = ?;
`;
