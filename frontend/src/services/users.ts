import axios from "./call"
import { IUser } from "../schemas/user"
export const getUsers = async () => {
  const response = await axios.get<{ users: IUser[] }>(`users`)
  return response.data
}

export const getUser = async (id: string) => {
  const response = await axios.get<{user: IUser}>(`users/${id}`)
  return response.data
}

export const createUser = async (user: IUser) => {
  const response = await axios.post(`users`, user)
  return response.data
}

export const updateUser = async (id: string, user: IUser) => {
  const response = await axios.put(`users/${id}`, user)
  return response.data
}

export const deleteUser = async (id: string) => {
  const response = await axios.delete(`users/${id}`)
  return response.data
}
