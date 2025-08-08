const Users = async (db, shouldReset) => {
    if(shouldReset) {
        await db.exec(`DROP TABLE IF EXISTS Users;`);
    }
    
    await db.exec(`
        CREATE TABLE IF NOT EXISTS Users (
        UserId INTEGER PRIMARY KEY AUTOINCREMENT,
        FirstName VARCHAR(100) NOT NULL,
        LastName VARCHAR(100) NOT NULL,
        EmailAddress VARCHAR(255) UNIQUE NOT NULL,
        Password VARCHAR(255) NOT NULL,
        Bio VARCHAR(255),
        CreatedDate DATETIME DEFAULT CURRENT_TIMESTAMP
        );
    `);
};

export default Users;