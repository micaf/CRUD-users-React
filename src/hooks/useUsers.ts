import { useEffect, useState } from "react";
import { User, UserApiResponse, mapUserFromApi } from "../models/User";
import { API_URL } from "../config/contants";
import axios from "axios";


export const useUsers = () => {
    const [users, setUsers] = useState<User[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
  
    useEffect(() => {
      const fetchUsers = async () => {
        setLoading(true);
        setError(null);
        try {
          const response = await axios.get<UserApiResponse[]>(API_URL);
          const mappedUsers = response.data.map(mapUserFromApi);
          setUsers(mappedUsers);
        } catch (err) {
          setError("Failed to fetch users.");
          console.error(err);
        } finally {
          setLoading(false);
        }
      };
      fetchUsers();
    }, []);
  
    const createUser = async (newUser: Partial<User>) => {
      setLoading(true);
      try {
        const response = await axios.post<UserApiResponse>(API_URL, newUser);
        setUsers([...users, mapUserFromApi(response.data)]);
      } catch (err) {
        setError("Error creating user");
      }
      finally {
        setLoading(false);
      }
    };
  
    const updateUser = async (id: number, updatedUser: Partial<User>) => {
    setLoading(true);
      try {
        const response = await axios.put<UserApiResponse>(`${API_URL}/${id}`, updatedUser);
        setUsers(users.map(user => (user.id === id ? mapUserFromApi(response.data) : user)));
      } catch (err) {
        setError("Error updating user");
      } finally {
        setLoading(false);
      }
    };
  
    const deleteUser = async (id: number) => {
        setLoading(true);
      try {
        await axios.delete(`${API_URL}/${id}`);
        setUsers(users.filter(user => user.id !== id));
      } catch (err) {
        setError("Error deleting user");
      } finally {
        setLoading(false);
      }
    };
  
    return { users, loading, error, createUser, updateUser, deleteUser };
  };