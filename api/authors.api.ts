import { useQuery } from "@tanstack/react-query"
import apiClient from "./base.api"

export interface TAuthor {
  id: number
  name: string
  name_in_diacritical: string | null
  name_in_vernacular: string | null
  period_of_author: string | null
  authors_biography: string | null
}

const getAuthor = async (id: number): Promise<TAuthor> => {
  const response = await apiClient.get<TAuthor>(`/authors/${id}`)
  return response.data
}

export const useGetAuthorQuery = (id: number) => {
  return useQuery<TAuthor, Error>({
    queryKey: ["authors", id],
    queryFn: () => getAuthor(id),
  })
}

const getAuthors = async (): Promise<TAuthor[]> => {
  const response = await apiClient.get<TAuthor[]>("/authors/")
  return response.data
}

export const useGetAuthorsQuery = () => {
  return useQuery<TAuthor[], Error>({
    queryKey: ["authors"],
    queryFn: getAuthors,
  })
}
