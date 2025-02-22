import axios from "./call"
import { IRole } from "../schemas/role"

export const getRoles = async () => {
  const response = await axios.get<{ roles: IRole[] }>(`roles`)
  return response.data
}

export const getRole = async (id: string) => {
  const response = await axios.get<{role: IRole}>(`roles/${id}`)
  return response.data
}

export const createRole = async (role: IRole) => {
  const response = await axios.post(`roles`, role)
  return response.data
}

export const updateRole = async (id: string, role: IRole) => {
  const response = await axios.put(`roles/${id}`, role)
  return response.data
}

export const deleteRole = async (id: string) => {
  const response = await axios.delete(`roles/${id}`)
  return response.data
}
