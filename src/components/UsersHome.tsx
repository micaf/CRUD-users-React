import React, { useState } from "react";
import { User } from "../models/User";
import { useUsers } from "../hooks/useUsers";
import UserFormModal from "./UserFormModal";
import UserList from "./UserList";
import ReactModal from 'react-modal';

ReactModal.setAppElement("#root");

const UsersHome: React.FC = () => {
  const { users, loading, error, createUser, updateUser, deleteUser } = useUsers();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingUser, setEditingUser] = useState<User | null>(null);

  const handleOpenModal = (user?: User) => {
    setEditingUser(user || null);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setEditingUser(null);
    setIsModalOpen(false);
  };

  const handleSaveUser = (user: Partial<User>) => {
    if (editingUser) {
      updateUser(editingUser.id, user);
    } else {
      createUser(user);
    }
    handleCloseModal();
  };

  return (
    <div className="p-4 space-y-4">
      <h1 className="text-xl font-bold">User Management</h1>
      <button className="btn btn-primary" onClick={() => handleOpenModal()}>Add User</button>

      {loading && <p>Loading...</p>}
      {error && <p className="text-red-500">{error}</p>}
      <UserList users={users} onEdit={handleOpenModal} onDelete={deleteUser} />

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
    </div>
  );
};



export default UsersHome;