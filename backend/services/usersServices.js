import { dbo } from "../config/db.js";
import generateToken from "../utils/generateToken.js";

const createUser = async ({ firstName, lastName, emailAddress, bio, password }) => {
  const result = await dbo().run(
    `INSERT INTO Users (FirstName, LastName, EmailAddress, Bio, Password) VALUES (?, ?, ?, ?, ?)`,
    [firstName, lastName, emailAddress, bio, password]
  );

  const token = generateToken(result.lastID);
  return { id: result.lastID, firstName, lastName, emailAddress, bio, token };
};

const getAllUsers = async () => {
  const db = dbo();
  const query = `
    SELECT UserId, FirstName, LastName, EmailAddress, Bio, CreatedDate
    FROM Users
  `;
  return await db.all(query);
};

const getAllUsersWithGroup = async () => {
  const db = dbo();
  const query = `
    SELECT 
      Users.UserId, 
      Users.FirstName, 
      Users.LastName, 
      Users.EmailAddress, 
      Users.Bio, 
      Users.CreatedDate,
      GROUP_CONCAT(DISTINCT Groups.GroupId) AS GroupId,
      GROUP_CONCAT(DISTINCT Groups.Name) AS GroupName,
      GROUP_CONCAT(DISTINCT Groups.Description) AS GroupDescription
    FROM Users
    LEFT JOIN UsersGroup ON Users.UserId = UsersGroup.UserId
    LEFT JOIN Groups ON UsersGroup.GroupId = Groups.GroupId
    GROUP BY Users.UserId

  `;
  return await db.all(query);
};

const getSingleUser = async (key, value) => {
  const db = dbo();

  const allowedKeys = ['UserId', 'EmailAddress'];

  if (!allowedKeys.includes(key)) {
    throw new Error('Invalid search key');
  }

  const query = `
    SELECT *
    FROM Users
    WHERE ${key} = ?
  `;

  const user = await db.get(query, [value]);
  return user;
};

const updateUser = async ({ id, firstName, lastName, emailAddress, bio }) => {
  const db = dbo();
  await db.run(
    `UPDATE Users SET FirstName = ?, LastName = ?, EmailAddress = ?, Bio = ? WHERE UserId = ?`,
    [firstName, lastName, emailAddress, bio, id]
  );

  return {
    id,
    firstName,
    lastName,
    emailAddress,
    bio
  };
}

const deleteUser = async (user) => {
  const db = dbo();
  await db.run(
    `DELETE FROM Users WHERE UserId = ?`,
    user.UserId
  );

  return {
    id: user.UserId,
    firstName: user.FirstName,
    lastName: user.LastName,
    emailAddress: user.EmailAddress,
    bio: user.Bio
  };
}

export default {
  getAllUsers,
  createUser,
  getSingleUser,
  updateUser,
  deleteUser,
  getAllUsersWithGroup
};
