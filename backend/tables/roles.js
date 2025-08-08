const Roles = async (db, shouldReset) => {
    if(shouldReset) {
        await db.exec(`DROP TABLE IF EXISTS Roles;`);
    }
    
    await db.exec(`
        CREATE TABLE IF NOT EXISTS Roles (
        RoleId INTEGER PRIMARY KEY AUTOINCREMENT,
        Name VARCHAR(100) NOT NULL,
        Description VARCHAR(100) NOT NULL,
        CreatedDate DATETIME DEFAULT CURRENT_TIMESTAMP
        );
    `);
};

export default Roles;