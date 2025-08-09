import ListTable from "../../components/Table/ListTable";

const Modules = () => {
    const rows = [
        {
            title: "Module #1",
            author: "Lorem ipsum dolor sit amet.",
            date: "2d ago",
            count: 24,
            id: "123abc456def789ghi" 
        },
        {
            title: "Module #2",
            author: "Lorem ipsum dolor sit amet.",
            date: "2d ago",
            count: 62,
            id: "123abc456def789ghi" 
        },
        {
            title: "Module #3",
            author: "Lorem ipsum dolor sit amet.",
            date: "3d ago",
            count: 22,
            id: "123abc456def789ghi" 
        }
    ];

    const menuItems = [
        { key: "edit-module", label: "Edit Module", disabled: true },
        { key: "delete-module", label: "Delete Module", disabled: true },
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

export default Modules;
