import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { User } from "../models/User";
import { validateField } from "../shared/utils/validateFields";
import UserForm from "../components/UserForm";
import { useUsers } from "../context/UsersContext"; 
import { isFormValid } from "../hooks/useUserFormValidation";

const UserFormPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { users, addUser, modifyUser } = useUsers(); 

  const [formData, setFormData] = useState<Partial<User>>({});
  const [errors, setErrors] = useState<{ [key in "username" | "email" | "phone" | "city"]?: string }>({});
  const [formIsValid, setFormIsValid] = useState<boolean>(true);

  useEffect(() => {
    if (id && users.length > 0) { // 🔥 Asegurar que `users` ya está cargado
      const userToEdit = users.find((u) => u.id === parseInt(id));
      if (userToEdit) {
        setFormData(userToEdit);
      }
    }
  }, [id, users]);

  const handleChange = (field: "username" | "email" | "phone" | "city", value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    setErrors((prev) => ({ ...prev, [field]: validateField(field, value) }));
    setFormIsValid(isFormValid(formData, errors));
  };

  const handleSubmit = async () => {
    if (id) {
      await modifyUser(parseInt(id), formData); 
    } else {
      await addUser(formData); 
    }
    navigate("/users"); 
  };

  return (
    <UserForm
      user={id ? formData : null}
      formData={formData}
      errors={errors}
      formIsValid={formIsValid}
      handleChange={handleChange}
      onSave={handleSubmit}
      onClose={() => navigate("/users")}
    />
  );
};

export default UserFormPage;
