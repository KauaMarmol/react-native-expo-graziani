import { createContext, useContext, useEffect, useState } from "react";
import { useUsersDatabase } from "../../database/useUsersDatabase";

const AuthContext = createContext({});

export const Role = {
  SUPER: "SUPER", 
  ADM: "ADM",
  USER: "USER"
};

export function AuthProvider({ children }) {
  const [user, setUser] = useState({
    autenticated: null,
    user: null,
    role: null,
  });

  const signIn = async ({ email, password }) => {
    const response = await useAuth({ email, password });
    console.log(response);

    if (!response) {
      setUser({
        autenticated: false,
        user: null,
        role: null,
      });
      throw new Error("Usuário ou senha inválidos"); 
    }

    setUser({
      autenticated: true,
      user: response,
      role: response.role,
    });
  };

  const signOut = async () => {
    setUser({});
  };

  useEffect(() => {
    console.log('AuthProvider: ', user);
  }, [user])

  return (
    <AuthContext.Provider value={{ user, signIn, signOut }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}