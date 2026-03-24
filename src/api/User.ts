// ../api/users.ts
import api from "./axios"; // axios instance

export const getMyInfo = async () => {
  const response = await api.get("/users/me");
  return response.data;
};

export const updateMyInfo = async (payload: {
  name: string;
  phone?: string;
}) => {
  const response = await api.patch("/users/me", payload);
  return response.data;
};

export const changePassword = async (payload: {
  currentPassword: string;
  newPassword: string;
}) => {
  const response = await api.patch("/users/me/password", payload);
  return response.data;
};