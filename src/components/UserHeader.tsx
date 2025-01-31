import React from "react";
import { useUserFormNavigation } from "../hooks/useUserFormNavigation";


const UsersHeader: React.FC = () => {
  const { openUserForm } = useUserFormNavigation();
  return (
    <div>
      <h1 className="text-xl font-bold">User Management</h1>
      <button className="btn btn-primary" onClick={()=>openUserForm()}>Add User</button>
    </div>
  );
};

export default UsersHeader;
