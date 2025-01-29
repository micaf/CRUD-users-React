import React from "react";
import ReactModal from "react-modal";

interface ConfirmModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  message: string;
}

const ConfirmModal: React.FC<ConfirmModalProps> = ({ isOpen, onClose, onConfirm, message }) => {
  return (
    <ReactModal
      isOpen={isOpen}
      onRequestClose={onClose}
      style={{
        overlay: { backgroundColor: "rgba(0, 0, 0, 0.5)" },
        content: {
          top: "50%",
          left: "50%",
          right: "auto",
          bottom: "auto",
          marginRight: "-50%",
          transform: "translate(-50%, -50%)",
          width: "350px",
          padding: "20px",
          textAlign: "center",
        },
      }}
    >
      <h3>Confirmación</h3>
      <p>{message}</p>
      <div style={{ display: "flex", justifyContent: "space-around", marginTop: "20px" }}>
        <button
          onClick={onConfirm}
          style={{ padding: "10px 20px", background: "red", color: "white", border: "none", cursor: "pointer" }}
        >
          Aceptar
        </button>
        <button
          onClick={onClose}
          style={{ padding: "10px 20px", background: "gray", color: "white", border: "none", cursor: "pointer" }}
        >
          Cancelar
        </button>
      </div>
    </ReactModal>
  );
};

export default ConfirmModal;
