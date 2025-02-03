import React from "react";
import { FaUsersGear } from "react-icons/fa6";
import styles from "./UserHeader.module.css"; 
const UsersHeader: React.FC = () => {
  return (
    <div className={styles.header}>
      <h2>User Management</h2>
      <FaUsersGear className={styles.iconUserManagment}/>
    </div>
  );
};

export default UsersHeader;
