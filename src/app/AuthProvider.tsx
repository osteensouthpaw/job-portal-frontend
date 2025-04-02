"use client";
import AuthContext from "@/contexts/AuthContext";
import authService from "@/services/auth-service";
import React, {
  PropsWithChildren,
  useContext,
  useEffect,
  useState,
} from "react";
import { UserResponse } from "./auth/register/RegisterForm";

const AuthProvider = ({ children }: PropsWithChildren) => {
  const [user, setUser] = useState<UserResponse | null>(null);

  useEffect(() => {
    authService.getSession().then((res) => setUser(res));
  }, []);

  return (
    <AuthContext.Provider value={{ user, setUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);

export default AuthProvider;
