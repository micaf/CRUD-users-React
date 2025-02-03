import React from "react";
import { User } from "../../models/User";
import UserInputField from "./UserInputField/UserInputField";
import UserFormButtons from "./UserFormButtons/UseFormButtons";
import styles from "./UserForm.module.css";

type UserFormProps = {
  user: Partial<User> | null;
  handleChange: (field: "username" | "email" | "phone", value: string) => void;
  onSave: () => void;
  onClose: () => void;
  formData: Partial<User>;
  errors: { [key in "username" | "email" | "phone"]?: string };
  formIsValid: boolean;
};

const fields: { key: "username" | "email" | "phone"; label: string; type?: string }[] = [
  { key: "username", label: "User Name" },
  { key: "email", label: "Email", type: "email" },
  { key: "phone", label: "Phone" }
];


const UserForm: React.FC<UserFormProps> = ({ user, formData, errors, formIsValid, handleChange, onSave, onClose }) => {

  return (
    <div className={styles.container}>
      <h2 className={styles.formTitle}>{user ? "Edit User" : "Add User"}</h2>
      <div className={styles.inputsContainer}>
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
      </div>
      <UserFormButtons onClose={onClose} onSave={onSave} formIsValid={formIsValid} />
    </div>
  );
};


export default UserForm;
