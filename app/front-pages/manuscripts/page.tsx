/* eslint-disable react/display-name */
"use client"

import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import React, { useState, useEffect, useRef } from "react"
import { useRouter, useSearchParams } from "next/navigation"

import { DocumentQueryParams } from "@/api/documents.api"
import { useGetSubjectsQuery } from "@/api/subjects.api"
import Header from "@/components/layouts/header"
import TitleBar from "@/components/TitleBar"
import ManuscriptDocumentsTable from "./components/ManuscriptDocumentTable"
import Image from "next/image"
import Link from "next/link"

const filterSchema = z.object({
  document_id: z.string().optional(),
  name: z.string().optional(),
  document_type: z.enum(["book", "manuscript", "article"]).optional(),
  type_of_work: z
    .enum(["poetry", "prose", "prose_and_poetry", "compendium"])
    .optional(),
  summary: z.string().optional(),
  language_id: z.number().optional(),
  script_id: z.number().optional(),
  subject_id: z.number().optional(),
  specific_category_id: z.number().optional(),
  author_id: z.number().optional(),
  scribe_id: z.number().optional(),
  beginningLine: z.string().optional(),
  endingLine: z.string().optional(),
  minFolios: z.number().int().positive().optional(),
  maxFolios: z.number().int().positive().optional(),
  documentStatus: z.enum(["active", "inactive"]).optional(),
})

type FilterValues = z.infer<typeof filterSchema>

const Manuscripts = () => {
  const router = useRouter()
  const searchParams = useSearchParams()
  const subjectIdParam = searchParams.get("subject_id")
  const subjectId = subjectIdParam ? parseInt(subjectIdParam, 10) : undefined

  const { data: subjects } = useGetSubjectsQuery()

  const form = useForm<FilterValues>({
    resolver: zodResolver(filterSchema),
    defaultValues: {
      document_id: "",
      name: "",
      subject_id: undefined,
      document_type: "manuscript",
      type_of_work: undefined,
      language_id: undefined,
      script_id: undefined,
      summary: "",
      documentStatus: undefined,
      beginningLine: "",
      endingLine: "",
      minFolios: undefined,
      maxFolios: undefined,
      author_id: undefined,
      specific_category_id: undefined,
      scribe_id: undefined,
    },
  })

  const [filterParams, setFilterParams] = useState<DocumentQueryParams>({})
  const documentsTableRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (subjectId) {
      form.setValue("subject_id", subjectId)
      form.setValue("document_type", "manuscript")
      setFilterParams({
        subject_id: subjectId,
        document_type: "manuscript",
      })
    }
  }, [subjectId, form])

  const selectedSubject = subjects?.find(
    (subj) => subj.id === form.watch("subject_id")
  )

  const handleBack = () => {
    if (selectedSubject?.parent_id) {
      // router.push(`/subjects?parent=${selectedSubject.parent_id}`)
      // router.back()
      router.push(`/front-pages?subject_id=${selectedSubject.id}`)
    } else {
      router.push("/subjects")
    }
  }

  const DocumentsTableWrapper = React.forwardRef<
    HTMLDivElement,
    { children: React.ReactNode }
  >(({ children }, ref) => <div ref={ref}>{children}</div>)

  return (
    <div>
      {/* <Header /> */}

      <div
        style={{
          backgroundImage: "url('/bg-all-3.png')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          minHeight: "100vh",
        }}
        className="pt-24 sm:pt-12"
      >
        <div className="space-y-0">
          <div className="flex items-center justify-center relative -top-7">
            <button
              onClick={handleBack}
              // className="px-6 py-1.5 bg-red-900 text-white rounded absolute left-10"
              className="
             absolute left-4 sm:left-6
             px-4 sm:px-6
             py-1.5
           bg-sky-600 text-white rounded
             text-sm sm:text-base
             shadow-xl
           hover:bg-sky-700
             focus:outline-none focus:ring-2 focus:ring-sky-700 focus:ring-offset-1
             z-10
             transition-colors
             font-bold"
            >
              ⇦ Back
            </button>

            <TitleBar
              title={`List of MANUSCRIPTS on \n ${
                selectedSubject ? selectedSubject.name : ""
              }`}
            />
          </div>

          {/* top right 2 buttons */}
          {/* ✅ Desktop dashboard Button */}
          <div className="absolute top-6 right-48 hidden md:flex items-center bg-sky-300 px-6 py-1.5 rounded-2xl shadow space-x-2 cursor-pointer">
            <Link href="/subjects" className="flex items-center space-x-2">
              <span className="text-sm font-medium text-black">Home</span>
            </Link>
          </div>

          {/* ✅ Mobile dashboard Button */}
          <div className="absolute top-8  right-4 block md:hidden">
            <Link href="/subjects">
              <div className="flex items-center bg-sky-300 px-2 py-1 rounded-2xl shadow space-x-1">
                <span className="text-xs text-black">Home</span>
              </div>
            </Link>
          </div>

          {/* ✅ Desktop Search Button */}
          <div className="absolute top-6 right-6 hidden md:flex items-center bg-sky-300 px-10 py-1 rounded-2xl shadow space-x-2 cursor-pointer">
            <Link href="/documents" className="flex items-center space-x-2">
              <Image
                src="/search-icon.png"
                alt="Search Icon"
                width={24}
                height={24}
              />
              <span className="text-sm font-medium text-black">Search</span>
            </Link>
          </div>

          {/* ✅ Mobile Search Button */}
          <div className="absolute top-16 right-4 block md:hidden">
            <Link href="/documents">
              <div className="flex items-center bg-sky-300 px-6 py-0.5 rounded-2xl shadow space-x-1">
                <Image
                  src="/search-icon.png"
                  alt="Search Icon"
                  width={20}
                  height={20}
                  className="text-left"
                />
                <span className="text-xs text-black text-end">Search</span>
              </div>
            </Link>
          </div>

          {selectedSubject ? (
            <div className="max-w-7xl mx-auto space-y-6">
              <DocumentsTableWrapper ref={documentsTableRef}>
                <ManuscriptDocumentsTable filterParams={filterParams} />
              </DocumentsTableWrapper>
            </div>
          ) : (
            <div className="text-center text-lg text-gray-600 mt-12">
              Please select a subject to view its documents.
            </div>
          )}

          <div className="mt-12"></div>
        </div>
      </div>
    </div>
  )
}

export default Manuscripts
