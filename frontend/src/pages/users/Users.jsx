import { useState } from "react";
import Modal from "../../components/Modal/Modal";
import StandardTable from "../../components/Table/Table";
import ConfirmationModal from "../../components/ConfirmationModal/ConfirmationModal";
import EditUserModal from "./EditUserModal";

const Users = () => {
  const [data, setData] = useState([
    { id: 1, name: "John Doe", email: "john@example.com", group: "Group A" },
    { id: 2, name: "Jane Smith", email: "jane@example.com", group: "Group A" },
    { id: 3, name: "Sam Brown", email: "sam@example.com", group: "Group A" },
    { id: 4, name: "Lisa White", email: "lisa@example.com", group: "Group A" },
  ]);

  const [selectedUser, setSelectedUser] = useState(null);
  const [userToDelete, setUserToDelete] = useState(null);
  const [userToEdit, setUserToEdit] = useState(null);

  const handleAction = (type, row) => {
    if (type === "view") {
      setSelectedUser(row);
    } else if (type === "delete") {
      setUserToDelete(row);
    } else if (type === "update") {
      setUserToEdit(row);
    } else {
      console.log(`${type} clicked for`, row);
    }
  };

  const closeModal = () => {
    setSelectedUser(null);
  };

  const cancelDelete = () => {
    setUserToDelete(null);
  };

  const confirmDelete = () => {
    if (userToDelete) {
      setData((prev) => prev.filter((u) => u.id !== userToDelete.id));
      setUserToDelete(null);
    }
  };

  const closeEditModal = () => {
    setUserToEdit(null);
  };

  const saveUser = (updatedUser) => {
    setData((prev) =>
      prev.map((user) => (user.id === updatedUser.id ? updatedUser : user))
    );
    setUserToEdit(null);
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

      <Modal isOpen={!!selectedUser} onClose={closeModal} title="User Details">
        {selectedUser && (
          <div className="space-y-2">
            <p>
              <strong>ID:</strong> {selectedUser.id}
            </p>
            <p>
              <strong>Name:</strong> {selectedUser.name}
            </p>
            <p>
              <strong>Email:</strong> {selectedUser.email}
            </p>
            <p>
              <strong>Group:</strong> {selectedUser.group}
            </p>
          </div>
        )}
      </Modal>

      <ConfirmationModal
        isOpen={!!userToDelete}
        onCancel={cancelDelete}
        onConfirm={confirmDelete}
        title="Delete Confirmation"
        message={`Are you sure you want to delete user "${userToDelete?.name}"? This action cannot be undone.`}
      />

      <EditUserModal
        isOpen={!!userToEdit}
        user={userToEdit}
        onClose={closeEditModal}
        onSave={saveUser}
      />
    </div>
  );
};

export default Users;
