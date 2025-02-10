import React, { useEffect, useState } from "react";
import { FaSearch } from "react-icons/fa";
import { IoCloseSharp } from "react-icons/io5";
import styles from "./UserSearchBar.module.css";

type UserSeachBarProps = {
  onSearch: (value: string) => void;
 onClear: () => void;
}

const UserSearchBar: React.FC<UserSeachBarProps> =(({onSearch, onClear}) => {
  const [query, setQuery] = useState("");

  useEffect(() => {
    const handler = setTimeout(() => {
      if (query.length > 0) {
        onSearch(query);
      } else {
        onClear();
      }
    }, 500);

    return () => clearTimeout(handler);
  }, [query]);

  const handleClear = () => {
    setQuery("");
    onClear();
  };

  return (
    <div className={styles.searchContainer}>
      <input
        type="text"
        placeholder="Search users..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className={styles.searchInput}
      />
      {query.length > 0 ? (
        <IoCloseSharp className={styles.iconClose} onClick={handleClear} />
      ) : (
        <FaSearch className={styles.icon} />
      )}
    </div>
  );
});

export default UserSearchBar;
