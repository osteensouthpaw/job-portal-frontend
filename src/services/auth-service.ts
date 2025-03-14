import { LoginFormData } from "@/app/auth/login/LoginForm";
import apiClient from "./api-client";
import {
  RegisterFormData,
  UserResponse,
} from "@/app/auth/register/RegisterForm";

class AuthService {
  login(data: LoginFormData) {
    return apiClient.post("/auth/login", data);
  }

  register(data: RegisterFormData) {
    return apiClient.post<UserResponse>("/auth/register", data);
  }
}

export default new AuthService();
