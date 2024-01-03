export const GET_USER_GIVEN_APPLICATIONUSERID = `
SELECT id, jsonCol
WHERE applicationUserId = ?;
`;

export const GET_USER_GIVEN_ID = `
SELECT applicationUserId, jsonCol
WHERE id = ?;
`;

export const IS_USER_APPLICATIONUSERID_UNIQUE = `
SELECT COUNT(*) AS count
FROM User
WHERE applicationUserId = ?;
`;

export const CREATE_USER = `
INSERT INTO User (id, applicationUserId, jsonCol) VALUES (UUID(), ?, ?);
`;

export const DELETE_USER_GIVEN_APPLICATIONUSERID = `
DELETE FROM User WHERE applicationUserId = ?;
`;

export const UPDATE_USER_GIVEN_ID = `
UPDATE User
SET jsonCol = ?, applicationUserId = ?
WHERE id = ?;
`;

export const UPDATE_USER_GIVEN_APPLICATIONUSERID = `
UPDATE User
SET jsonCol = ?
WHERE applicationUserId = ?;
`;

export const GET_ALL_USERS = `
SELECT *
FROM User
`;
