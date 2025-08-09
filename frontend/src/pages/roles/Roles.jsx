import ListTable from "../../components/Table/ListTable";

const Roles = () => {
    const rows = [
        {
            title: "Role #1",
            author: "Lorem ipsum dolor sit amet.",
            date: "2d ago",
            avatars: ["Leslie", "John", "Alex", "Mike"],
            count: 24,
            id: "123abc456def789ghi" 
        },
        {
            title: "Role #2",
            author: "Lorem ipsum dolor sit amet.",
            date: "2d ago",
            avatars: ["Michael", "Anna", "Sara"],
            count: 62,
            id: "123abc456def789ghi" 
        },
        {
            title: "Role #3",
            author: "Lorem ipsum dolor sit amet.",
            date: "3d ago",
            avatars: ["Dries", "Tom", "Sam", "Eve"],
            count: 22,
            id: "123abc456def789ghi" 
        }
    ];

    const menuItems = [
        { key: "assign-group", label: "Assign Group" },
        { key: "edit-role", label: "Edit Role" },
        { key: "delete-role", label: "Delete Role" },
    ];

    return (
        <div className="p-6 bg-white rounded-lg shadow">
            <ListTable 
                rows={rows} 
                showEllipsis={true} 
                menuItems={menuItems}
                onMenuAction={(actionKey, row) => {
                    console.log(actionKey, row);
                }} 
            />
        </div>
    );
};

export default Roles;
