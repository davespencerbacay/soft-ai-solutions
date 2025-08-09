import { useState } from "react";
import ListTable from "../../components/Table/ListTable"; 
import {
  useGetModulesQuery,
  useAddModuleMutation,
  useUpdateModuleMutation,
  useDeleteModuleMutation,
} from "../../slices/modulesApiSlice";
import ModuleModal from "./ModuleModal";
import ConfirmationModal from "../../components/ConfirmationModal/ConfirmationModal";

const Modules = () => {
  const { data: modules = [], isLoading, isError } = useGetModulesQuery();
  const [addModule] = useAddModuleMutation();
  const [updateModule] = useUpdateModuleMutation();
  const [deleteModule] = useDeleteModuleMutation();

  const [modalOpen, setModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState("add"); // 'add' or 'edit'
  const [selectedModule, setSelectedModule] = useState(null);
  const [modalError, setModalError] = useState("");

  const [moduleToDelete, setModuleToDelete] = useState(null);
  const [deleteError, setDeleteError] = useState("");

  if (isLoading) return <p>Loading modules...</p>;
  if (isError) return <p>Error loading modules.</p>;

  const rows = modules.map((mod) => ({
    title: mod.Name,
    author: mod.Description,
    date: new Date(mod.CreatedDate).toLocaleDateString(),
    count: 0, // adjust if needed
    id: mod.ModuleId.toString(),
  }));

  const menuItems = [
    { key: "edit-module", label: "Edit Module" },
    { key: "delete-module", label: "Delete Module" },
  ];

  const openAddModal = () => {
    setSelectedModule(null);
    setModalMode("add");
    setModalError("");
    setModalOpen(true);
  };

  const openEditModal = (row) => {
    const mod = modules.find((m) => m.ModuleId.toString() === row.id);
    setSelectedModule(mod);
    setModalMode("edit");
    setModalError("");
    setModalOpen(true);
  };

  const handleModalClose = () => {
    setModalOpen(false);
    setSelectedModule(null);
    setModalError("");
  };

  const handleSave = async (moduleData) => {
    try {
      if (modalMode === "add") {
        await addModule(moduleData).unwrap();
      } else if (modalMode === "edit" && selectedModule) {
        await updateModule({ id: selectedModule.ModuleId, data: moduleData }).unwrap();
      }
      handleModalClose();
    } catch (err) {
      setModalError(err?.data?.message || "Failed to save module.");
      console.error(err);
    }
  };

  const cancelDelete = () => {
    setModuleToDelete(null);
    setDeleteError("");
  };

  const confirmDelete = async () => {
    if (!moduleToDelete) return;
    try {
      await deleteModule(moduleToDelete.ModuleId).unwrap();
      setModuleToDelete(null);
      setDeleteError("");
    } catch (err) {
      setDeleteError(err?.data?.message || "Failed to delete module.");
      console.error(err);
    }
  };

  const handleMenuAction = (actionKey, row) => {
    switch (actionKey) {
      case "edit-module":
        openEditModal(row);
        break;
      case "delete-module":
        const mod = modules.find((m) => m.ModuleId.toString() === row.id);
        setModuleToDelete(mod);
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
        Add Module
      </button>

      <ListTable
        rows={rows}
        showEllipsis={true}
        menuItems={menuItems}
        onMenuAction={handleMenuAction}
        showCountLabel={false}
      />

      <ModuleModal
        isOpen={modalOpen}
        onClose={handleModalClose}
        onSave={handleSave}
        mode={modalMode}
        initialData={selectedModule || {}}
        errorMessage={modalError}
      />

      <ConfirmationModal
        isOpen={!!moduleToDelete}
        onCancel={cancelDelete}
        onConfirm={confirmDelete}
        title="Delete Confirmation"
        message={`Are you sure you want to delete module "${moduleToDelete?.Name}"? This action cannot be undone.`}
      >
        {deleteError && (
          <p className="mt-2 text-red-600 text-sm font-semibold">{deleteError}</p>
        )}
      </ConfirmationModal>
    </div>
  );
};

export default Modules;
