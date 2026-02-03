import api from "../lib/axios";
import type { LoginRequest, LoginResponse } from "../types/auth";

export const loginRequest = async (
  credentials: LoginRequest
): Promise<LoginResponse> => {
  const { data } = await api.post<LoginResponse>(
    "/auth/login",
    credentials
  );

  return data;
};
