import api from "./api";

export const getUsers = async () => {
  const response = await api.get("/auth/users");
  return response.data;
};

export const updateUserRole = async (userId, role) => {
  const response = await api.put(`/auth/users/${userId}`, { role });
  return response.data;
};
