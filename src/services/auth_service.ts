import { AxiosResponse } from "axios";
import { IUser } from "./user-service";
import apiClient from "./api-client";
import { CredentialResponse } from "@react-oauth/google";

const ACCESS_TOKEN_KEY = "access-token";
const REFRESH_TOKEN_KEY = "refresh-token";

export const headers = () => {
  const tokens = getTokens();
  if (tokens.accessToken) {
    return {
      Authorization: `Bearer ${tokens.accessToken}`,
    };
  }
  return {};
};
export const generateRefreshToken = (): string => {
  // Define a character pool from which the token will be generated
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  const length = 32; // Define the desired length of the token
  
  let refreshToken = '';
  
  // Generate the token by randomly selecting characters from the pool
  for (let i = 0; i < length; i++) {
    refreshToken += characters.charAt(Math.floor(Math.random() * characters.length));
  }
  
  return refreshToken;
};

export const refreshTokenHeaders = () => {
  const tokens = getTokens();
  if (tokens.refreshToken) {
    return {
      Authorization: `Bearer ${tokens.refreshToken}`,
    };
  }
  return {};
};

export const getTokens = () => {
  const accessToken = localStorage.getItem(ACCESS_TOKEN_KEY);
  if (!accessToken) {
    throw new Error('Access token not found'); 
  }

  const refreshToken = localStorage.getItem(REFRESH_TOKEN_KEY);
  return { accessToken, refreshToken };
};


export const saveTokens = ({
  accessToken,
  refreshToken,
}: {
  accessToken: string;
  refreshToken: string;
}) => {
  localStorage.setItem(ACCESS_TOKEN_KEY, accessToken);
  localStorage.setItem(REFRESH_TOKEN_KEY, refreshToken);
};

export const resetTokens = () => {
  localStorage.removeItem(ACCESS_TOKEN_KEY);
  localStorage.removeItem(REFRESH_TOKEN_KEY);
};

type LoginResponse = {
  user: IUser;
  accessToken: string;
  refreshToken: string;
};
export const login = async (
  email: string,
  password: string
): Promise<AxiosResponse<LoginResponse>> => {
  return await apiClient.post("/auth/login", { email, password });
};

export const logout = async () => {
  return await apiClient.post(
    "/auth/logout",
    {},
    { headers: refreshTokenHeaders() }
  );
};

type RegistrationResponse = {
  user: IUser;
  accessToken: string;
  refreshToken: string;
};

export const register = async (
  name: string,
  email: string,
  password: string,
  type: string,
  bio: string
): Promise<AxiosResponse<RegistrationResponse>> => {
  return await apiClient.post("/auth/register", {
    name,
    email,
    password,
    type,
    bio,
  });
};

type GoogleSignInResponse = {
  user: IUser;
  accessToken: string;
  refreshToken: string;
};

export const googleSignIn = async (
  credentialResponse: CredentialResponse,
  type?: string,
  bio?: string
): Promise<AxiosResponse<GoogleSignInResponse>> => {
  return await apiClient.post("/auth/google", {
    credentialResponse,
    type,
    bio,
  });
};

type RefreshResponse = {
  accessToken: string;
  refreshToken: string;
};

export const refresh = async (): Promise<AxiosResponse<RefreshResponse>> => {
  return await apiClient.post(
    "/auth/refresh",
    {},
    {
      headers: refreshTokenHeaders(),
    }
  );
};
