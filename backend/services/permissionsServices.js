import { dbo } from "../config/db.js";

const createPermission = async ({ name, description }) => {
  const result = await dbo().run(
    `INSERT INTO permissions (name, description) VALUES (?, ?)`,
    [name, description]
  );
  return { id: result.lastID, name, description };
};

const getAllPermissions = async () => {
  return await dbo().all(`SELECT * FROM permissions`);
};

const getSinglePermission = async (key, value) => {
  const db = dbo();
  const permission = await db.get(
    `SELECT * FROM permissions WHERE ${key} = ?`,
    value
  );

  return permission;
};

const updatePermission = async ({ id, name, description }) => {
  const db = dbo();
  await db.run(
    `UPDATE permissions SET name = ?, description = ? WHERE id = ?`,
    [name, description, id]
  );

  return {
    id,
    name,
    description
  };
};

const deletePermission = async (permission) => {
  const db = dbo();
  await db.run(
    `DELETE FROM permissions WHERE id = ?`,
    permission.id
  );

  return {
    id: permission.id,
    name: permission.name,
    description: permission.description
  };
};

export default {
  getAllPermissions,
  createPermission,
  getSinglePermission,
  updatePermission,
  deletePermission
};
