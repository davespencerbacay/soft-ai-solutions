import { dbo } from "../config/db.js";
import generateToken from "../utils/generateToken.js";

const createUser = async ({ firstName, lastName, emailAddress, bio, password }) => {
  const result = await dbo().run(
    `INSERT INTO users (firstName, lastName, emailAddress, bio, password) VALUES (?, ?, ?, ?, ?)`,
    [firstName, lastName, emailAddress, bio, password]
  );

  const token = generateToken(result.lastID);
  return { id: result.lastID, firstName, lastName, emailAddress, bio, token };
};

const getAllUsers = async () => {
  const db = dbo();
  const query = `
    SELECT id, firstName, lastName, emailAddress, bio, createdDate
    FROM users
  `;
  return await db.all(query);
};

const getSingleUser = async (key, value) => {
  const db = dbo();

  const allowedKeys = ['id', 'emailAddress'];

  if (!allowedKeys.includes(key)) {
    throw new Error('Invalid search key');
  }

  const query = `
    SELECT *
    FROM users
    WHERE ${key} = ?
  `;

  const user = await db.get(query, [value]);
  return user;
};

const updateUser = async ({ id, firstName, lastName, emailAddress, bio }) => {
  const db = dbo();
  await db.run(
    `UPDATE users SET firstName = ?, lastName = ?, emailAddress = ?, bio = ? WHERE id = ?`,
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
    `DELETE FROM users WHERE id = ?`,
    user.id
  );

  return {
    id: user.id,
    firstName: user.firstName,
    lastName: user.lastName,
    emailAddress: user.emailAddress,
    bio: user.bio
  };
}

export default {
  getAllUsers,
  createUser,
  getSingleUser,
  updateUser,
  deleteUser
};
