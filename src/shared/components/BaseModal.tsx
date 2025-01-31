import React from "react";
import ReactModal from "react-modal";

type BaseModalProps = {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
  customStyles?: ReactModal.Styles; 
};

const BaseModal: React.FC<BaseModalProps> = ({ isOpen, onClose, children, customStyles }) => {
  const defaultStyles: ReactModal.Styles = {
    overlay: { backgroundColor: "rgba(0, 0, 0, 0.5)" },
    content: {
      top: "50%",
      left: "50%",
      right: "auto",
      bottom: "auto",
      marginRight: "-50%",
      transform: "translate(-50%, -50%)",
      width: "400px",
      padding: "20px",
    },
  };

  return (
    <ReactModal
      isOpen={isOpen}
      onRequestClose={onClose}
      style={{
        overlay: { ...defaultStyles.overlay, ...customStyles?.overlay },
        content: { ...defaultStyles.content, ...customStyles?.content },
      }}
    >
      {children}
    </ReactModal>
  );
};

export default BaseModal;