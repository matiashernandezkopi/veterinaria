import { createContext, useContext, useEffect, useState } from "react";
import type { User } from "../types/auth";
import api from "../lib/axios";


type AuthContextType = {
  user: User | null;
  token: string | null;
  login: (data: { token: string; user: User }) => void;
  logout: () => void;
};

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(
    () => localStorage.getItem("token")
  );

  useEffect(() => {
    const loadUser = async () => {
      if (token) {
        try {
          const { data } = await api.get("/auth/me");
          setUser(data);
        } catch (err) {
          // si el token es inválido, hacemos logout
          logout();
        }
      }
    };

    loadUser();
  }, [token]);


  useEffect(() => {
    if (token) localStorage.setItem("token", token);
    else localStorage.removeItem("token");
  }, [token]);

  const login = ({ token, user }: { token: string; user: User }) => {
    setToken(token);
    setUser(user);
  };

  const logout = () => {
    setToken(null);
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, token, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}


export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth debe usarse dentro de AuthProvider");
  }
  return context;
}
