import axios from "axios";

const BASE_URL = "https://623dd3bcdb0fc039d4bcb679.mockapi.io/api/student";

const axiosClient = axios.create();

axiosClient.defaults.baseURL = BASE_URL;

axiosClient.defaults.headers.common = {
  "Content-Type": "application/json",
  Accept: "application/json",
};

axiosClient.interceptors.request.use(
  (config) => {
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

axiosClient.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export const getListUsers = async () => {
  return await axiosClient.get("/users");
};

export const getUserDetail = async (id) => {
  return await axiosClient.get(`/users/${id}`);
};

export const addNewUser = async (data) => {
  return await axiosClient.post("/users", data);
};

export const editUserForm = async (id, data) => {
  return await axiosClient.put(`/users/${id}`, data);
};

export const removeUser = async (id) => {
  return await axiosClient.delete(`/users/${id}`);
};
