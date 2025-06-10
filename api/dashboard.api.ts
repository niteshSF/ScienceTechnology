import { useQuery } from "@tanstack/react-query"
import apiClient from "./base.api"

interface TDashboardCounts {
  total: number
  articles: number
  books: number
  manuscripts: number
}

const getDashboardCounts = async (): Promise<TDashboardCounts> => {
  const response = await apiClient.get<TDashboardCounts>("/dashboard/counts")
  return response.data
}

export const useGetDashboardCounts = () => {
  return useQuery<TDashboardCounts, Error>({
    queryKey: ["dashboard", "counts"],
    queryFn: () => getDashboardCounts(),
  })
}
