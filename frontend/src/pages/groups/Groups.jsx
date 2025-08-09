import { useState } from "react";
import ListTable from "../../components/Table/ListTable";
import {
  useGetGroupsWithUsersQuery,
  useAddGroupMutation,
  useUpdateGroupMutation,
  useDeleteGroupMutation,   // import delete mutation
} from "../../slices/groupsApiSlice";
import { ADD_ACTION, EDIT_ACTION } from "../../constants/constants";
import GroupModal from "./GroupModal";
import ConfirmationModal from "../../components/ConfirmationModal/ConfirmationModal";
import Users from "../users/Users";
import Modal from "../../components/Modal/Modal";

const Groups = () => {
  const { data: groups = [], isLoading, isError } = useGetGroupsWithUsersQuery();
  const [addGroup, { isLoading: isAdding }] = useAddGroupMutation();
  const [updateGroup, { isLoading: isUpdating }] = useUpdateGroupMutation();
  const [deleteGroup, { isLoading: isDeleting }] = useDeleteGroupMutation(); // delete mutation hook

  const [modalOpen, setModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState(ADD_ACTION);
  const [selectedGroup, setSelectedGroup] = useState(null);
  const [modalError, setModalError] = useState("");
  const [assignUserModalOpen, setAssignUserModalOpen] = useState(false);
  const [assignGroup, setAssignGroup] = useState(null);

  const [groupToDelete, setGroupToDelete] = useState(null);
  const [deleteError, setDeleteError] = useState("");

  if (isLoading || isUpdating || isDeleting || isAdding) return <p>Loading groups...</p>;
  if (isError) return <p>Error loading groups.</p>;

  const rows = groups.map((group) => ({
    title: group.Name,
    author: group.Description,
    date: new Date(group.CreatedDate).toLocaleDateString(),
    avatars: group.Users
      ? group.Users.map((user) => `${user.FirstName} ${user.LastName}`)
      : [],
    count: group.Users ? group.Users.length : 0,
    id: group.GroupId.toString(),
  }));

  const menuItems = [
    { key: "assign-user", label: "Assign User" },
    { key: "edit-group", label: "Edit Group" },
    { key: "delete-group", label: "Delete Group" },
  ];

  const openAddModal = () => {
    setSelectedGroup(null);
    setModalMode(ADD_ACTION);
    setModalError("");
    setModalOpen(true);
  };

  const openEditModal = (row) => {
    const group = groups.find((g) => g.GroupId.toString() === row.id);
    setSelectedGroup(group);
    setModalMode(EDIT_ACTION);
    setModalError("");
    setModalOpen(true);
  };

  const openAssignUserModal = (group) => {
    setAssignGroup(group);
    setAssignUserModalOpen(true);
  };

  const closeAssignUserModal = () => {
    setAssignUserModalOpen(false);
    setAssignGroup(null);
  };

  const handleMenuAction = (actionKey, row) => {
    switch (actionKey) {
      case "edit-group":
        openEditModal(row);
        break;
      case "delete-group":
        const group = groups.find((g) => g.GroupId.toString() === row.id);
        setGroupToDelete(group);
        setDeleteError("");
        break;
      case "assign-user":
        const assignGroup = groups.find((g) => g.GroupId.toString() === row.id);
        openAssignUserModal(assignGroup);
        break;
      default:
        console.log(actionKey, row);
    }
  };

  const handleModalClose = () => {
    setModalOpen(false);
    setSelectedGroup(null);
    setModalError("");
  };

  const handleSave = async (groupData) => {
    try {
      if (modalMode === ADD_ACTION) {
        await addGroup(groupData).unwrap();
      } else if (modalMode === EDIT_ACTION && selectedGroup) {
        await updateGroup({ id: selectedGroup.GroupId, data: groupData }).unwrap();
      }
      handleModalClose();
    } catch (err) {
      setModalError(err?.data?.message || "Failed to save group.");
      console.error(err);
    }
  };

  const cancelDelete = () => {
    setGroupToDelete(null);
    setDeleteError("");
  };

  const confirmDelete = async () => {
    if (!groupToDelete) return;

    try {
      await deleteGroup(groupToDelete.GroupId).unwrap();
      setGroupToDelete(null);
      setDeleteError("");
    } catch (err) {
      setDeleteError(err?.data?.message || "Failed to delete group.");
      console.error(err);
    }
  };

  return (
    <div className="p-6 bg-white rounded-lg shadow">
      <button
        onClick={openAddModal}
        className="mb-4 px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
      >
        Add Group
      </button>

      <ListTable
        rows={rows}
        showEllipsis={true}
        menuItems={menuItems}
        onMenuAction={handleMenuAction}
        countLabel="Users"
      />

      <GroupModal
        isOpen={modalOpen}
        onClose={handleModalClose}
        onSave={handleSave}
        mode={modalMode}
        initialData={selectedGroup || {}}
        errorMessage={modalError}
      />

      <ConfirmationModal
        isOpen={!!groupToDelete}
        onCancel={cancelDelete}
        onConfirm={confirmDelete}
        title="Delete Confirmation"
        message={`Are you sure you want to delete group "${groupToDelete?.Name}"? This action cannot be undone.`}
      >
        {deleteError && (
          <p className="mt-2 text-red-600 text-sm font-semibold">{deleteError}</p>
        )}
      </ConfirmationModal>

      <Modal isOpen={assignUserModalOpen} onClose={closeAssignUserModal} title={`Assign Users to ${assignGroup?.Name || ''} ${assignGroup?.GroupId}`}>
        <Users groupId={assignGroup?.GroupId} onClose={closeAssignUserModal} isReuse={true} id={assignGroup?.GroupId} />
      </Modal>
    </div>
  );
};

export default Groups;
