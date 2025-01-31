import React from "react";
import { User } from "../models/User";
import UserInputField from "./UserInputField";
import UserFormButtons from "./UseFormButtons";

type UserFormProps = {
  user: Partial<User> | null;
  handleChange: (field: "username" | "email" | "phone" | "city", value: string) => void;
  onSave: () => void;
  onClose: () => void;
  formData: Partial<User>;
  errors: { [key in "username" | "email" | "phone" | "city"]?: string };
  formIsValid: boolean;
};

const fields: { key: "username" | "email" | "phone" | "city"; label: string; type?: string }[] = [
  { key: "username", label: "User Name" },
  { key: "email", label: "Email", type: "email" },
  { key: "phone", label: "Phone" },
  { key: "city", label: "City" }
];


const UserForm: React.FC<UserFormProps> = ({ user, formData, errors, formIsValid , handleChange, onSave, onClose }) => {

  return (
    <>
      <h2>{user ? "Edit User" : "Add User"}</h2>

      {fields.map(({ key, label, type }) => (
        <UserInputField
          key={key}
          label={label}
          type={type}
          value={formData[key] || ""}
          error={errors[key]}
          onChange={(value) => handleChange(key, value)}
        />
      ))}

      <UserFormButtons onClose={onClose} onSave={onSave} formIsValid={formIsValid} />
    </>
  );
};


export default UserForm;
