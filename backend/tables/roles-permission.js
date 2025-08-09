const RolesPermission = async (db, shouldReset) => {
    if(shouldReset) {
        await db.exec(`DROP TABLE IF EXISTS RolesPermission;`);
    }
    
    await db.exec(`
        CREATE TABLE IF NOT EXISTS RolesPermission (
        RolesPermissionId INTEGER PRIMARY KEY AUTOINCREMENT,
        RoleId INTEGER NOT NULL,
        PermissionId INTEGER NOT NULL
        );
    `);
};

export default RolesPermission;