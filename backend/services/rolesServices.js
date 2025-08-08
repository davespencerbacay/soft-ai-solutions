import { dbo } from "../config/db.js";

const createRole = async ({ name, description }) => {
  const result = await dbo().run(
    `INSERT INTO roles (name, description) VALUES (?, ?)`,
    [name, description]
  );
  return { id: result.lastID, name, description };
};

const getAllRoles = async () => {
  return await dbo().all(`SELECT * FROM roles`);
};

const getSingleRole = async (key, value) => {
  const db = dbo();
  const role = await db.get(
    `SELECT * FROM roles WHERE ${key} = ?`,
    value
  );

  return role;
};

const updateRole = async ({ id, name, description }) => {
  const db = dbo();
  await db.run(
    `UPDATE roles SET name = ?, description = ? WHERE id = ?`,
    [name, description, id]
  );

  return {
    id,
    name,
    description
  };
};

const deleteRole = async (role) => {
  const db = dbo();
  await db.run(
    `DELETE FROM roles WHERE id = ?`,
    role.id
  );

  return {
    id: role.id,
    name: role.name,
    description: role.description
  };
};

export default {
  getAllRoles,
  createRole,
  getSingleRole,
  updateRole,
  deleteRole
};
