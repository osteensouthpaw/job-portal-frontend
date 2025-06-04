"use client";
import AuthContext from "@/contexts/AuthContext";
import authService from "@/services/auth-service";
import { PropsWithChildren, useContext, useEffect, useState } from "react";
import { LoginFormData } from "./auth/login/LoginForm";
import { UserResponse } from "./auth/register/RegisterForm";

const AuthProvider = ({ children }: PropsWithChildren) => {
  const [user, setUser] = useState<UserResponse | null>(null);

  useEffect(() => {
    authService.getSession().then((res) => setUser(res));
  }, []);

  const login = async (data: LoginFormData) => {
    const res = await authService.login(data);
    setUser(res.data);
  };

  const logout = async () => {
    await authService.logout();
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, setUser, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);

export default AuthProvider;
