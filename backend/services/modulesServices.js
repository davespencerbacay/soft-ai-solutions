import { dbo } from "../config/db.js";

const createModule = async ({ name, description }) => {
  const result = await dbo().run(
    `INSERT INTO modules (name, description) VALUES (?, ?)`,
    [name, description]
  );
  return { id: result.lastID, name, description };
};

const getAllModules = async () => {
  return await dbo().all(`SELECT * FROM modules`);
};

const getSingleModule = async (key, value) => {
  const db = dbo();
  const module = await db.get(
    `SELECT * FROM modules WHERE ${key} = ?`,
    value
  );

  return module;
};

const updateModule = async ({ id, name, description }) => {
  const db = dbo();
  await db.run(
    `UPDATE modules SET name = ?, description = ? WHERE id = ?`,
    [name, description, id]
  );

  return {
    id,
    name,
    description
  };
};

const deleteModule = async (module) => {
  const db = dbo();
  await db.run(
    `DELETE FROM modules WHERE id = ?`,
    module.id
  );

  return {
    id: module.id,
    name: module.name,
    description: module.description
  };
};

export default {
  getAllModules,
  createModule,
  getSingleModule,
  updateModule,
  deleteModule
};
