import axios from "axios";
import { User, UserApiResponse, Users, mapUserFromApi } from "../models/User";
import { API_URL } from "../config/contants";

export const useUsersApi = () => {
    const fetchUsers = async (): Promise<User[]> => {
        const response = await axios.get<UserApiResponse>(API_URL);
        return response.data.users.map(mapUserFromApi);
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

    return { fetchUsers, createUser, updateUser, deleteUser };
};