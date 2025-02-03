import React from "react";
import UserCard from "../UserCard/UserCard";
import ConfirmModal from "../../shared/components/ConfirmModal";
import { useConfirmModal } from "../../hooks/useConfirmModal";
import { useUsers } from "../../context/UsersContext";
import { useUserFormNavigation } from "../../hooks/useUserFormNavigation";
import styles from "./UserList.module.css"; 
import UserSearchBar from "../UserSearchBar/UserSearchBar";

const UserList: React.FC = () => {
  const { users } = useUsers();
  const { openUserForm } = useUserFormNavigation();
  const { isConfirmOpen, openConfirmModal, closeConfirmModal, handleDeleteUser } = useConfirmModal();

  return (
    <div className={styles.userListContainer}>
     <button className={`btn btn-primary ${styles.btnAddUser}`} onClick={() => openUserForm()}>
  Add User
</button>
<UserSearchBar />
      <div className={styles.userList}>
        {users.map(user => (
          <UserCard key={user.id} user={user} onEdit={() => openUserForm(user)} onDelete={() => openConfirmModal(user.id)} />
        ))}
      </div>

      <ConfirmModal isOpen={isConfirmOpen} onClose={closeConfirmModal} onConfirm={handleDeleteUser} message="Are you sure you want to delete this user?" title="Delete User" />
    </div>
  );
};

export default UserList;