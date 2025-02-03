import React, { useState } from "react";
import { useUsers } from "../../context/UsersContext";

const SearchBar = React.memo(() => {
  const { fetchUsers } = useUsers();
  const [query, setQuery] = useState("");

  
  return (
    <input
      type="text"
      placeholder="Buscar usuarios..."
      value={query}
      onChange={(e)=>setQuery(e.target.value)}
      style={{
        width: "100%",
        padding: "10px",
        fontSize: "16px",
        borderRadius: "5px",
        border: "1px solid #ccc",
        marginBottom: "10px",
      }}
    />
  );
});

export default SearchBar;
