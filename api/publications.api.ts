import { useQuery } from "@tanstack/react-query"
import apiClient from "./base.api"

export interface CreatePublication {
  name_of_publisher: string
  name_of_editor: string
  year_of_publication: string | null
  price: number
  address: string | null
  is_avail_in_print: boolean | null
}

export interface TPublication extends CreatePublication {
  id: number
}

const getPublication = async (
  doc_id: number,
  id: number,
): Promise<TPublication> => {
  const response = await apiClient.get<TPublication>(
    `documents/${doc_id}/publications/${id}`,
  )
  return response.data
}

export const useGetPublicationQuery = (doc_id: number, id: number) => {
  return useQuery<TPublication, Error>({
    queryKey: ["publications", doc_id, id],
    queryFn: () => getPublication(doc_id, id),
  })
}

const getPublications = async (doc_id: number): Promise<TPublication[]> => {
  const response = await apiClient.get<TPublication[]>(
    `/documents/${doc_id}/publications`,
  )
  return response.data
}

export const useGetPublicationsQuery = (doc_id: number) => {
  return useQuery<TPublication[], Error>({
    queryKey: ["publications", doc_id],
    queryFn: () => getPublications(doc_id),
  })
}
