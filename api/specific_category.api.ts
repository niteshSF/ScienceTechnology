import { useQuery } from "@tanstack/react-query"
import apiClient from "./base.api"

export interface TSpecificCategory {
  id: number
  name: string
}

const getSpecificCategory = async (id: number): Promise<TSpecificCategory> => {
  const response = await apiClient.get<TSpecificCategory>(
    `/specific-categories/${id}`,
  )
  return response.data
}

export const useGetSpecificCategoryQuery = (id: number) => {
  return useQuery<TSpecificCategory, Error>({
    queryKey: ["specific_category", id],
    queryFn: () => getSpecificCategory(id),
  })
}

const getSpecificCategories = async (): Promise<TSpecificCategory[]> => {
  const response = await apiClient.get<TSpecificCategory[]>(
    "/specific-categories/",
  )
  return response.data
}

export const useGetSpecificCategoriesQuery = () => {
  return useQuery<TSpecificCategory[], Error>({
    queryKey: ["specific_category"],
    queryFn: getSpecificCategories,
  })
}
