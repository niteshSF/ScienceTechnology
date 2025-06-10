import { useQuery } from "@tanstack/react-query"
import apiClient from "./base.api"

export interface TSubject {

  id: number
  name: string
  parent_id: number | null
}

const getSubject = async (id: number): Promise<TSubject> => {
  const response = await apiClient.get<TSubject>(`/subjects/${id}`)
  return response.data
}

export const useGetSubjectQuery = (id: number) => {
  return useQuery<TSubject, Error>({
    queryKey: ["subjects", id],
    queryFn: () => getSubject(id),
  })
}

const getSubjects = async (): Promise<TSubject[]> => {
  const response = await apiClient.get<TSubject[]>("/subjects/")
  return response.data
}

export const useGetSubjectsQuery = () => {
  return useQuery<TSubject[], Error>({
    queryKey: ["subjects"],
    queryFn: getSubjects,
  })
}
