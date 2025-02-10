import React, { createContext, useContext, useState } from "react";
import { Pagination, User } from "../models/User";
import { useUsersApi } from "../hooks/useUsersAPI";

type UsersContextType = {
  users: User[];
  pagination: Pagination | null;
  loading: boolean;
  error: string | null;
  addUser: (user: Partial<User>) => Promise<void>;
  modifyUser: (id: number, user: Partial<User>) => Promise<void>;
  removeUser: (id: number) => Promise<void>;
  loadUsers: (skip: number) => Promise<void>;
  searchUser: (query: string, skip: number) => Promise<void>;
};

const UsersContext = createContext<UsersContextType | undefined>(undefined);

export const UsersProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { fetchUsers, searchUsers, createUser, updateUser, deleteUser } = useUsersApi();
  const [users, setUsers] = useState<User[]>([]);
  const [pagination, setPagination] = useState<Pagination | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const loadUsers = async (skip: number) => {
    setLoading(true);
    setError(null);
    try {
      const fetchedUsers = await fetchUsers(skip);
      const { users, ...pagination } = fetchedUsers;
      setUsers(users);
      setPagination(pagination)
    } catch (err) {
      setError("Failed to fetch users.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const searchUser = async (query: string, skip: number) => {
    setLoading(true);
    setError(null);
    try {
      const searchedUsers = await searchUsers(query, skip);
      const { users, ...pagination } = searchedUsers;
      setUsers(users);
      setPagination(pagination)
    } catch (err) {
      setError("Failed to search users.");
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
    <UsersContext.Provider value={{ users, loading, error, pagination,  addUser, modifyUser, removeUser, loadUsers, searchUser }}>
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
