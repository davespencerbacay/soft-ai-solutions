const Groups = async (db, shouldReset) => {
    if(shouldReset) {
        await db.exec(`DROP TABLE IF EXISTS Groups;`);
    }
    
    await db.exec(`
        CREATE TABLE IF NOT EXISTS Groups (
        GroupId INTEGER PRIMARY KEY AUTOINCREMENT,
        Name VARCHAR(100) NOT NULL,
        Description VARCHAR(100) NOT NULL,
        CreatedDate DATETIME DEFAULT CURRENT_TIMESTAMP
        );
    `);
};

export default Groups;