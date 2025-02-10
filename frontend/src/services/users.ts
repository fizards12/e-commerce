import axios from "axios"
import { IUser } from "../schemas/user"
const SERVER_URL = import.meta.env.VITE_SERVER_URL
export const getUsers = async () => {
  const response = await axios.get<{ users: IUser[] }>(`${SERVER_URL}/users`)
  return response.data
}

export const getUser = async (id: string) => {
  const response = await axios.get<{user: IUser}>(`${SERVER_URL}/users/${id}`)
  return response.data
}

export const createUser = async (user: IUser) => {
  const response = await axios.post(`${SERVER_URL}/users`, user)
  return response.data
}

export const updateUser = async (id: string, user: IUser) => {
  const response = await axios.put(`${SERVER_URL}/users/${id}`, user)
  return response.data
}

export const deleteUser = async (id: string) => {
  const response = await axios.delete(`${SERVER_URL}/users/${id}`)
  return response.data
}
