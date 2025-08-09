import { dbo } from "../config/db.js";

const createModule = async ({ name, description }) => {
  const result = await dbo().run(
    `INSERT INTO Modules (Name, Description) VALUES (?, ?)`,
    [name, description]
  );
  return { id: result.lastID, name, description };
};

const getAllModules = async () => {
  
  return await dbo().all(`SELECT * FROM Modules`);
};

const getSingleModule = async (key, value) => {
  const db = dbo();
  const module = await db.get(
    `SELECT * FROM Modules WHERE ${key} = ?`,
    value
  );

  return module;
};

const updateModule = async ({ id, name, description }) => {
  const db = dbo();
  await db.run(
    `UPDATE Modules SET Name = ?, Description = ? WHERE ModuleId = ?`,
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
    `DELETE FROM Modules WHERE ModuleId = ?`,
    module.ModuleId
  );

  return {
    id: module.ModuleId,
    name: module.Name,
    description: module.Description
  };
};

export default {
  getAllModules,
  createModule,
  getSingleModule,
  updateModule,
  deleteModule
};
