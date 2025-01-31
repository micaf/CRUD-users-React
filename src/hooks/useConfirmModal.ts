import { useState } from "react";
import { useUsers } from "../context/UsersContext"; 
export const useConfirmModal = () => {
  const { removeUser } = useUsers(); 
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);
  const [deletingUser, setDeletingUser] = useState<number | null>(null);

  const openConfirmModal = (id: number) => {
    setDeletingUser(id);
    setIsConfirmOpen(true);
  };

  const closeConfirmModal = () => {
    setDeletingUser(null);
    setIsConfirmOpen(false);
  };

  const handleDeleteUser = async () => {
    if (deletingUser !== null) {
      await removeUser(deletingUser); 
    }
    closeConfirmModal();
  };

  return {
    isConfirmOpen,
    openConfirmModal,
    closeConfirmModal,
    handleDeleteUser
  };
};
