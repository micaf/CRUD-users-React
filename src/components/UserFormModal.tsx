import React, { useState } from "react";
import { User } from "../models/User";

const UserFormModal: React.FC<{ user?: User | null; onClose: () => void; onSave: (user: Partial<User>) => void }> = ({ user, onClose, onSave }) => {
  const [formData, setFormData] = useState<Partial<User>>(user || {});

  const handleChange = (field: keyof User, value: string) => {
    setFormData({ ...formData, [field]: value });
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
      <div className="bg-white p-4 rounded w-1/3">
        <h2 className="text-lg font-bold">{user ? "Edit User" : "Add User"}</h2>
        <input
          type="text"
          placeholder="Name"
          value={formData.name || ""}
          onChange={e => handleChange("name", e.target.value)}
          className="input my-2"
        />
        <input
          type="email"
          placeholder="Email"
          value={formData.email || ""}
          onChange={e => handleChange("email", e.target.value)}
          className="input my-2"
        />
        <input
          type="text"
          placeholder="Phone"
          value={formData.phone || ""}
          onChange={e => handleChange("phone", e.target.value)}
          className="input my-2"
        />
        <input
          type="text"
          placeholder="City"
          value={formData.city || ""}
          onChange={e => handleChange("city", e.target.value)}
          className="input my-2"
        />
        <div className="flex justify-end gap-2 mt-4">
          <button className="btn btn-secondary" onClick={onClose}>Cancel</button>
          <button className="btn btn-primary" onClick={() => onSave(formData)}>Save</button>
        </div>
      </div>
    </div>
  );
};


export default UserFormModal;