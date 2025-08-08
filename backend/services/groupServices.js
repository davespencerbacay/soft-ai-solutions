import { dbo } from "../config/db.js";

const createGroup = async ({ name, description }) => {
  const result = await dbo().run(
    `INSERT INTO groups (name, description) VALUES (?, ?)`,
    [name, description]
  );
  return { id: result.lastID, name, description };
};

const getAllGroups = async () => {
  return await dbo().all(`SELECT * FROM groups`);
};

const getSingleGroup = async (key, value) => {
  const db = dbo();
  const group = await db.get(
    `SELECT * FROM groups WHERE ${key} = ?`,
    value
  );

  return group;
};

const updateGroup = async ({ id, name, description }) => {
  const db = dbo();
  await db.run(
    `UPDATE groups SET name = ?, description = ? WHERE id = ?`,
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
    `DELETE FROM groups WHERE id = ?`,
    group.id
  );

  return {
    id: group.id,
    name: group.name,
    description: group.description
  };
};

export default {
  getAllGroups,
  createGroup,
  getSingleGroup,
  updateGroup,
  deleteGroup
};
