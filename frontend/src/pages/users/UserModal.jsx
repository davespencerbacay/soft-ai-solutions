import { useState, useEffect } from "react";
import { ADD_ACTION } from "../../constants/constants";

const UserModal = ({ isOpen, onClose, onSave, mode = ADD_ACTION, initialData = {}, errorMessage }) => {
  const [firstName, setFirstName] = useState(initialData.FirstName || "");
  const [lastName, setLastName] = useState(initialData.LastName || "");
  const [emailAddress, setEmailAddress] = useState(initialData.EmailAddress || "");
  const [bio, setBio] = useState(initialData.Bio || "");
  const [password, setPassword] = useState("");

  useEffect(() => {
    if (isOpen) {
      if (mode === ADD_ACTION) {
        setFirstName("");
        setLastName("");
        setEmailAddress("");
        setBio("");
        setPassword("");
      } else {
        setFirstName(initialData.FirstName || "");
        setLastName(initialData.LastName || "");
        setEmailAddress(initialData.EmailAddress || "");
        setBio(initialData.Bio || "");
        setPassword("");
      }
    }
  }, [isOpen, initialData, mode]);


  const handleSubmit = (e) => {
    e.preventDefault();

    const userData = {
      firstName: firstName,
      lastName: lastName,
      emailAddress: emailAddress,
      bio: bio,
    };

    if (mode === ADD_ACTION) {
      userData.password = password; // Only for add mode
    }

    onSave(userData);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded shadow-lg w-full max-w-md">
        <h2 className="text-lg font-semibold mb-4">{mode === ADD_ACTION ? "Add New User" : "Edit User"}</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            required
            placeholder="First Name"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            className="w-full px-3 py-2 border rounded"
          />
          <input
            type="text"
            required
            placeholder="Last Name"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            className="w-full px-3 py-2 border rounded"
          />
          <input
            type="email"
            required
            placeholder="Email Address"
            value={emailAddress}
            onChange={(e) => setEmailAddress(e.target.value)}
            className="w-full px-3 py-2 border rounded"
          />
          <textarea
            placeholder="Bio"
            value={bio}
            onChange={(e) => setBio(e.target.value)}
            className="w-full px-3 py-2 border rounded"
          />

          {mode === ADD_ACTION && (
            <input
              type="password"
              required
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-3 py-2 border rounded"
            />
          )}

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

export default UserModal;
