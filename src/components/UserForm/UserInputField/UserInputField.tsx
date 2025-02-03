import React from "react";
import styles from "./UserInputField.module.css";

type UserInputFieldProps = {
  label: string;
  type?: string;
  value: string;
  error?: string;
  onChange: (value: string) => void;
};

const UserInputField: React.FC<UserInputFieldProps> = ({ label, type = "text", value, error, onChange }) => {
  return (
    <div className={styles.inputGroup}>
    <input
      type={type}
      placeholder={label}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className={`${styles.input} ${error ? styles.inputError : ""}`}
    />
    {error && <p className={styles.errorMessage}>{error}</p>}
  </div>
  );
};

export default UserInputField;