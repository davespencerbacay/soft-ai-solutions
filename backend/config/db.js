import sqlite3 from 'sqlite3';
import { open } from 'sqlite';
import InternalError from '../utils/InternalError.js'; 
import users from '../tables/users.js';
import groups from '../tables/groups.js';
import roles from '../tables/roles.js';
import modules from '../tables/modules.js';
import permissions from '../tables/permissions.js';

sqlite3.verbose();

let dbInstance;
const initDB = async () => {
  const db = await open({
    filename: './data.sqlite',
    driver: sqlite3.Database,
  });

  await users(db, true);
  await groups(db, true);
  await roles(db, true);
  await modules(db, true);
  await permissions(db, true);

  dbInstance = db;
  return db;
};

export const dbo = () => {
  if (!dbInstance) {
    throw new InternalError('[DB] Database not initialized.');
  }

  return dbInstance;
};

export default initDB;
