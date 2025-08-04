"use client";
import AuthContext from "@/contexts/AuthContext";
import apiClient from "@/services/api-client";
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

const AuthProvider = ({ children }: PropsWithChildren) => {
  const [user, setUser] = useState<UserResponse | null>(null);
  const [token, setToken] = useState<string | undefined>(undefined);
  const [isInitialized, setIsInitialized] = useState(false);
  console.log({ user, token });

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
  }, []);

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
        const isAuthRefreshCall =
          previousRequest?.url?.includes("/auth/refresh");
        if (
          error?.response?.status === 401 &&
          !previousRequest._retry &&
          !isAuthRefreshCall
        ) {
          previousRequest._retry = true;
          try {
            const authResponse = await apiClient
              .post<AuthResponse>("auth/refresh")
              .then((res) => res.data);
            setToken(authResponse.token);
            setUser(authResponse.userResponse);
            previousRequest.headers.Authorization = `Bearer ${authResponse.token}`;
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
    return await userLogin(data);
  };

  const logout = async () => {
    setUser(null);
    setToken(undefined);
  };

  return (
    <AuthContext.Provider value={{ user, setUser, setToken, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);

export default AuthProvider;
