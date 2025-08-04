import { LoginFormData } from "@/app/auth/login/LoginForm";
import { AuthResponse, UserResponse } from "@/services/auth-service";
import React, { Dispatch, SetStateAction } from "react";

interface AuthContextType {
  user: UserResponse | null;
  setUser: Dispatch<SetStateAction<UserResponse | null>>;
  setToken: Dispatch<SetStateAction<string | undefined>>;
  login: (data: LoginFormData) => Promise<AuthResponse>;
  logout: () => void;
}

const AuthContext = React.createContext<AuthContextType>({} as AuthContextType);

export default AuthContext;
