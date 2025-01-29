import React from "react";
import { User } from "../models/User";
import UserCard from "./UserCard";

type UserListProps = {
    users: User[];
    onEdit: (user: User) => void;
    onDelete: (id: number) => void;
  };
  
  const UserList: React.FC<UserListProps> = ({ users, onEdit, onDelete }) => {
    return (
      <div className="user-list space-y-4">
        {users.map(user => (
          <UserCard key={user.id} user={user} onEdit={() => onEdit(user)} onDelete={() => onDelete(user.id)} />
        ))}
      </div>
    );
  };
  
  export default UserList;
  