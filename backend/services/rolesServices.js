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

const getAllRolesWithPermissions = async () => {
  const db = dbo();

  // Get all roles
  const roles = await db.all(`SELECT * FROM Roles`);

  // Attach permissions to each role
  const rolesWithPermissions = await Promise.all(
    roles.map(async (role) => {
      const permissions = await db.all(
        `
        SELECT p.PermissionId, p.Name, p.Description
        FROM Permissions p
        JOIN RolesPermission rp ON p.PermissionId = rp.PermissionId
        WHERE rp.RoleId = ?
        `,
        [role.RoleId]
      );

      return {
        ...role,
        Permissions: permissions || []
      };
    })
  );

  return rolesWithPermissions;
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

const assignRolePermissions = async (roleId, permissionIds) => {
  const db = dbo();

  // Remove existing permissions
  await db.run(
    `DELETE FROM RolesPermission WHERE RoleId = ?`,
    roleId
  );

  // Assign new permissions
  const placeholders = permissionIds.map(() => `(?, ?)`).join(", ");
  const sql = `INSERT INTO RolesPermission (RoleId, PermissionId) VALUES ${placeholders}`;
  const params = permissionIds.flatMap(permissionId => [roleId, permissionId]);
  await db.run(sql, params);

  return {
    roleId,
    permissionIds
  };
}

export default {
  getAllRoles,
  createRole,
  getSingleRole,
  updateRole,
  deleteRole,
  assignRolePermissions,
  getAllRolesWithPermissions
};
