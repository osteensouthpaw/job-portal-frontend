import { UserResponse } from "@/app/auth/register/RegisterForm";
import apiClient from "./api-client";

export async function updateUser(data: {
  firstName: string;
  lastName: string;
  imageUrl: string;
}) {
  return apiClient.patch<UserResponse>(`/users/update-profile`, data);
}

export async function updatePassword(
  oldPassword: string,
  password: string,
  confirmPassword: string
) {
  return apiClient.patch(`/users/update-password`, {
    oldPassword,
    password,
    confirmPassword,
  });
}
