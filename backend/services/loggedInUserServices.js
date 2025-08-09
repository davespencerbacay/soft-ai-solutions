import { dbo } from "../config/db.js";

const getLoggedInUserPermissions = async (userId) => {
  const db = dbo();

  // 1. Get user's groups
  const groups = await db.all(
    `SELECT GroupId FROM UsersGroup WHERE UserId = ?`,
    [userId]
  );

  if (!groups.length) return [];

  const groupIds = groups.map((g) => g.GroupId);

  // 2. Get roles from those groups
  const placeholdersGroups = groupIds.map(() => "?").join(", ");
  const roles = await db.all(
    `SELECT RoleId FROM GroupRoles WHERE GroupId IN (${placeholdersGroups})`,
    groupIds
  );

  if (!roles.length) return [];

  const roleIds = roles.map((r) => r.RoleId);

  // 3. Get permissions for those roles
  const placeholdersRoles = roleIds.map(() => "?").join(", ");
  const rolePermissions = await db.all(
    `SELECT PermissionId FROM RolesPermission WHERE RoleId IN (${placeholdersRoles})`,
    roleIds
  );

  if (!rolePermissions.length) return [];

  const permissionIds = [...new Set(rolePermissions.map((p) => p.PermissionId))];

  // 4. Get permission details
  const placeholdersPermissions = permissionIds.map(() => "?").join(", ");
  const permissions = await db.all(
    `SELECT * FROM Permissions WHERE PermissionId IN (${placeholdersPermissions})`,
    permissionIds
  );

  return permissions;
};

export default {
    getLoggedInUserPermissions
}