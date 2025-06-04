import { LoginFormData } from "@/app/auth/login/LoginForm";
import { UserResponse } from "@/app/auth/register/RegisterForm";
import React, { Dispatch, SetStateAction } from "react";

interface AuthContextType {
  user: UserResponse | null;
  setUser: Dispatch<SetStateAction<UserResponse | null>>;
  login: (data: LoginFormData) => void;
  logout: () => void;
}

const AuthContext = React.createContext<AuthContextType>({} as AuthContextType);

export default AuthContext;
