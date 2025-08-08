import { dbo } from "../config/db.js";

const createRole = async ({ name, description }) => {
  const result = await dbo().run(
    `INSERT INTO Roles (Name, Description) VALUES (?, ?)`,
    [name, description]
  );
  return { id: result.lastID, name, description };
};

const getAllRoles = async () => {
  return await dbo().all(`SELECT * FROM Roles`);
};

const getSingleRole = async (key, value) => {
  const db = dbo();
  const role = await db.get(
    `SELECT * FROM Roles WHERE ${key} = ?`,
    value
  );

  return role;
};

const updateRole = async ({ id, name, description }) => {
  const db = dbo();
  await db.run(
    `UPDATE Roles SET Name = ?, Description = ? WHERE RoleId = ?`,
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
    `DELETE FROM Roles WHERE RoleId = ?`,
    role.RoleId
  );

  return {
    id: role.RoleId,
    name: role.Name,
    description: role.Description
  };
};

export default {
  getAllRoles,
  createRole,
  getSingleRole,
  updateRole,
  deleteRole
};
