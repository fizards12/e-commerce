import axios from "axios";
import { IUser } from "../schemas/user";
const SERVER_URL = import.meta.env.VITE_SERVER_URL;

export const login = async (email: string, password: string) => {
  const { data } = await axios.post<{ id: string }>(
    SERVER_URL + "/auth/login",
    {
      email,
      password,
    }
  );
  return data;
};

export const logout = async () => {
  await axios.post(SERVER_URL + "/auth/logout");
};

export const register = async (user: IUser) => {
  const { data } = await axios.post(SERVER_URL + "/auth/register", user);
  return data;
};


export const getLoggedInUser = async () => {
  const { data } = await axios.get<{ user: IUser }>(SERVER_URL + "/auth/profile");
  return data;
};