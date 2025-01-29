import React, { useState } from "react";
import { User } from "../models/User";
import { useUsers } from "../hooks/useUsers";
import UserFormModal from "./UserFormModal";
import UserList from "./UserList";
import ReactModal from 'react-modal';
import ConfirmModal from "./shared/ConfirmModal";

ReactModal.setAppElement("#root");

const UsersHome: React.FC = () => {
  const { users, loading, error, createUser, updateUser, deleteUser } = useUsers();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isConfirmOpen, setIsConfirmOpen] = useState<boolean>(false);
  const [editingUser, setEditingUser] = useState<User | null>(null);
  const [deletingUser, setDeletingUser] = useState<number | null>(null);

  const handleOpenModal = (user?: User) => {
    setEditingUser(user || null);
    setIsModalOpen(true);
  };

  const handleOpenConfirmModal = (id: number) => {
    setDeletingUser(id || null)
    setIsConfirmOpen(true);
  };

  const handleCloseModal = () => {
    setEditingUser(null);
    setIsModalOpen(false);
  };

  const handleCloseConfirmModal = () => {
    setEditingUser(null);
    setIsConfirmOpen(false);
  };

  const handleSaveUser = (user: Partial<User>) => {
    if (editingUser) {
      updateUser(editingUser.id, user);
    } else {
      createUser(user);
    }
    handleCloseModal();
  };

  const handleDeleteUser = () => {
    if (deletingUser) {
      deleteUser(deletingUser);
    }
    handleCloseConfirmModal();
  };

  return (
    <div className="p-4 space-y-4">
      <h1 className="text-xl font-bold">User Management</h1>
      <button className="btn btn-primary" onClick={() => handleOpenModal()}>Add User</button>

      {loading && <p>Loading...</p>}
      {error && <p className="text-red-500">{error}</p>}
      <UserList users={users} onEdit={handleOpenModal} onDelete={handleOpenConfirmModal} />

      <ReactModal
        isOpen={isModalOpen}
        onRequestClose={() => setIsModalOpen(false)}
        style={{
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
        }}
      >
        <UserFormModal
          user={editingUser}
          onClose={handleCloseModal}
          onSave={handleSaveUser}
        />
      </ReactModal>

      <ConfirmModal
        isOpen={isConfirmOpen}
        onClose={() => setIsConfirmOpen(false)}
        onConfirm={() => handleDeleteUser()}
        message="¿Estás seguro de que deseas eliminar este usuario?"
      />
    </div>
  );
};



export default UsersHome;