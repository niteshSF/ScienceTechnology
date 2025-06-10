"use client"

import { useSearchParams } from "next/navigation"
import { useGetDocumentsQuery } from "@/api/documents.api"

interface TotalCountProps {
  type: "manuscript" | "book" | "article" // use singular or plural as your backend expects
}

export default function TotalCount({ type }: TotalCountProps) {
  const searchParams = useSearchParams()
  const subjectId = searchParams.get("subject_id")

  // Call API with subject_id and document_type filters
  const { data: documents, isLoading, error } = useGetDocumentsQuery({
    subject_id: subjectId ? Number(subjectId) : undefined,
    document_type: type, // <-- pass filter here
  })

  if (isLoading) {
    return <p className="text-white text-center text-sm">...</p>
  }

  if (error) {
    return (
      <p className="text-red-500 text-center text-sm">
        Error: {error.message}
      </p>
    )
  }

  return (
    <span className="text-lg font-bold text-white">
      {documents?.length || 0}
    </span>
  )
}
