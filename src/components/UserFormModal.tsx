import React, { useState } from "react";
import { User } from "../models/User";

const UserFormModal: React.FC<{ 
  user?: User | null; 
  onClose: () => void; 
  onSave: (user: Partial<User>) => void; 
}> = ({ user, onClose, onSave }) => {
  
  const [formData, setFormData] = useState<Partial<User>>(user || {});
  const [errors, setErrors] = useState<{ [key in keyof User]?: string }>({});

  const validateField = (field: keyof User, value: string) => {
    let error = "";
    
    switch (field) {
      case "username":
        if (!value.trim()) error = "Username is required.";
        else if (value.length < 3) error = "Username must be at least 3 characters.";
        break;
      
      case "email":
        if (!value.trim()) error = "Email is required.";
        else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) error = "Invalid email format.";
        break;
      
      case "phone":
        if (!value.trim()) error = "Phone is required.";
        else if (!/^\d+$/.test(value)) error = "Phone must contain only numbers.";
        else if (value.length < 7) error = "Phone must be at least 7 digits.";
        break;
      
      case "city":
        if (!value.trim()) error = "City is required.";
        else if (value.length < 2) error = "City must be at least 2 characters.";
        break;
      
      default:
        break;
    }

    setErrors(prevErrors => ({ ...prevErrors, [field]: error }));
  };

  const handleChange = (field: keyof User, value: string) => {
    setFormData({ ...formData, [field]: value });
    validateField(field, value);
  };

  const isFormValid = Object.values(errors).every(error => !error) &&
                      formData.username &&
                      formData.email &&
                      formData.phone &&
                      formData.city;

  return (
    <div className="ReactModal__Overlay flex justify-center items-center">
      <div className="ReactModal__Content">
        <h2>{user ? "Edit User" : "Add User"}</h2>

        {/* Username */}
        <input
          type="text"
          placeholder="User Name"
          value={formData.username || ""}
          onChange={e => handleChange("username", e.target.value)}
          className={errors.username ? "input-error" : ""}
        />
        {errors.username && <p className="error-message">{errors.username}</p>}

        {/* Email */}
        <input
          type="email"
          placeholder="Email"
          value={formData.email || ""}
          onChange={e => handleChange("email", e.target.value)}
          className={errors.email ? "input-error" : ""}
        />
        {errors.email && <p className="error-message">{errors.email}</p>}

        {/* Phone */}
        <input
          type="text"
          placeholder="Phone"
          value={formData.phone || ""}
          onChange={e => handleChange("phone", e.target.value)}
          className={errors.phone ? "input-error" : ""}
        />
        {errors.phone && <p className="error-message">{errors.phone}</p>}

        {/* City */}
        <input
          type="text"
          placeholder="City"
          value={formData.city || ""}
          onChange={e => handleChange("city", e.target.value)}
          className={errors.city ? "input-error" : ""}
        />
        {errors.city && <p className="error-message">{errors.city}</p>}

        <div className="flex gap-2">
          <button className="secondary" onClick={onClose}>Cancel</button>
          <button 
            className="primary"
            onClick={() => isFormValid && onSave(formData)}
            disabled={!isFormValid}
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

export default UserFormModal;
