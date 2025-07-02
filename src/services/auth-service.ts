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

  async getSession(cookieHeader?: string) {
    try {
      const res = await apiClient.get<UserResponse>("/auth/me", {
        headers: { Cookie: cookieHeader },
      });
      return res.data;
    } catch (err) {
      console.log(err);
      return null;
    }
  }
}

export default new AuthService();
