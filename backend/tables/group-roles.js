const GroupRoles = async (db, shouldReset) => {
    if(shouldReset) {
        await db.exec(`DROP TABLE IF EXISTS GroupRoles;`);
    }
    
    await db.exec(`
        CREATE TABLE IF NOT EXISTS GroupRoles (
        GroupRolesId INTEGER PRIMARY KEY AUTOINCREMENT,
        GroupId INTEGER NOT NULL,
        RoleId INTEGER NOT NULL
        );
    `);
};

export default GroupRoles;