import { useState } from "react";
import Modal from "../../components/Modal/Modal";
import StandardTable from "../../components/Table/Table";
import ConfirmationModal from "../../components/ConfirmationModal/ConfirmationModal";
import UserModal from "./UserModal";
import { 
  useGetUsersQuery, 
  useAddUserMutation, 
  useDeleteUserMutation,
  useUpdateUserMutation // <-- new import
} from "../../slices/usersApiSlice";
import { ADD_ACTION, EDIT_ACTION, EMPTY } from "../../constants/constants"; // add EDIT_ACTION constant

const Users = () => {
  const { data: users = [], isLoading, isError } = useGetUsersQuery();
  const [addUser] = useAddUserMutation();
  const [deleteUser] = useDeleteUserMutation();
  const [updateUser] = useUpdateUserMutation();  // new update mutation hook

  const [selectedUser, setSelectedUser] = useState(null);
  const [userToDelete, setUserToDelete] = useState(null);
  const [userToEdit, setUserToEdit] = useState(null);
  const [modalSettings, setModalSettings] = useState({ isOpen: false, mode: "" });
  const [modalError, setModalError] = useState("");
  const [deleteError, setDeleteError] = useState("");

  const handleAction = (type, row) => {
    if (type === "view") setSelectedUser(row);
    else if (type === "delete") setUserToDelete(row);
    else if (type === "update") {
      setUserToEdit(row);
      setModalSettings({ isOpen: true, mode: EDIT_ACTION });
    }
  };

  const closeModal = () => setSelectedUser(null);

  const cancelDelete = () => {
    setUserToDelete(null);
    setDeleteError("");
  };
  const closeModalForm = () => {
    setModalSettings({ isOpen: false, mode: "" });
    setModalError("");
  };

  const confirmDelete = async () => {
    if (!userToDelete) return;

    try {
      await deleteUser(userToDelete.UserId).unwrap();
      setUserToDelete(null);
      setDeleteError("");
    } catch (err) {
      setDeleteError(err?.data?.message || "Failed to delete user.");
      console.error(err);
    }
  };

  const saveNewUser = async (newUser) => {
    try {
      await addUser(newUser).unwrap();
      setModalSettings({ isOpen: false, mode: "" });
      setModalError("");
    } catch (err) {
      setModalError(err?.data?.message || "Failed to add user.");
      console.error(err);
    }
  };

  const saveEditedUser = async (updatedUser) => {
    if (!userToEdit) return;

    try {
      await updateUser({ userId: userToEdit.UserId, data: updatedUser }).unwrap();
      setModalSettings({ isOpen: false, mode: "" });
      setModalError("");
    } catch (err) {
      setModalError(err?.data?.message || "Failed to update user.");
      console.error(err);
    }
  };

  const columns = [
    { header: "User ID", accessor: "UserId" },
    { header: "Name", accessor: (row) => `${row.FirstName} ${row.LastName}` },
    { header: "Email Address", accessor: "EmailAddress" },
    { header: "Group Name", accessor: "GroupName" },
    {
      header: "Actions",
      accessor: (row) => (
        <div className="flex gap-2">
          <button onClick={() => handleAction("view", row)} title="View" className="px-3 py-0.5 text-sm bg-blue-100 text-blue-600 rounded hover:bg-blue-200">View</button>
          <button onClick={() => handleAction("update", row)} title="Update" className="px-3 py-0.5 text-sm bg-yellow-100 text-yellow-600 rounded hover:bg-yellow-200">Edit</button>
          <button onClick={() => handleAction("delete", row)} title="Delete" className="px-3 py-0.5 text-sm bg-red-100 text-red-600 rounded hover:bg-red-200">Delete</button>
        </div>
      ),
    },
  ];

  if (isLoading) return <p>Loading users...</p>;
  if (isError) return <p>Error loading users.</p>;

  return (
    <div>
      <button
        onClick={() => setModalSettings({ isOpen: true, mode: ADD_ACTION })}
        className="mb-4 px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
      >
        Add User
      </button>

      <StandardTable columns={columns} data={users} pageSize={10} />

      <Modal isOpen={!!selectedUser} onClose={closeModal} title="User Details">
        {selectedUser && (
          <div className="space-y-2">
            <p><strong>ID:</strong> {selectedUser.UserId}</p>
            <p><strong>Name:</strong> {selectedUser.FirstName} {selectedUser.LastName}</p>
            <p><strong>Email:</strong> {selectedUser.EmailAddress}</p>
            <p><strong>Group:</strong> {selectedUser.GroupName || EMPTY}</p>
          </div>
        )}
      </Modal>

      <ConfirmationModal
        isOpen={!!userToDelete}
        onCancel={cancelDelete}
        onConfirm={confirmDelete}
        title="Delete Confirmation"
        message={`Are you sure you want to delete user "${userToDelete?.FirstName} ${userToDelete?.LastName}"? This action cannot be undone.`}
      >
        {deleteError && (
          <p className="mt-2 text-red-600 text-sm font-semibold">{deleteError}</p>
        )}
      </ConfirmationModal>

      <UserModal
        isOpen={modalSettings.isOpen}
        onClose={closeModalForm}
        onSave={modalSettings.mode === ADD_ACTION ? saveNewUser : saveEditedUser}
        mode={modalSettings.mode}
        initialData={modalSettings.mode === EDIT_ACTION ? (userToEdit || {}) : {}}
        errorMessage={modalError}
      />
    </div>
  );
};

export default Users;
