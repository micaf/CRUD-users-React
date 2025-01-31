import React from "react";
import UserCard from "./UserCard";
import ConfirmModal from "../shared/components/ConfirmModal";
import { useConfirmModal } from "../hooks/useConfirmModal";
import { useUsers } from "../context/UsersContext";
import { useUserFormNavigation } from "../hooks/useUserFormNavigation";

const UserList: React.FC = () => {
  const { users, removeUser } = useUsers();
  const { openUserForm } = useUserFormNavigation();
  const { isConfirmOpen, closeConfirmModal, handleDeleteUser } = useConfirmModal();

  return (
    <>
      <div className="user-list space-y-4">
        {users.map(user => (
          <UserCard key={user.id} user={user} onEdit={() => openUserForm(user)} onDelete={() => removeUser(user.id)} />
        ))}
      </div>

      <ConfirmModal isOpen={isConfirmOpen} onClose={closeConfirmModal} onConfirm={handleDeleteUser} message="Are you sure you want to delete this user?" title="Delete User" />
    </>
  );
};

export default UserList;
