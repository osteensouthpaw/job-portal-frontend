import { LoginFormData } from "@/app/auth/login/LoginForm";
import apiClient from "./api-client";
import { RegisterFormData } from "@/app/auth/register/RegisterForm";

export interface UserResponse {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  imageUrl: string;
  gender: Gender;
  userType: UserType;
}

export interface AuthResponse {
  token: string;
  userResponse: UserResponse;
}

export enum Gender {
  MALE = "MALE",
  FEMALE = "FEMALE",
}

export enum UserType {
  ADMIN = "ADMIN",
  JOB_SEEKER = "JOB_SEEKER",
  RECRUITER = "RECRUITER",
  PENDING = "PENDING",
}

export async function login(data: LoginFormData) {
  return apiClient
    .post<AuthResponse>(`/auth/login`, data)
    .then((res) => res.data);
}

export async function logout() {
  return apiClient.post("/auth/logout");
}

export async function register(data: RegisterFormData) {
  return apiClient.post<AuthResponse>("/auth/register", data);
}

export async function getSession() {
  return apiClient.get<AuthResponse>("/auth/me");
}

export async function refreshToken() {
  return apiClient.post<AuthResponse>("/auth/refresh");
}
