import React, { useEffect, useState } from "react";
import UserCard from "../UserCard/UserCard";
import ConfirmModal from "../../shared/components/ConfirmModal";
import { useConfirmModal } from "../../hooks/useConfirmModal";
import { useUsers } from "../../context/UsersContext";
import { useUserFormNavigation } from "../../hooks/useUserFormNavigation";
import styles from "./UserList.module.css";
import UserSearchBar from "./UserSearchBar/UserSearchBar";
import Pagination from "react-js-pagination";

const UserList: React.FC = () => {
  const { users, loadUsers, searchUser, pagination } = useUsers();
  const [query, setQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [skip, setSkip] = useState(0);
  const { openUserForm } = useUserFormNavigation();
  const { isConfirmOpen, openConfirmModal, closeConfirmModal, handleDeleteUser } = useConfirmModal();
  const ITEMS_PER_PAGE = 6;
  const TOTAL_ITEMS = pagination?.total ?? 0;

  useEffect(() => {
    loadUsers(skip);
  }, [])

  useEffect(() => {
    searchUser(query, skip)
  }, [query])

  const handleClear = (() => {
    setSkip(0);
    setQuery("");
  })

  const handlePageChange = ((page: number) => {
    setCurrentPage(page);
    const limit = pagination?.limit || 0;
    const skipPages = page > 1 ? ((page - 1) * limit) : 0;
    setSkip(skipPages);
    if (query.length >= 1) {
      searchUser(query, skipPages)
    } else {
      loadUsers(skipPages);
    }
  })

  return (
    <div className={styles.userListContainer}>
      <div className={styles.userActions}>
        <UserSearchBar onSearch={(query) => setQuery(query)} onClear={handleClear} />
        <button className={`btn btn-primary ${styles.btnAddUser}`} onClick={() => openUserForm()}>
          Add User
        </button>
      </div>

      <div className={styles.userList}>
        {users.map(user => (
          <UserCard key={user.id} user={user} onEdit={() => openUserForm(user)} onDelete={() => openConfirmModal(user.id)} />
        ))}
      </div>
      <div className={styles.paginationWrapper}>
        <Pagination
          activePage={currentPage}
          itemsCountPerPage={ITEMS_PER_PAGE}
          totalItemsCount={TOTAL_ITEMS - 1}
          pageRangeDisplayed={5}
          onChange={handlePageChange}
          itemClass={styles.pageItem}
          linkClass={styles.pageLink}
          firstPageText="First"
          lastPageText="Last"
          prevPageText="Prev"
          nextPageText="Next"
          hideDisabled={true}
        />
      </div>

      <ConfirmModal isOpen={isConfirmOpen} onClose={closeConfirmModal} onConfirm={handleDeleteUser} message="Are you sure you want to delete this user?" title="Delete User" />
    </div>
  );
};

export default UserList;