import { User } from "../models/User";


export const isFormValid = (
  formData: Partial<User>, 
  errors: { [key in "username" | "email" | "phone" | "city"]?: string }
): boolean => {
  return (
    Object.values(errors).every(error => !error) &&
    Boolean(formData.username?.trim()) &&
    Boolean(formData.email?.trim()) &&
    Boolean(formData.phone?.trim()) &&
    Boolean(formData.city?.trim())
  );
};