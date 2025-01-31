import React from "react";
import { User } from "../models/User";

type UserCardProps = {
  user: User;
  onEdit: () => void;
  onDelete: () => void
};

const UserCard: React.FC<UserCardProps> = ({ user, onEdit, onDelete }) => (
  <div className="card border p-4 flex justify-between items-center">
    <div>
      <p className="font-bold">{user.username}</p>
      <p>{user.email}</p>
      <p>{user.phone}</p>
      <p>{user.city}</p>
    </div>
    <div className="flex gap-2">
      <button className="btn btn-primary" onClick={onEdit}>Edit</button>
      <button className="btn btn-danger" onClick={onDelete}>Delete</button>
    </div>
  </div>
);


export default UserCard;