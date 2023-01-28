import { useState } from "react";

interface FormData {
  name: string;
  email: string;
  password: string;
  timestamp?: any;
}

export const useFormData = () => {
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    password: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.id]: e.target.value,
    }));
  };

  return { formData, handleChange };
};
