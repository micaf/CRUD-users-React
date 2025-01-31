const validateUsername = (value: string) => {
  if (!value.trim()) return "Username is required.";
  if (value.length < 3) return "Username must be at least 3 characters.";
  return "";
};

const validateEmail = (value: string) => {
  if (!value.trim()) return "Email is required.";
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) return "Invalid email format.";
  return "";
};

const validatePhone = (value: string) => {
  if (!value.trim()) return "Phone is required.";
  if (!/^\d+$/.test(value)) return "Phone must contain only numbers.";
  if (value.length < 7) return "Phone must be at least 7 digits.";
  return "";
};

const validateCity = (value: string) => {
  if (!value.trim()) return "City is required.";
  if (value.length < 2) return "City must be at least 2 characters.";
  return "";
};

export const validateField = (field: "username" | "email" | "phone" | "city", value: string) => {
    const validators: Record<"username" | "email" | "phone" | "city", (value: string) => string> = {
      username: validateUsername,
      email: validateEmail,
      phone: validatePhone,
      city: validateCity,
    };
  
    return validators[field](value); 
  };