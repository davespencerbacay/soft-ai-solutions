import StandardTable from "../../components/Table/Table";

const Users = () => {
  const data = [
    { id: 1, name: "John Doe", email: "john@example.com", group: "Group A" },
    { id: 2, name: "Jane Smith", email: "jane@example.com", group: "Group A" },
    { id: 3, name: "Sam Brown", email: "sam@example.com", group: "Group A" },
    { id: 4, name: "Lisa White", email: "lisa@example.com", group: "Group A" },
  ];

  const handleAction = (type, row) => {
    console.log(`${type} clicked for`, row);
  };

  const columns = [
    { header: "User ID", accessor: "id" },
    { header: "Name", accessor: "name" },
    { header: "Email Address", accessor: "email" },
    { header: "Group", accessor: "group" },
    {
      header: "Actions",
      accessor: (row) => (
        <div className="flex gap-2">
          <button
            onClick={() => handleAction("view", row)}
            title="View"
            className="px-3 py-0.5 text-sm bg-blue-100 text-blue-600 rounded hover:bg-blue-200"
          >
            View
          </button>
          <button
            onClick={() => handleAction("update", row)}
            title="Update"
            className="px-3 py-0.5 text-sm bg-yellow-100 text-yellow-600 rounded hover:bg-yellow-200"
          >
            Edit
          </button>
          <button
            onClick={() => handleAction("delete", row)}
            title="Delete"
            className="px-3 py-0.5 text-sm bg-red-100 text-red-600 rounded hover:bg-red-200"
          >
            Delete
          </button>
        </div>

      ),
    },
  ];

  return (
    <div>
      <StandardTable columns={columns} data={data} pageSize={2} />
    </div>
  );
};

export default Users;
