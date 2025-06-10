import { useQuery } from "@tanstack/react-query"
import apiClient from "./base.api"

export interface TLanguage {
  id: number
  name: string
}

const getLanguage = async (id: number): Promise<TLanguage> => {
  const response = await apiClient.get<TLanguage>(`/languages/${id}`)
  return response.data
}

export const useGetLanguageQuery = (id: number) => {
  return useQuery<TLanguage, Error>({
    queryKey: ["languages", id],
    queryFn: () => getLanguage(id),
  })
}

const getLanguages = async (): Promise<TLanguage[]> => {
  const response = await apiClient.get<TLanguage[]>("/languages/")
  return response.data
}

export const useGetLanguagesQuery = () => {
  return useQuery<TLanguage[], Error>({
    queryKey: ["languages"],
    queryFn: getLanguages,
  })
}
