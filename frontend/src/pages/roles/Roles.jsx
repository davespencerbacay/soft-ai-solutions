import React, { useState } from "react";
import ListTable from "../../components/Table/ListTable";
import {
  useGetRolesWithGroupsQuery,
  useAddRoleMutation,
  useUpdateRoleMutation,
  useDeleteRoleMutation,
  useAssignRolesPermissionMutation,
} from "../../slices/rolesApiSlice";  
import { ADD_ACTION, EDIT_ACTION } from "../../constants/constants";
import RoleModal from "./RoleModal";             
import ConfirmationModal from "../../components/ConfirmationModal/ConfirmationModal";
import Modal from "../../components/Modal/Modal";
import Permissions from "../permissions/Permissions";

const Roles = ({ isReuse, isCheckboxEnabled, checkboxHandler, selectedRoles }) => {
  const { data: roles = [], isLoading, isError } = useGetRolesWithGroupsQuery();
  const [addRole, { isLoading: isAdding }] = useAddRoleMutation();
  const [updateRole, { isLoading: isUpdating }] = useUpdateRoleMutation();
  const [deleteRole, { isLoading: isDeleting }] = useDeleteRoleMutation();
  const [assignRolesPermission] = useAssignRolesPermissionMutation();

  const [modalOpen, setModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState(ADD_ACTION);
  const [selectedRole, setSelectedRole] = useState(null);
  const [modalError, setModalError] = useState("");

  const [isPermissionModalOpen, setIsPermissionModalOpen] = useState(false);
  const [selectedPermissions, setSelectedPermissions] = useState([]);

  const [roleToDelete, setRoleToDelete] = useState(null);
  const [deleteError, setDeleteError] = useState("");

  if (isLoading || isAdding || isUpdating || isDeleting) return <p>Loading roles...</p>;
  if (isError) return <p>Error loading roles.</p>;

  const rows = roles.map((role) => ({
    title: role.Name,
    author: role.Description,
    date: new Date(role.CreatedDate).toLocaleDateString(),
    avatars: role.Groups ? role.Groups.map((group) => group.Name) : [],
    count: role.Groups ? role.Groups.length : 0,
    id: role.RoleId.toString(),
    badges: role.Permissions ? role.Permissions.map((perm) => perm.Name) : [],
  }));

  const menuItems = [
    { key: "assign-permissions", label: "Assign Permissions" },
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
      case "assign-permissions":
        const roleToAssign = roles.find((r) => r.RoleId.toString() === row.id);
        setSelectedRole(roleToAssign);
        setIsPermissionModalOpen(true);
        setSelectedPermissions(roleToAssign.Permissions.map((perm) => perm.PermissionId));
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

  const toggleCheckbox = (roleId) => {
    const idNum = parseInt(roleId, 10);

    setSelectedPermissions((prevPermissions) => {
      const updatedPermissions = prevPermissions.includes(idNum)
        ? prevPermissions.filter((id) => id !== idNum)
        : [...prevPermissions, idNum];

        assignRolesPermission({
          roleId: selectedRole?.RoleId,
          permissionIds: updatedPermissions
        })
        .unwrap()
      return updatedPermissions;
    });
  };

  return (
    <div className="p-6 bg-white rounded-lg shadow">
      {!isReuse ? (
        <button
          onClick={openAddModal}
          className="mb-4 px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
        >
          Add Role
        </button>
      ) : (
        <React.Fragment />
      )}

      <ListTable
        rows={rows}
        showEllipsis={true}
        menuItems={menuItems}
        onMenuAction={handleMenuAction}
        countLabel="Groups"
        isCheckboxEnabled={isCheckboxEnabled}
        checkboxHandler={checkboxHandler}
        selectedIds={selectedRoles}
        showCountLabel={false}
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

      <Modal isOpen={isPermissionModalOpen} title={`Assign Permissions to ${selectedRole?.Name || ''}`} onClose={() => setIsPermissionModalOpen(false)}>
        <Permissions
          selectedPermissions={selectedPermissions}
          onChange={setSelectedPermissions}
          isReuse={true}
          isCheckboxEnabled={true}
          checkboxHandler={toggleCheckbox}
        />
      </Modal>
    </div>
  );
};

export default Roles;
