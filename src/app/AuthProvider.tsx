"use client";
import AuthContext from "@/contexts/AuthContext";
import apiClient from "@/services/api-client";
import {
  AuthResponse,
  UserResponse,
  getSession,
  refreshToken,
  login as userLogin,
  logout as userLogout,
} from "@/services/auth-service";
import { AxiosError } from "axios";
import {
  PropsWithChildren,
  useContext,
  useLayoutEffect,
  useState,
} from "react";
import { LoginFormData } from "./auth/login/LoginForm";

interface ApiError {
  message: string;
  httpStatus: number;
  timestamp: Date;
}

const AuthProvider = ({ children }: PropsWithChildren) => {
  const [user, setUser] = useState<UserResponse | null>(null);
  const [token, setToken] = useState<string | undefined>(undefined);
  const [isInitialized, setIsInitialized] = useState(false);

  useLayoutEffect(() => {
    if (!isInitialized) {
      getSession()
        .then(({ data }) => {
          setUser(data.userResponse);
          setToken(data.token);
        })
        .catch((err) => {
          refreshToken().then(({ data }) => {
            setUser(data.userResponse);
            setToken(data.token);
          });
        })
        .finally(() => setIsInitialized(true));
    }
  }, []);

  //request interceptor
  useLayoutEffect(() => {
    const requestInterceptor = apiClient.interceptors.request.use(
      (config) => {
        const isAuthCall = config.url?.includes("auth/refresh");
        config.headers.Authorization = isAuthCall
          ? delete config.headers.Authorization
          : token
          ? `Bearer ${token}`
          : config.headers.Authorization;
        return config;
      },
      (error) => Promise.reject(error)
    );

    return () => apiClient.interceptors.request.eject(requestInterceptor);
  }, [token]);

  //response interceptor
  useLayoutEffect(() => {
    const responseInterceptor = apiClient.interceptors.response.use(
      (response) => response,
      async (error: AxiosError<ApiError>) => {
        const previousRequest = error?.config!;

        if (
          error.response?.status === 401 &&
          error.response?.data.message.includes("Invalid bearer token")
        ) {
          try {
            const authResponse = await apiClient
              .post<AuthResponse>("auth/refresh")
              .then((res) => res.data);
            setToken(authResponse.token);
            setUser(authResponse.userResponse);
            previousRequest.headers.Authorization = `Bearer ${authResponse.token}`;
            return await apiClient(previousRequest);
          } catch (err) {
            return Promise.reject(err);
          }
        }
        logout();
        return Promise.reject(error);
      }
    );

    return () => apiClient.interceptors.response.eject(responseInterceptor);
  }, []);

  const login = async (data: LoginFormData) => {
    return await userLogin(data);
  };

  const logout = async () => {
    setUser(null);
    setToken(undefined);
    userLogout();
  };

  return (
    <AuthContext.Provider value={{ user, setUser, setToken, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);

export default AuthProvider;
