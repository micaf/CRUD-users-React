import React, { createContext, useContext, useEffect, useState } from "react";
import { User } from "../models/User";
import { useUsersApi } from "../hooks/useUsersAPI";

type UsersContextType = {
  users: User[];
  loading: boolean;
  error: string | null;
  addUser: (user: Partial<User>) => Promise<void>;
  modifyUser: (id: number, user: Partial<User>) => Promise<void>;
  removeUser: (id: number) => Promise<void>;
  fetchUsers: () => Promise<User[]>; 
};

const UsersContext = createContext<UsersContextType | undefined>(undefined);

export const UsersProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { fetchUsers, createUser, updateUser, deleteUser } = useUsersApi();
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    loadUsers();
  }, []);

  const loadUsers = async () => {
    setLoading(true);
    setError(null);
    try {
      const fetchedUsers = await fetchUsers();
      setUsers(fetchedUsers);
    } catch (err) {
      setError("Failed to fetch users.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const addUser = async (newUser: Partial<User>) => {
    setLoading(true);
    try {
      const createdUser = await createUser(newUser);
      setUsers((prevUsers) => [createdUser, ...prevUsers]);
    } catch (err) {
      setError("Error creating user");
    } finally {
      setLoading(false);
    }
  };

  const modifyUser = async (id: number, updatedUser: Partial<User>) => {
    setLoading(true);
    try {
      const updatedUserData = await updateUser(id, updatedUser);
      setUsers((prevUsers) =>
        prevUsers.map((user) => (user.id === id ? updatedUserData : user))
      );
    } catch (err) {
      setError("Error updating user");
    } finally {
      setLoading(false);
    }
  };

  const removeUser = async (id: number) => {
    setLoading(true);
    try {
      await deleteUser(id);
      setUsers((prevUsers) => prevUsers.filter((user) => user.id !== id));
    } catch (err) {
      setError("Error deleting user");
    } finally {
      setLoading(false);
    }
  };

  return (
    <UsersContext.Provider value={{ users, loading, error, addUser, modifyUser, removeUser, fetchUsers }}>
      {children}
    </UsersContext.Provider>
  );
};

export const useUsers = () => {
  const context = useContext(UsersContext);
  if (!context) {
    throw new Error("useUsers must be used within a UsersProvider");
  }
  return context;
};
