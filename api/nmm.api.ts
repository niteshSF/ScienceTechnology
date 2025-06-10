import { useQuery } from "@tanstack/react-query"
import apiClient from "./base.api"

export interface TNMM extends CreateNMM {
  id: number
}

interface CreateNMM {
  name_of_collection: string
  source_of_catalogue: string
  catalogue_no: number
  catalogue_details: string
  documentation: string
  colophon: string
  no_of_illustrations: string
  condn_of_manuscript: string
  digitized_by: string
  beginning_line: string
  ending_line: string
  avg_img_height: number
  avg_img_width: number
  median_created_date: string
  median_digitised_date: string
  camera_make: string
  camera_model: string
  x_resolution: number
  y_resolution: number
  lines_per_page: number
  characters_per_page: number
  patha: string
  red_marking: string
  edited: true
  decorated: true
  illustrations: true
  ink_or_pigment: string
  miscellaneous_remarks: string
  bound: string
}

const getNMMDetails = async (
  document_id: number,
  id: number,
): Promise<TNMM> => {
  const response = await apiClient.get<TNMM>(
    `/documents/${document_id}/NMM/${id}`,
  )
  return response.data
}

export const useGetNMMDetailsQuery = (document_id: number, id: number) => {
  return useQuery<TNMM, Error>({
    queryKey: ["NMM", document_id, id],
    queryFn: () => getNMMDetails(document_id, id),
  })
}

const getNMMDetailsList = async (document_id: number): Promise<TNMM[]> => {
  const response = await apiClient.get<TNMM[]>(`/documents/${document_id}/NMM`)
  return response.data
}

export const useGetNMMDetailsListQuery = (document_id: number) => {
  return useQuery<TNMM[], Error>({
    queryKey: ["NMM", document_id],
    queryFn: () => getNMMDetailsList(document_id),
  })
}
