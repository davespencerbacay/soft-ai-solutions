import { dbo } from "../config/db.js";

const createUser = async ({ firstName, lastName, emailAddress }) => {
  const result = await dbo().run(
    `INSERT INTO users (firstName, lastName, emailAddress) VALUES (?, ?, ?)`,
    [firstName, lastName, emailAddress]
  );
  return { id: result.lastID, firstName, lastName, emailAddress };
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

export default { 
    getAllUsers,
    createUser,
    getSingleUser
};
