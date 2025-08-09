import { useState } from "react";
import ListTable from "../../components/Table/ListTable";
import {
  useGetPermissionsQuery,
  useAddPermissionMutation,
  useUpdatePermissionMutation,
  useDeletePermissionMutation,
} from "../../slices/permissionsApiSlice";
import PermissionModal from "./PermissionModal";
import ConfirmationModal from "../../components/ConfirmationModal/ConfirmationModal";

const Permissions = () => {
  const { data: permissions = [], isLoading, isError } = useGetPermissionsQuery();
  const [addPermission] = useAddPermissionMutation();
  const [updatePermission] = useUpdatePermissionMutation();
  const [deletePermission] = useDeletePermissionMutation();

  const [modalOpen, setModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState("add");
  const [selectedPermission, setSelectedPermission] = useState(null);
  const [modalError, setModalError] = useState("");

  const [permissionToDelete, setPermissionToDelete] = useState(null);
  const [deleteError, setDeleteError] = useState("");

  if (isLoading) return <p>Loading permissions...</p>;
  if (isError) return <p>Error loading permissions.</p>;

  const rows = permissions.map((perm) => ({
    title: perm.Name,
    author: perm.Description,
    date: new Date(perm.CreatedDate).toLocaleDateString(),
    count: 0,
    id: perm.PermissionId.toString(),
  }));

  const menuItems = [
    { key: "edit-permission", label: "Edit Permission" },
    { key: "delete-permission", label: "Delete Permission" },
  ];

  const openAddModal = () => {
    setSelectedPermission(null);
    setModalMode("add");
    setModalError("");
    setModalOpen(true);
  };

  const openEditModal = (row) => {
    const perm = permissions.find((p) => p.PermissionId.toString() === row.id);
    setSelectedPermission(perm);
    setModalMode("edit");
    setModalError("");
    setModalOpen(true);
  };

  const handleModalClose = () => {
    setModalOpen(false);
    setSelectedPermission(null);
    setModalError("");
  };

  const handleSave = async (permissionData) => {
    try {
      if (modalMode === "add") {
        await addPermission(permissionData).unwrap();
      } else if (modalMode === "edit" && selectedPermission) {
        await updatePermission({ id: selectedPermission.PermissionId, data: permissionData }).unwrap();
      }
      handleModalClose();
    } catch (err) {
      setModalError(err?.data?.message || "Failed to save permission.");
      console.error(err);
    }
  };

  const cancelDelete = () => {
    setPermissionToDelete(null);
    setDeleteError("");
  };

  const confirmDelete = async () => {
    if (!permissionToDelete) return;
    try {
      await deletePermission(permissionToDelete.PermissionId).unwrap();
      setPermissionToDelete(null);
      setDeleteError("");
    } catch (err) {
      setDeleteError(err?.data?.message || "Failed to delete permission.");
      console.error(err);
    }
  };

  const handleMenuAction = (actionKey, row) => {
    switch (actionKey) {
      case "edit-permission":
        openEditModal(row);
        break;
      case "delete-permission":
        const perm = permissions.find((p) => p.PermissionId.toString() === row.id);
        setPermissionToDelete(perm);
        setDeleteError("");
        break;
      default:
        console.log(actionKey, row);
    }
  };

  return (
    <div className="p-6 bg-white rounded-lg shadow">
      <button
        onClick={openAddModal}
        className="mb-4 px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
      >
        Add Permission
      </button>

      <ListTable
        rows={rows}
        showEllipsis={true}
        menuItems={menuItems}
        onMenuAction={handleMenuAction}
        showCountLabel={false}
      />

      <PermissionModal
        isOpen={modalOpen}
        onClose={handleModalClose}
        onSave={handleSave}
        mode={modalMode}
        initialData={selectedPermission || {}}
        errorMessage={modalError}
      />

      <ConfirmationModal
        isOpen={!!permissionToDelete}
        onCancel={cancelDelete}
        onConfirm={confirmDelete}
        title="Delete Confirmation"
        message={`Are you sure you want to delete permission "${permissionToDelete?.Name}"? This action cannot be undone.`}
      >
        {deleteError && (
          <p className="mt-2 text-red-600 text-sm font-semibold">{deleteError}</p>
        )}
      </ConfirmationModal>
    </div>
  );
};

export default Permissions;
