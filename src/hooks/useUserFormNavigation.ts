import { useNavigate } from "react-router-dom";
import { User } from "../models/User";
import { useUsers } from "../context/UsersContext";

export const useUserFormNavigation = () => {
  const { addUser, modifyUser } = useUsers();
  const navigate = useNavigate();

  const openUserForm = (user?: User) => {
    if (user) {
      navigate(`/users/${user.id}/edit`); 
    } else {
      navigate("/users/add"); 
    }
  };

  const handleSaveUser = async (user: Partial<User>, editingUser?: User) => {
    if (editingUser) {
      await modifyUser(editingUser.id, user);
    } else {
      await addUser(user);
    }
    navigate("/users"); 
  };

  return {
    openUserForm,
    handleSaveUser
  };
};
