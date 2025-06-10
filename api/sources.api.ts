import { useQuery } from "@tanstack/react-query"
import apiClient from "./base.api"

interface CreateSource {
  name: string
  website: string | null
  phone_no: string | null
  email: string | null
  address: string | null
  type: "individual" | "institution"
}

export interface TSource extends CreateSource {
  id: number
}

const getSource = async (doc_id: number, id: number): Promise<TSource> => {
  const response = await apiClient.get<TSource>(
    `documents/${doc_id}/sources/${id}`,
  )
  return response.data
}

export const useGetSourceQuery = (doc_id: number, id: number) => {
  return useQuery<TSource, Error>({
    queryKey: ["sources", doc_id, id],
    queryFn: () => getSource(doc_id, id),
  })
}

const getSources = async (doc_id: number): Promise<TSource[]> => {
  const response = await apiClient.get<TSource[]>(
    `/documents/${doc_id}/sources`,
  )
  return response.data
}

export const useGetSourcesQuery = (doc_id: number) => {
  return useQuery<TSource[], Error>({
    queryKey: ["sources", doc_id],
    queryFn: () => getSources(doc_id),
  })
}
