import axios from "./call"
import { IUser } from "../schemas/user";

export const login = async (email: string, password: string) => {
  const { data } = await axios.post<{ id: string }>("auth/login",
    {
      email,
      password,
    }
  );
  return data;
};

export const logout = async () => {
  await axios.post("auth/logout");
};

export const register = async (user: IUser) => {
  const { data } = await axios.post("auth/register", user);
  return data;
};


export const getLoggedInUser = async () => {
  const { data } = await axios.get<{ message?: string}>("auth/loggedIn");
  return data;
};