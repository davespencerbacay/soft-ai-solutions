const permissions = async (db, shouldReset) => {
    if(shouldReset) {
        await db.exec(`DROP TABLE IF EXISTS permissions;`);
    }
    
    await db.exec(`
        CREATE TABLE IF NOT EXISTS permissions (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name VARCHAR(100) NOT NULL,
        description VARCHAR(100) NOT NULL,
        createdDate DATETIME DEFAULT CURRENT_TIMESTAMP
        );
    `);
};

export default permissions;