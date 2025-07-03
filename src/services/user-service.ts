import { UserResponse } from "@/app/auth/register/RegisterForm";
import apiClient from "./api-client";

export interface UserConnectedAccount {
  id: string;
  providerName: string;
  connectedDate: string;
}

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

export async function getUserConnectedAccounts() {
  return apiClient.get<UserConnectedAccount[]>(
    `/users/user-connected-accounts`
  );
}

export async function deleteUserAccount() {
  return apiClient.delete("/users/delete-account");
}
