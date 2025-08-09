import { useState } from "react";
import ListTable from "../../components/Table/ListTable";
import {
  useGetRolesWithGroupsQuery,
  useAddRoleMutation,
  useUpdateRoleMutation,
  useDeleteRoleMutation,
} from "../../slices/rolesApiSlice";  // Assume this exists and mirrors groupsApiSlice
import { ADD_ACTION, EDIT_ACTION } from "../../constants/constants";
import RoleModal from "./RoleModal";             // Modal for Add/Edit Role
import ConfirmationModal from "../../components/ConfirmationModal/ConfirmationModal";
import Modal from "../../components/Modal/Modal";
import Groups from "../groups/Groups";           // Reuse your Groups component inside modal

const Roles = () => {
  const { data: roles = [], isLoading, isError } = useGetRolesWithGroupsQuery();
  const [addRole, { isLoading: isAdding }] = useAddRoleMutation();
  const [updateRole, { isLoading: isUpdating }] = useUpdateRoleMutation();
  const [deleteRole, { isLoading: isDeleting }] = useDeleteRoleMutation();

  const [modalOpen, setModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState(ADD_ACTION);
  const [selectedRole, setSelectedRole] = useState(null);
  const [modalError, setModalError] = useState("");

  const [assignGroupModalOpen, setAssignGroupModalOpen] = useState(false);
  const [assignRole, setAssignRole] = useState(null);

  const [roleToDelete, setRoleToDelete] = useState(null);
  const [deleteError, setDeleteError] = useState("");

  if (isLoading || isAdding || isUpdating || isDeleting) return <p>Loading roles...</p>;
  if (isError) return <p>Error loading roles.</p>;

  const rows = roles.map((role) => ({
    title: role.Name,
    author: role.Description,
    date: new Date(role.CreatedDate).toLocaleDateString(),
    avatars: role.Groups
      ? role.Groups.map((group) => group.Name)
      : [],
    count: role.Groups ? role.Groups.length : 0,
    id: role.RoleId.toString(),
  }));

  const menuItems = [
    { key: "assign-group", label: "Assign Group" },
    { key: "edit-role", label: "Edit Role" },
    { key: "delete-role", label: "Delete Role" },
  ];

  const openAddModal = () => {
    setSelectedRole(null);
    setModalMode(ADD_ACTION);
    setModalError("");
    setModalOpen(true);
  };

  const openEditModal = (row) => {
    const role = roles.find((r) => r.RoleId.toString() === row.id);
    setSelectedRole(role);
    setModalMode(EDIT_ACTION);
    setModalError("");
    setModalOpen(true);
  };

  const openAssignGroupModal = (role) => {
    setAssignRole(role);
    setAssignGroupModalOpen(true);
  };

  const closeAssignGroupModal = () => {
    setAssignGroupModalOpen(false);
    setAssignRole(null);
  };

  const handleMenuAction = (actionKey, row) => {
    switch (actionKey) {
      case "edit-role":
        openEditModal(row);
        break;
      case "delete-role":
        const role = roles.find((r) => r.RoleId.toString() === row.id);
        setRoleToDelete(role);
        setDeleteError("");
        break;
      case "assign-group":
        const assignRole = roles.find((r) => r.RoleId.toString() === row.id);
        openAssignGroupModal(assignRole);
        break;
      default:
        console.log(actionKey, row);
    }
  };

  const handleModalClose = () => {
    setModalOpen(false);
    setSelectedRole(null);
    setModalError("");
  };

  const handleSave = async (roleData) => {
    try {
      if (modalMode === ADD_ACTION) {
        await addRole(roleData).unwrap();
      } else if (modalMode === EDIT_ACTION && selectedRole) {
        await updateRole({ id: selectedRole.RoleId, data: roleData }).unwrap();
      }
      handleModalClose();
    } catch (err) {
      setModalError(err?.data?.message || "Failed to save role.");
      console.error(err);
    }
  };

  const cancelDelete = () => {
    setRoleToDelete(null);
    setDeleteError("");
  };

  const confirmDelete = async () => {
    if (!roleToDelete) return;
    try {
      await deleteRole(roleToDelete.RoleId).unwrap();
      setRoleToDelete(null);
      setDeleteError("");
    } catch (err) {
      setDeleteError(err?.data?.message || "Failed to delete role.");
      console.error(err);
    }
  };

  return (
    <div className="p-6 bg-white rounded-lg shadow">
      <button
        onClick={openAddModal}
        className="mb-4 px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
      >
        Add Role
      </button>

      <ListTable
        rows={rows}
        showEllipsis={true}
        menuItems={menuItems}
        onMenuAction={handleMenuAction}
        countLabel="Groups"
      />

      <RoleModal
        isOpen={modalOpen}
        onClose={handleModalClose}
        onSave={handleSave}
        mode={modalMode}
        initialData={selectedRole || {}}
        errorMessage={modalError}
      />

      <ConfirmationModal
        isOpen={!!roleToDelete}
        onCancel={cancelDelete}
        onConfirm={confirmDelete}
        title="Delete Confirmation"
        message={`Are you sure you want to delete role "${roleToDelete?.Name}"? This action cannot be undone.`}
      >
        {deleteError && (
          <p className="mt-2 text-red-600 text-sm font-semibold">{deleteError}</p>
        )}
      </ConfirmationModal>

      <Modal
        isOpen={assignGroupModalOpen}
        onClose={closeAssignGroupModal}
        title={`Assign Groups to ${assignRole?.Name || ''} ${assignRole?.RoleId}`}
      >
        <Groups groupId={assignRole?.RoleId} onClose={closeAssignGroupModal} isReuse={true} id={assignRole?.RoleId} />
      </Modal>
    </div>
  );
};

export default Roles;
