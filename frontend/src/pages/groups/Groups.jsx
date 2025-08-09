import React, { useState } from "react";
import ListTable from "../../components/Table/ListTable";
import {
  useGetGroupsWithUsersQuery,
  useAddGroupMutation,
  useUpdateGroupMutation,
  useDeleteGroupMutation,
  useAssignGroupRolesMutation,
} from "../../slices/groupsApiSlice";
import { ADD_ACTION, EDIT_ACTION } from "../../constants/constants";
import GroupModal from "./GroupModal";
import ConfirmationModal from "../../components/ConfirmationModal/ConfirmationModal";
import Users from "../users/Users";
import Roles from "../roles/Roles"; // import Roles component
import Modal from "../../components/Modal/Modal";

const Groups = () => {
  const { data: groups = [], isLoading, isError } = useGetGroupsWithUsersQuery();
  const [addGroup, { isLoading: isAdding }] = useAddGroupMutation();
  const [updateGroup, { isLoading: isUpdating }] = useUpdateGroupMutation();
  const [deleteGroup, { isLoading: isDeleting }] = useDeleteGroupMutation();
  const [assignGroupRoles] = useAssignGroupRolesMutation();

  const [modalOpen, setModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState(ADD_ACTION);
  const [selectedGroup, setSelectedGroup] = useState(null);
  const [selectedRoles, setSelectedRoles] = useState([]);
  const [modalError, setModalError] = useState("");

  const [assignUserModalOpen, setAssignUserModalOpen] = useState(false);
  const [assignGroup, setAssignGroup] = useState(null);

  const [assignRoleModalOpen, setAssignRoleModalOpen] = useState(false);
  const [assignRoleGroup, setAssignRoleGroup] = useState(null);

  const [groupToDelete, setGroupToDelete] = useState(null);
  const [deleteError, setDeleteError] = useState("");

  if (isLoading || isUpdating || isDeleting || isAdding) return <p>Loading groups...</p>;
  if (isError) return <p>Error loading groups.</p>;

  const rows = groups.map((group) => ({
    title: group.Name,
    author: group.Description,
    date: new Date(group.CreatedDate).toLocaleDateString(),
    avatars: group.Users ? group.Users.map((user) => `${user.FirstName} ${user.LastName}`) : [],
    count: group.Users ? group.Users.length : 0,
    id: group.GroupId.toString(),
    badges: group.Roles ? group.Roles.map((role) => role.Name) : [],
  }));

  const menuItems = [
    { key: "assign-user", label: "Assign User" },
    { key: "assign-role", label: "Assign Role" },
    { key: "edit-group", label: "Edit Group" },
    { key: "delete-group", label: "Delete Group" },
  ];

  const openAddModal = () => {
    setSelectedGroup(null);
    setSelectedRoles([]);
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

  const openAssignRoleModal = (group) => {
    setAssignRoleGroup(group);
    setSelectedRoles(group.Roles ? group.Roles.map(role => role.RoleId) : []);
    setAssignRoleModalOpen(true);
  };

  const closeAssignRoleModal = () => {
    setAssignRoleModalOpen(false);
    setAssignRoleGroup(null);
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
        const assignUserGroup = groups.find((g) => g.GroupId.toString() === row.id);
        openAssignUserModal(assignUserGroup);
        break;
      case "assign-role":
        const assignRoleGroup = groups.find((g) => g.GroupId.toString() === row.id);
        openAssignRoleModal(assignRoleGroup);
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
  
  // Only trigger API once after state is calculated
      // assignGroupRoles({
      //   groupId: assignRoleGroup?.GroupId,
      //   roleIds: updatedRoles
      // })
      //   .unwrap()
      //   .then(() => {
      //     console.log("Roles assigned successfully:", updatedRoles);
      //   })
      //   .catch((error) => {
      //     console.error("Failed to assign roles:", error);
      //   });
      
  const toggleCheckbox = (roleId) => {
    const idNum = parseInt(roleId, 10);

    setSelectedRoles((prevRoles) => {
      const updatedRoles = prevRoles.includes(idNum)
        ? prevRoles.filter((id) => id !== idNum) // Remove if unchecked
        : [...prevRoles, idNum]; // Add if checked
        assignGroupRoles({
          groupId: assignRoleGroup?.GroupId,
          roleIds: updatedRoles
        })
        .unwrap()
        .then(() => {
          console.log("Roles assigned successfully:", updatedRoles);
        })
        .catch((error) => {
          console.error("Failed to assign roles:", error);
        });
      
      return updatedRoles;
    });
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

      <Modal
        isOpen={assignUserModalOpen}
        onClose={closeAssignUserModal}
        title={`Assign Users to ${assignGroup?.Name || ''} #${assignGroup?.GroupId}`}
      >
        <Users
          groupId={assignGroup?.GroupId}
          onClose={closeAssignUserModal}
          isReuse={true}
          id={assignGroup?.GroupId}
        />
      </Modal>

      <Modal
        isOpen={assignRoleModalOpen}
        onClose={closeAssignRoleModal}
        title={`Assign Roles to ${assignRoleGroup?.Name || ''} #${assignRoleGroup?.GroupId}`}
      >
        <Roles
          groupId={assignRoleGroup?.GroupId}
          onClose={closeAssignRoleModal}
          isReuse={true}
          id={assignRoleGroup?.GroupId}
          isCheckboxEnabled={true}
          checkboxHandler={toggleCheckbox}
          selectedRoles={selectedRoles}
        />
      </Modal>
    </div>
  );
};

export default Groups;
