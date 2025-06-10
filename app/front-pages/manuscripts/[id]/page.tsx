"use client"

import { Tabs, TabsContent } from "@/components/ui/tabs"
import { useGetDocumentQuery } from "@/api/documents.api"
import { FileText, Image as ImageIcon } from "lucide-react"
import { useRouter, useSearchParams } from "next/navigation"
import { use } from "react"

import NMMDetailsCard from "@/app/documents/[id]/components/NMMDetailsCard"
import DocumentNameCard from "@/app/documents/[id]/components/DocumentNameCard"
import MetadataCard from "@/app/documents/[id]/components/MetadataCard"
import DescriptionCard from "@/app/documents/[id]/components/DescriptionCard"
import AdditionalCard from "@/app/documents/[id]/components/AdditionCard"
import AuthorCard from "@/app/documents/[id]/components/AuthorCard"
import ScribeCard from "@/app/documents/[id]/components/ScribeCard"
import SourceCard from "@/app/documents/[id]/components/SourceCard"
import PublicationCard from "@/app/documents/[id]/components/PublicationCard"
import ManuscriptImagesCard from "./components/ManuscriptImagesCard"

type DocumentDisplayProps = {
  params: Promise<{ id: string }>
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}

const ManuscriptDocumentDisplay = (props: DocumentDisplayProps) => {
  const params = use(props.params)
  const document_id = parseInt(params.id)
  const searchParams = use(props.searchParams)
  const { data: document, isLoading, error } = useGetDocumentQuery(document_id)
  const router = useRouter()

  const searchParam = useSearchParams()
  const from =
    searchParam.get("from") ||
    "/front-pages/manuscripts" ||
    "/front-pages/books" ||
    "/front-pages/articles"
  const tab = searchParams.tab?.toString() || "document"

  const handleTabChange = (newTab: string) => {
    const urlParams = new URLSearchParams(window.location.search)
    urlParams.set("tab", newTab)
    router.push(`?${urlParams.toString()}`, { scroll: false })
  }

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64 max-w-7xl mx-auto">
        <div className="flex flex-col items-center gap-3">
          <div className="h-8 w-8 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
          <div className="text-lg font-medium">Loading document data...</div>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="flex items-center justify-center h-64 max-w-7xl mx-auto">
        <div className="bg-destructive/10 p-6 rounded-lg border border-destructive/20 max-w-xl">
          <h3 className="text-lg font-semibold text-destructive mb-2">
            Error Loading Document
          </h3>
          <div className="text-destructive">{error.message}</div>
        </div>
      </div>
    )
  }

  return (
    <>
      {/* Sticky Header with Title + Tabs */}
      <div className="fixed top-0 left-0 right-0 bg-white z-50 border-b border-border">
        <div className="max-w-7xl mx-auto px-4 pt-4 pb-2">
          {document?.name_in_diacritical && (
            <div className="flex items-center justify-between mb-2">
              <button
                onClick={() => router.push(from)}
                className="bg-sky-600 text-white px-6 py-1.5 rounded"
              >
               ⇦ Back
              </button>

              <h2 className="text-center text-2xl font-bold underline text-primary">
                {document.name}
              </h2>

              <div className="w-[80px]"></div>
            </div>
          )}

          <div className="flex rounded-lg border border-border overflow-hidden">
            <button
              className={`py-3 px-6 font-medium flex-1 flex items-center justify-center transition-colors ${
                tab === "document"
                  ? "bg-primary/10 text-primary"
                  : "text-muted-foreground hover:bg-muted"
              }`}
              onClick={() => handleTabChange("document")}
            >
              <FileText className="h-5 w-5 mr-2" />
              <span>Document Details</span>
            </button>
            <button
              className={`py-3 px-6 font-medium flex-1 flex items-center justify-center transition-colors ${
                tab === "images"
                  ? "bg-primary/10 text-primary"
                  : "text-muted-foreground hover:bg-muted"
              }`}
              onClick={() => handleTabChange("images")}
            >
              <ImageIcon className="h-5 w-5 mr-2" />
              <span>Images</span>
            </button>
          </div>
        </div>
      </div>

      {/* Push content down to avoid being hidden behind fixed bar */}
      <div className="pt-[160px] w-full max-w-7xl mx-auto rounded-lg overflow-hidden pb-8">
        <Tabs value={tab} className="w-full">
          <div className="p-4 sm:p-6 md:p-8">
            <TabsContent value="document" className="mt-0">
              {document && (
                <div className="space-y-8 max-w-5xl mx-auto">
                  <DocumentNameCard
                    name={document.name}
                    name_in_diacritical={document.name_in_diacritical}
                    name_in_vernacular={document.name_in_vernacular}
                  />
                  <MetadataCard
                    document_type={document.document_type}
                    type_of_work={document.type_of_work}
                    tags={document.tags}
                    language_id={document.language_id}
                    script_id={document.script_id}
                    subject_id={document.subject_id}
                    specific_category_id={document.specific_category_id}
                  />
                  <DescriptionCard
                    summary={document.summary}
                    table_of_contents={document.table_of_contents}
                  />
                  <AdditionalCard
                    contrib_to_subject={document.contrib_to_subject}
                    other_details={document.other_details}
                    uniqueness_of_work={document.uniqueness_of_work}
                  />
                  <AuthorCard id={document.author_id} />
                  {document.scribe_id && <ScribeCard id={document.scribe_id} />}
                  <NMMDetailsCard document_id={document.id} />
                  <SourceCard document_id={document.id} />
                  <PublicationCard document_id={document.id} />
                </div>
              )}
            </TabsContent>

            <TabsContent value="images" className="mt-0">
              <div className="max-w-5xl mx-auto">
                {document && <ManuscriptImagesCard document_id={document.id} subject_id={document.subject_id} />}
              </div>
            </TabsContent>
          </div>
        </Tabs>
      </div>
    </>
  )
}

export default ManuscriptDocumentDisplay
