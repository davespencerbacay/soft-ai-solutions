const modules = async (db, shouldReset) => {
    if(shouldReset) {
        await db.exec(`DROP TABLE IF EXISTS modules;`);
    }
    
    await db.exec(`
        CREATE TABLE IF NOT EXISTS modules (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name VARCHAR(100) NOT NULL,
        description VARCHAR(100) NOT NULL,
        createdDate DATETIME DEFAULT CURRENT_TIMESTAMP
        );
    `);
};

export default modules;