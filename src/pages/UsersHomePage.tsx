import React from "react";
import UserList from "../components/UserList";
import UsersHeader from "../components/UserHeader";

const UsersHomePage: React.FC = () => {
  return (
    <div className="p-4 space-y-4">
      <UsersHeader />
      <UserList />
    </div>
  );
};

export default UsersHomePage;
