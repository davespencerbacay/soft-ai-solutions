import sqlite3 from 'sqlite3';
import { open } from 'sqlite';
import InternalError from '../utils/custom-errors/InternalError.js'; 
import users from '../tables/users.js';
import groups from '../tables/groups.js';
import roles from '../tables/roles.js';
import modules from '../tables/modules.js';
import permissions from '../tables/permissions.js';
import usersGroup from '../tables/users-group.js';
import groupRoles from '../tables/group-roles.js';
import rolesPermission from '../tables/roles-permission.js';

sqlite3.verbose();

let dbInstance;
const initDB = async () => {
  const db = await open({
    filename: './data.sqlite',
    driver: sqlite3.Database,
  });

  const shouldReset = false;
  await users(db, shouldReset);
  await groups(db, shouldReset);
  await roles(db, shouldReset);
  await modules(db, shouldReset);
  await permissions(db, shouldReset);
  await usersGroup(db, shouldReset);
  await groupRoles(db, shouldReset);
  await rolesPermission(db, shouldReset);

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
