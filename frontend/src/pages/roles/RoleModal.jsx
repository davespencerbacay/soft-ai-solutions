import { useState, useEffect } from "react";
import { ADD_ACTION, EDIT_ACTION } from "../../constants/constants";

const RoleModal = ({
  isOpen,
  onClose,
  onSave,
  mode = EDIT_ACTION,
  initialData = {},
  errorMessage,
}) => {
  const [name, setName] = useState(initialData.Name || "");
  const [description, setDescription] = useState(initialData.Description || "");

  useEffect(() => {
    if (isOpen) {
      if (mode === ADD_ACTION) {
        setName("");
        setDescription("");
      } else {
        setName(initialData.Name || "");
        setDescription(initialData.Description || "");
      }
    }
  }, [isOpen, initialData, mode]);

  const handleSubmit = (e) => {
    e.preventDefault();

    const roleData = {
      name: name.trim(),
      description: description.trim(),
    };

    onSave(roleData);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded shadow-lg w-full max-w-md">
        <h2 className="text-lg font-semibold mb-4">
          {mode === ADD_ACTION ? "Add New Group" : "Edit Group"}
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            required
            placeholder="Group Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full px-3 py-2 border rounded"
          />
          <textarea
            placeholder="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full px-3 py-2 border rounded"
          />

          {errorMessage && (
            <p className="text-red-600 text-sm font-semibold">{errorMessage}</p>
          )}

          <div className="flex justify-end gap-4">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 border rounded"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
            >
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default RoleModal;
