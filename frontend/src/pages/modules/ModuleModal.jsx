import { useState, useEffect } from "react";

const ModuleModal = ({ isOpen, onClose, onSave, mode, initialData = {}, errorMessage }) => {
  const [name, setName] = useState(initialData.Name || "");
  const [description, setDescription] = useState(initialData.Description || "");

  useEffect(() => {
    if (isOpen) {
      setName(initialData.Name || "");
      setDescription(initialData.Description || "");
    }
  }, [isOpen, initialData]);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave({ name: name, description: description });
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded shadow-lg w-full max-w-md">
        <h2 className="text-lg font-semibold mb-4">{mode === "add" ? "Add Module" : "Edit Module"}</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            required
            placeholder="Module Name"
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
            <button type="button" onClick={onClose} className="px-4 py-2 border rounded">
              Cancel
            </button>
            <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ModuleModal;
