import { useQuery } from "@tanstack/react-query"
import apiClient from "./base.api"

export interface TScribe {
  id: number
  name: string
  name_in_diacritical: string | null
  name_in_vernacular: string | null
}

const getScribe = async (id: number): Promise<TScribe> => {
  const response = await apiClient.get<TScribe>(`/scribes/${id}`)
  return response.data
}

export const useGetScribeQuery = (id: number) => {
  return useQuery<TScribe, Error>({
    queryKey: ["scribes", id],
    queryFn: () => getScribe(id),
  })
}

const getScribes = async (): Promise<TScribe[]> => {
  const response = await apiClient.get<TScribe[]>("/scribes/")
  return response.data
}

export const useGetScribesQuery = () => {
  return useQuery<TScribe[], Error>({
    queryKey: ["scribes"],
    queryFn: getScribes,
  })
}
