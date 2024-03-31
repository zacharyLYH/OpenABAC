export const GET_USER_GIVEN_APPLICATIONUSERID = `
SELECT id, jsonCol
from User
WHERE applicationUserId = ?;
`;

export const IS_USER_APPLICATIONUSERID_UNIQUE = `
SELECT COUNT(*) AS count
FROM User
WHERE applicationUserId = ?;
`;

export const CREATE_USER = `
INSERT INTO User (id, applicationUserId, jsonCol)
VALUES (UUID(), ?, ?);
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
SET jsonCol = ?, applicationUserId = ?
WHERE applicationUserId = ?;
`;

export const GET_ALL_USERS = `
SELECT id, applicationUserId, jsonCol, modifiedDate
FROM User
`;

export const GET_NUMBER_OF_USERS = `
SELECT COUNT(*) AS count
FROM User;
`;

export const GET_USER_VIA_SEARCH = `
SELECT id AS id, applicationUserId AS value
FROM User;
`;

export const GET_USER_BY_ID = `
SELECT applicationUserId, jsonCol, modifiedDate
FROM User
WHERE ID = ?;
`;
