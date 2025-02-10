import axios from "axios";
import { User, UserApiResponse, Users, mapUserFromApi } from "../models/User";
import { API_URL } from "../config/contants";

export const useUsersApi = () => {
    const fetchUsers = async (skip: number): Promise<UserApiResponse> => {
        const response = await axios.get<UserApiResponse>(`${API_URL}?limit=6&skip=${skip}`);
        return response.data;
    };

    const searchUsers = async (query: string, skip: number): Promise<UserApiResponse> => {
        const response = await axios.get<UserApiResponse>(`${API_URL}/search?q=${query}&limit=6&skip=${skip}`);
        return response.data;
    };

    const createUser = async (newUser: Partial<User>): Promise<User> => {
        const response = await axios.post<Users>(`${API_URL}/add`, newUser);
        return mapUserFromApi(response.data);
    };

    const updateUser = async (id: number, updatedUser: Partial<User>): Promise<User> => {
        const response = await axios.put<Users>(`${API_URL}/${id}`, updatedUser);
        return mapUserFromApi(response.data);
    };

    const deleteUser = async (id: number): Promise<void> => {
        await axios.delete(`${API_URL}/${id}`);
    };

    return { fetchUsers, searchUsers, createUser, updateUser, deleteUser };
};