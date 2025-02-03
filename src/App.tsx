
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import './App.css'
import UsersHomePage from "./pages/UsersHomePage";
import UserFormPage from "./pages/UserFormPage";
import { UsersProvider } from "./context/UsersContext";
import UsersHeader from "./components/UserHeader/UserHeader";

function App() {

  return (
    <Router>
      <UsersProvider>
      <UsersHeader />
        <Routes>
          <Route path="/" element={<Navigate to="/users" replace />} />
          <Route path="/users" element={<UsersHomePage />} />
          <Route path="/users/add" element={<UserFormPage />} />
          <Route path="/users/:id/edit" element={<UserFormPage />} />
        </Routes>
      </UsersProvider>
    </Router>
  )
}

export default App
