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

const assignUsersGroup = async (groupId, userId) => {
  const db = dbo();
  await db.run(
    `INSERT INTO UsersGroup (UserId, GroupId) VALUES (?, ?)`,
    [userId, groupId]
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

export default {
  getAllGroups,
  createGroup,
  getSingleGroup,
  updateGroup,
  deleteGroup,
  assignUsersGroup,
  getSingleGroupWithUsers
};
