import { useState } from "react";

const useAuth = () => {
  const [user, setUser] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const defaultEmail = "teste@dominio.com";
  const defaultPassword = "senha123";

  const login = (email: string, password: string) => {
    setLoading(true);
    setError(null);

    if (email === defaultEmail && password === defaultPassword) {
      setUser(email);
    } else {
      setError("Email ou senha inválidos");
    }

    setLoading(false);
  };

  const logout = () => {
    setUser(null);
  };

  return {
    user,
    error,
    loading,
    login,
    logout,
  };
};

export default useAuth;
