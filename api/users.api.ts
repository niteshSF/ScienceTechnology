import { useQuery } from "@tanstack/react-query"
import apiClient from "./base.api"

export type TUser = {
  id: number
  first_name: string
  last_name: string
  email: string
  phone_no: string
  is_admin: boolean
}

const getUser = async (id: number) => {
  const response = await apiClient.get(`/users/${id}`)
  return response.data
}

export const useGetUserQuery = (id: number) => {
  return useQuery<TUser>({
    queryKey: ["users", id],
    queryFn: () => getUser(id),
  })
}

const getUserList = async () => {
  const response = await apiClient.get(`/users/`)
  return response.data
}

export const useGetUserListQuery = () => {
  return useQuery<TUser[]>({
    queryKey: ["users"],
    queryFn: getUserList,
  })
}
