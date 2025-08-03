"use client";
import AuthContext from "@/contexts/AuthContext";
import {
  AuthResponse,
  UserResponse,
  getSession,
  login as userLogin,
} from "@/services/auth-service";
import {
  PropsWithChildren,
  useContext,
  useEffect,
  useLayoutEffect,
  useState,
} from "react";
import { LoginFormData } from "./auth/login/LoginForm";
import { AxiosError } from "axios";
import { toast } from "sonner";
import apiClient from "@/services/api-client";

const AuthProvider = ({ children }: PropsWithChildren) => {
  const [user, setUser] = useState<UserResponse | null>(null);
  const [token, setToken] = useState<string | undefined>(undefined);
  const [isInitialized, setIsInitialized] = useState(false);

  useEffect(() => {
    if (!isInitialized) {
      getSession()
        .then(({ data }) => {
          setUser(data.userResponse);
          setToken(data.token);
        })
        .catch((err) => console.log("No session found"))
        .finally(() => setIsInitialized(true));
    }
  }, [isInitialized]);

  //request interceptor
  useLayoutEffect(() => {
    const requestInterceptor = apiClient.interceptors.request.use((config) => {
      token
        ? (config.headers.Authorization = `Bearer ${token}`)
        : delete config.headers.Authorization;

      return config;
    });

    return () => apiClient.interceptors.request.eject(requestInterceptor);
  }, [token]);

  //response interceptor
  useLayoutEffect(() => {
    const responseInterceptor = apiClient.interceptors.response.use(
      (response) => response,
      async (error) => {
        const previousRequest = error?.config;
        if (error?.response?.status === 401 && !previousRequest._retry) {
          previousRequest._retry = true;
          try {
            const newAccessToken = await apiClient
              .post<AuthResponse>("auth/refresh")
              .then((res) => res.data.token);
            setToken(newAccessToken);
            previousRequest.headers.Authorization = `Bearer ${newAccessToken}`;
            return apiClient(previousRequest);
          } catch (error) {
            return Promise.reject(error);
          }
        }

        return Promise.reject(error);
      }
    );

    return () => apiClient.interceptors.response.eject(responseInterceptor);
  }, []);

  const login = async (data: LoginFormData) => {
    await userLogin(data)
      .then(({ data }) => {
        setUser(data.userResponse);
        setToken(data.token);
      })
      .catch((err) => {
        const errorMessage =
          err instanceof AxiosError
            ? err.response?.data?.message || err.message
            : "Login failed";
        toast.error(errorMessage);
      });
  };

  const logout = async () => {
    setUser(null);
    setToken(undefined);
  };

  return (
    <AuthContext.Provider value={{ user, setUser, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);

export default AuthProvider;
