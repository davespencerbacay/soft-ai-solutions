const getUsers = async () => {
    return [
        {
            firstName: "Dave",
            lastName: "Bacay",
            emailAddress: "dave.bacay@example.com",
            age: 26,
            isActive: true,
            address: {
                street: "123 Main St",
                city: "Anytown",
                state: "CA",
                zip: "12345"
            }
        }, 
        {
            firstName: "Jane",
            lastName: "Smith",
            emailAddress: "jane.smith@example.com",
            age: 28,
            isActive: false,
            address: {
                street: "456 Elm St",
                city: "Othertown",
                state: "NY",
                zip: "67890"
            }
        }
    ];
};

export default { 
    getUsers 
};
