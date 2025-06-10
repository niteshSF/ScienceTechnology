import { useQuery } from "@tanstack/react-query"
import apiClient from "./base.api"

interface CreateDocument {
  user_given_id: string
  name: string
  name_in_diacritical: string | null
  name_in_vernacular: string | null
  language_id: number
  script_id: number
  subject_id: number
  specific_category_id: number
  author_id: number
  scribe_id: number | null
  document_type: "book" | "article" | "manuscript"
  type_of_work: "poetry" | "prose" | "prose_and_poetry" | "compendium" | null
  material: "paper" | "birchwood" | "palm_leaf" | null
  summary: string | null
  table_of_contents: string | null
  contrib_to_subject: string | null
  uniqueness_of_work: string | null
  other_details: string | null
  tags: string[]
}

interface TDocument extends CreateDocument {
  id: number
}

export interface TDocumentOut {
  id: number
  name: string
  author: {
    id: number
    name: string
  }
  no_of_sources: number
}

export interface DocumentQueryParams {
  document_id?: number
  name?: string
  name_in_diacritical?: string
  name_in_vernacular?: string
  document_type?: "book" | "article" | "manuscript"
  type_of_work?: "poetry" | "prose" | "prose_and_poetry" | "compendium"
  summary?: string
  table_of_contents?: string
  contrib_to_subject?: string
  uniqueness_of_work?: string
  other_details?: string
  tags?: string[]
  language_id?: number
  script_id?: number
  subject_id?: number
  specific_category_id?: number
  author_id?: number
  scribe_id?: number
}

const getDocument = async (id: number): Promise<TDocument> => {
  const response = await apiClient.get<TDocument>(`/documents/${id}`)
  return response.data
}

export const useGetDocumentQuery = (id: number) => {
  return useQuery<TDocument, Error>({
    queryKey: ["documents", id],
    queryFn: () => getDocument(id),
  })
}

const getDocuments = async (
  params: DocumentQueryParams = {},
): Promise<TDocumentOut[]> => {
  const response = await apiClient.get<TDocumentOut[]>("/documents/", {
    params: {
      document_id: params.document_id,
      name: params.name,
      name_in_diacritical: params.name_in_diacritical,
      name_in_vernacular: params.name_in_vernacular,
      document_type: params.document_type,
      type_of_work: params.type_of_work,
      summary: params.summary,
      table_of_contents: params.table_of_contents,
      contrib_to_subject: params.contrib_to_subject,
      uniqueness_of_work: params.uniqueness_of_work,
      other_details: params.other_details,
      tags: params.tags,
      language_id: params.language_id,
      script_id: params.script_id,
      subject_id: params.subject_id,
      specific_category_id: params.specific_category_id,
      author_id: params.author_id,
      scribe_id: params.scribe_id,
    },
  })
  return response.data
}

export const useGetDocumentsQuery = (params: DocumentQueryParams = {}) => {
  return useQuery<TDocumentOut[], Error>({
    queryKey: ["documents", params],
    queryFn: () => getDocuments(params),
  })
}
