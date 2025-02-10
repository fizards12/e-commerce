import axios from "axios"
import { IRole } from "../schemas/role"
const SERVER_URL = import.meta.env.VITE_SERVER_URL

export const getRoles = async () => {
  const response = await axios.get<{ roles: IRole[] }>(`${SERVER_URL}/roles`)
  return response.data
}

export const getRole = async (id: string) => {
  const response = await axios.get<{role: IRole}>(`${SERVER_URL}/roles/${id}`)
  return response.data
}

export const createRole = async (role: IRole) => {
  const response = await axios.post(`${SERVER_URL}/roles`, role)
  return response.data
}

export const updateRole = async (id: string, role: IRole) => {
  const response = await axios.put(`${SERVER_URL}/roles/${id}`, role)
  return response.data
}

export const deleteRole = async (id: string) => {
  const response = await axios.delete(`${SERVER_URL}/roles/${id}`)
  return response.data
}
