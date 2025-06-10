import { useQuery } from "@tanstack/react-query"
import apiClient from "./base.api"

export interface TScript {
  id: number
  name: string
}

const getScript = async (id: number): Promise<TScript> => {
  const response = await apiClient.get<TScript>(`/scripts/${id}`)
  return response.data
}

export const useGetScriptQuery = (id: number) => {
  return useQuery<TScript, Error>({
    queryKey: ["scripts", id],
    queryFn: () => getScript(id),
  })
}

const getScripts = async (): Promise<TScript[]> => {
  const response = await apiClient.get<TScript[]>("/scripts/")
  return response.data
}

export const useGetScriptsQuery = () => {
  return useQuery<TScript[], Error>({
    queryKey: ["scripts"],
    queryFn: getScripts,
  })
}
