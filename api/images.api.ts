import { useQuery } from "@tanstack/react-query"
import apiClient from "./base.api"

export interface TImageMetadata {
  id: number
  file_name: string
  file_type: string
  no_of_pages: number
  original_file_path: string
  image_paths: string[]
}

const getDocumentFiles = async (doc_id: number): Promise<TImageMetadata[]> => {
  const response = await apiClient.get<[TImageMetadata]>(
    `/documents/${doc_id}/files`,
  )
  return response.data
}

export const useGetDocumentFilesQuery = (doc_id: number) => {
  return useQuery<TImageMetadata[], Error>({
    queryKey: ["files", doc_id],
    queryFn: () => getDocumentFiles(doc_id),
  })
}

const getDocumentFile = async (
  doc_id: number,
  id: number,
): Promise<TImageMetadata> => {
  const response = await apiClient.get<TImageMetadata>(
    `documents/${doc_id}/files/${id}`,
  )
  return response.data
}

export const useGetDocumentFileQuery = (doc_id: number, id: number) => {
  return useQuery<TImageMetadata, Error>({
    queryKey: ["files", doc_id, id],
    queryFn: () => getDocumentFile(doc_id, id),
  })
}
