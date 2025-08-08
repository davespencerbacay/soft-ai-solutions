const UsersGroup = async (db, shouldReset) => {
    if(shouldReset) {
        await db.exec(`DROP TABLE IF EXISTS UsersGroup;`);
    }
    
    await db.exec(`
        CREATE TABLE IF NOT EXISTS UsersGroup (
        UsersGroupId INTEGER PRIMARY KEY AUTOINCREMENT,
        UserId INTEGER NOT NULL,
        GroupId INTEGER NOT NULL
        );
    `);
};

export default UsersGroup;