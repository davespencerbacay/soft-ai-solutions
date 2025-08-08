const Modules = async (db, shouldReset) => {
    if(shouldReset) {
        await db.exec(`DROP TABLE IF EXISTS Modules;`);
    }
    
    await db.exec(`
        CREATE TABLE IF NOT EXISTS Modules (
        ModuleId INTEGER PRIMARY KEY AUTOINCREMENT,
        Name VARCHAR(100) NOT NULL,
        Description VARCHAR(100) NOT NULL,
        CreatedDate DATETIME DEFAULT CURRENT_TIMESTAMP
        );
    `);
};

export default Modules;