import { dbo } from "../config/db.js";

const createUser = async ({ firstName, lastName, emailAddress, bio }) => {
  const result = await dbo().run(
    `INSERT INTO users (firstName, lastName, emailAddress, bio) VALUES (?, ?, ?, ?)`,
    [firstName, lastName, emailAddress, bio]
  );
  return { id: result.lastID, firstName, lastName, emailAddress, bio };
};

const getAllUsers = async () => {
  return await dbo().all(`SELECT * FROM users`);
};

const getSingleUser = async (key, value) => {
  const db = dbo();
  const user = await db.get(
    `SELECT * FROM users WHERE ${key} = ?`,
    value
  );

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
