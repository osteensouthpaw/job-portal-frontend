import { LoginFormData } from "@/app/auth/login/LoginForm";
import apiClient from "./api-client";
import {
  RegisterFormData,
  UserResponse,
} from "@/app/auth/register/RegisterForm";

class AuthService {
  async login(data: LoginFormData) {
    return apiClient.post<UserResponse>(`/auth/login`, data);
  }

  async logout() {
    return apiClient.post("/auth/logout");
  }

  async register(data: RegisterFormData) {
    return apiClient.post<UserResponse>("/auth/register", data);
  }

  async getSession() {
    try {
      const res = await apiClient.get<UserResponse>("/auth/me");
      return res.data;
    } catch (err) {
      return null;
    }
  }
}

export default new AuthService();
