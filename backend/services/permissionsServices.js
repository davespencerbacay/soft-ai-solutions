import { dbo } from "../config/db.js";

const createPermission = async ({ name, description }) => {
  const result = await dbo().run(
    `INSERT INTO Permissions (Name, Description) VALUES (?, ?)`,
    [name, description]
  );
  return { id: result.lastID, name, description };
};

const getAllPermissions = async () => {
  return await dbo().all(`SELECT * FROM Permissions`);
};

const getSinglePermission = async (key, value) => {
  const db = dbo();
  const permission = await db.get(
    `SELECT * FROM Permissions WHERE ${key} = ?`,
    value
  );

  return permission;
};

const updatePermission = async ({ id, name, description }) => {
  const db = dbo();
  await db.run(
    `UPDATE Permissions SET Name = ?, Description = ? WHERE PermissionId = ?`,
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
    `DELETE FROM Permissions WHERE PermissionId = ?`,
    permission.PermissionId
  );

  return {
    id: permission.PermissionId,
    name: permission.Name,
    description: permission.Description
  };
};

export default {
  getAllPermissions,
  createPermission,
  getSinglePermission,
  updatePermission,
  deletePermission
};
