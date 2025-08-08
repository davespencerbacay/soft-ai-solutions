import sqlite3 from 'sqlite3';
import { open } from 'sqlite';
import InternalError from '../utils/InternalError.js'; 

sqlite3.verbose();

let dbInstance;

const initDB = async () => {
  const db = await open({
    filename: './data.sqlite',
    driver: sqlite3.Database,
  });

  await db.exec(`DROP TABLE IF EXISTS users;`);
  await db.exec(`
    CREATE TABLE IF NOT EXISTS users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      firstName VARCHAR(100) NOT NULL,
      lastName VARCHAR(100) NOT NULL,
      emailAddress VARCHAR(255) UNIQUE NOT NULL,
      bio VARCHAR(255),
      createdDate DATETIME DEFAULT CURRENT_TIMESTAMP
    );
  `);

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
