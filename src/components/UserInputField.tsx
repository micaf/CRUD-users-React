import React from "react";

type UserInputFieldProps = {
  label: string;
  type?: string;
  value: string;
  error?: string;
  onChange: (value: string) => void;
};

const UserInputField: React.FC<UserInputFieldProps> = ({ label, type = "text", value, error, onChange }) => {
  return (
    <div>
      <input
        type={type}
        placeholder={label}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className={`input ${error ? "input-error" : ""}`}
      />
      {error && <p className="error-message">{error}</p>}
    </div>
  );
};

export default UserInputField;