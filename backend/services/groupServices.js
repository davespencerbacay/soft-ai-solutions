import { dbo } from "../config/db.js";

const createGroup = async ({ name, description }) => {
  const result = await dbo().run(
    `INSERT INTO Groups (Name, Description) VALUES (?, ?)`,
    [name, description]
  );
  return { id: result.lastID, name, description };
};

const getAllGroups = async () => {
  return await dbo().all(`SELECT * FROM Groups`);
};
const getAllGroupsWithUsers = async () => {
  const db = dbo();

  const groups = await db.all(`SELECT * FROM Groups`);

  const groupsWithUsers = await Promise.all(
    groups.map(async (group) => {
      const users = await db.all(
        `
        SELECT 
          u.UserId, u.FirstName, u.LastName, u.EmailAddress, u.Bio, u.CreatedDate
          FROM Users u
          JOIN UsersGroup ug ON u.UserId = ug.UserId
          WHERE ug.GroupId = ?
        `,
        [group.GroupId]
      );

      return {
        ...group,
        Users: users || [],
      };
    })
  );

  return groupsWithUsers;
};

const getSingleGroup = async (key, value) => {
  const db = dbo();
  const group = await db.get(
    `SELECT * FROM Groups WHERE ${key} = ?`,
    value
  );

  return group;
};

const updateGroup = async ({ id, name, description }) => {
  const db = dbo();
  await db.run(
    `UPDATE Groups SET Name = ?, Description = ? WHERE GroupId = ?`,
    [name, description, id]
  );

  return {
    id,
    name,
    description
  };
};

const deleteGroup = async (group) => {
  const db = dbo();
  await db.run(
    `DELETE FROM Groups WHERE GroupId = ?`,
    group.GroupId
  );

  return {
    id: group.GroupId,
    name: group.Name,
    description: group.Description
  };
};

const assignUsersGroup = async (groupId, userIds) => {
  const db = dbo();

  // Get existing user IDs assigned to this group
  const existingUsers = await db.all(
    `SELECT UserId FROM UsersGroup WHERE GroupId = ?`,
    [groupId]
  );
  const existingUserIds = existingUsers.map(row => row.UserId);

  // Remove unselected users
  const usersToDelete = existingUserIds.filter(id => !userIds.includes(id));
  if (usersToDelete.length > 0) {
    await db.run(
      `DELETE FROM UsersGroup WHERE GroupId = ? AND UserId IN (${usersToDelete.map(() => '?').join(',')})`,
      [groupId, ...usersToDelete]
    );
  }

  // Insert only new users
  const usersToInsert = userIds.filter(id => !existingUserIds.includes(id));
  for (const userId of usersToInsert) {
    await db.run(
      `INSERT INTO UsersGroup (UserId, GroupId) VALUES (?, ?)`,
      [userId, groupId]
    );
  }

  // Return updated list
  return db.all(
    `SELECT * FROM UsersGroup WHERE GroupId = ?`,
    [groupId]
  );
};


const assignGroupRoles = async (groupId, roleIds) => {
  const db = dbo();

  // Get existing roles for the group
  const existingRoles = await db.all(
    `SELECT RoleId FROM GroupRoles WHERE GroupId = ?`,
    [groupId]
  );
  const existingRoleIds = existingRoles.map(row => row.RoleId);

  // Determine which roles to delete (not in the new roleIds)
  const rolesToDelete = existingRoleIds.filter(id => !roleIds.includes(id));
  if (rolesToDelete.length > 0) {
    await db.run(
      `DELETE FROM GroupRoles WHERE GroupId = ? AND RoleId IN (${rolesToDelete.map(() => '?').join(',')})`,
      [groupId, ...rolesToDelete]
    );
  }

  // Determine which roles to insert (not in existing ones)
  const rolesToInsert = roleIds.filter(id => !existingRoleIds.includes(id));
  for (const roleId of rolesToInsert) {
    await db.run(
      `INSERT INTO GroupRoles (RoleId, GroupId) VALUES (?, ?)`,
      [roleId, groupId]
    );
  }

  return db.all(
    `SELECT * FROM GroupRoles WHERE GroupId = ?`,
    [groupId]
  );
};

const getSingleGroupWithUsers = async (groupId) => {
  const db = dbo();
  const group = await db.all(
    `SELECT u.FirstName, u.LastName, u.EmailAddress FROM Users u
     INNER JOIN UsersGroup ug ON u.UserId = ug.UserId
     WHERE ug.GroupId = ?`,
    groupId
  );

  return group
}

const getSingleGroupWithRoles = async (groupId) => {
  const db = dbo();
  const group = await db.all(
    `SELECT r.Name, r.Description FROM Roles r
     INNER JOIN GroupRoles gr ON r.RoleId = gr.RoleId
     WHERE gr.GroupId = ?`,
    groupId
  );

  return group
}

export default {
  getAllGroups,
  createGroup,
  getSingleGroup,
  updateGroup,
  deleteGroup,
  assignUsersGroup,
  getSingleGroupWithUsers,
  getSingleGroupWithRoles,
  assignGroupRoles,
  getAllGroupsWithUsers
};
