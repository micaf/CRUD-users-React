import React from "react";
import BaseModal from "./BaseModal";

type ConfirmModalProps = {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title: string;
  message: string;
}

const ConfirmModal: React.FC<ConfirmModalProps> = ({ isOpen, onClose, onConfirm, message, title }) => {
  return (
    <BaseModal isOpen={isOpen} onClose={onClose}>
      <h3>{title}</h3>
      <p>{message}</p>
      <div style={{ display: "flex", justifyContent: "space-around", marginTop: "20px" }}>
        <button
          onClick={onConfirm}
          style={{ padding: "10px 20px", background: "red", color: "white", border: "none", cursor: "pointer" }}
        >
          OK
        </button>
        <button
          onClick={onClose}
          style={{ padding: "10px 20px", background: "gray", color: "white", border: "none", cursor: "pointer" }}
        >
          Cancel
        </button>
      </div>
    </BaseModal>

  );
};

export default ConfirmModal;
