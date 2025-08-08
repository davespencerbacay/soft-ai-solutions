const Permissions = async (db, shouldReset) => {
    if(shouldReset) {
        await db.exec(`DROP TABLE IF EXISTS Permissions;`);
    }
    
    await db.exec(`
        CREATE TABLE IF NOT EXISTS Permissions (
        PermissionId INTEGER PRIMARY KEY AUTOINCREMENT,
        Name VARCHAR(100) NOT NULL,
        Description VARCHAR(100) NOT NULL,
        CreatedDate DATETIME DEFAULT CURRENT_TIMESTAMP
        );
    `);
};

export default Permissions;