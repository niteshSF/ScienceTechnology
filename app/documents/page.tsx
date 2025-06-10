/* eslint-disable react/display-name */
"use client"

import { Button } from "@/components/ui/button"
import TitleBar from "@/components/TitleBar"
import { Search, X } from "lucide-react"
import { Input } from "@/components/ui/input"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { useState, useEffect, useRef } from "react"
import DocumentsTable from "@/app/documents/components/DocumentsTable"
import { useGetSubjectsQuery } from "@/api/subjects.api"
import { useGetLanguagesQuery } from "@/api/languages.api"
import { useGetScriptsQuery } from "@/api/scripts.api"
import { useGetSpecificCategoriesQuery } from "@/api/specific_category.api"
import { useGetAuthorsQuery } from "@/api/authors.api"
import { Skeleton } from "@/components/ui/skeleton"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { DocumentQueryParams } from "@/api/documents.api"
import { useSearchParams } from "next/navigation"

import { useRouter } from "next/navigation"
import React from "react"
import Link from "next/link"

const InputSkeleton = () => {
  return (
    <div className="flex flex-col gap-2">
      <Skeleton className="w-20 h-6" />
      <Skeleton className="w-full h-8" />
    </div>
  )
}

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
  // Additional filter fields that are not part of the API params
  beginningLine: z.string().optional(),
  endingLine: z.string().optional(),
  minFolios: z.number().int().positive().optional(),
  maxFolios: z.number().int().positive().optional(),
  documentStatus: z.enum(["active", "inactive"]).optional(),
})

type FilterValues = z.infer<typeof filterSchema>

const DocumentsPage = () => {
  const searchParams = useSearchParams()
  const { data: subjects, isLoading: isLoadingSubjects } = useGetSubjectsQuery()
  const { data: languages, isLoading: isLoadingLanguages } =
    useGetLanguagesQuery()
  const { data: scripts, isLoading: isLoadingScripts } = useGetScriptsQuery()
  const { data: categories, isLoading: isLoadingCategories } =
    useGetSpecificCategoriesQuery()
  const { data: authors, isLoading: isLoadingAuthors } = useGetAuthorsQuery()

  const [isFilterExpanded, setIsFilterExpanded] = useState(false)
  const [filterParams, setFilterParams] = useState<DocumentQueryParams>({})

  // Get subject_id from query parameter
  const subjectIdParam = searchParams.get("subject_id")
  const subjectId = subjectIdParam ? parseInt(subjectIdParam, 10) : undefined

  const form = useForm<FilterValues>({
    resolver: zodResolver(filterSchema),
    defaultValues: {
      document_id: "",
      name: "",
      subject_id: undefined,
      document_type: undefined,
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

  // Set the initial subject_id value when the component mounts
  useEffect(() => {
    if (subjectId) {
      form.setValue("subject_id", subjectId)

      // Also apply the filter automatically when subject_id is in URL
      setFilterParams({
        subject_id: subjectId,
      })

      // Expand filter section to show the applied filter
      setIsFilterExpanded(true)
    }
  }, [subjectId, form])

  const documentsTableRef = useRef<HTMLDivElement>(null)

  const onSubmit = (values: FilterValues) => {
    const documentId = values.document_id
      ? Number(values.document_id)
      : undefined

    const queryParams: DocumentQueryParams = {
      document_id: documentId,
      name: values.name || undefined,
      document_type: values.document_type,
      type_of_work: values.type_of_work,
      summary: values.summary || undefined,
      language_id: values.language_id,
      script_id: values.script_id,
      subject_id: values.subject_id,
      specific_category_id: values.specific_category_id,
      author_id: values.author_id,
      scribe_id: values.scribe_id,
    }

    // Remove undefined values
    const cleanedParams = Object.fromEntries(
      Object.entries(queryParams).filter(([, value]) => value !== undefined)
    ) as DocumentQueryParams

    setFilterParams(cleanedParams)

    // Scroll to the DocumentsTable after filters are applied
    documentsTableRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  // Wrap DocumentsTable with a div that accepts a ref
  const DocumentsTableWrapper = React.forwardRef<
    HTMLDivElement,
    { children: React.ReactNode }
  >(({ children }, ref) => <div ref={ref}>{children}</div>)

  const handleReset = () => {
    form.reset()
    setFilterParams({})
  }

  const selectedSubject = subjects?.find(
    (subj) => subj.id === form.watch("subject_id")
  )

  const router = useRouter()

  const handleBack = () => {
    if (selectedSubject?.parent_id) {
      router.push(`/subjects?parent=${selectedSubject.parent_id}`)
    } else {
      // fallback or home if no parent_id found
      router.push("/subjects")
    }
  }

  return (
    <>
      <div
        style={{
          backgroundImage: "url('/bg-all-3.png')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          minHeight: "100vh",
        }}
        className="pt-24 sm:pt-4"
      >
        <div>
          {/* top right 1 buttons */}
          {/* ✅ Desktop dashboard Button */}
          <div className="absolute top-6 right-10 hidden md:flex items-center bg-sky-300 px-6 py-1.5 rounded-2xl shadow space-x-2 cursor-pointer">
            <Link href="/subjects" className="flex items-center space-x-2">
              <span className="text-sm font-medium text-black">Home</span>
            </Link>
          </div>

          {/* ✅ Mobile dashboard Button */}
          <div className="absolute top-8 right-4 block md:hidden">
            <Link href="/dashboard">
              <div className="flex items-center bg-sky-300 px-2 py-1 rounded-2xl shadow space-x-1">
                <span className="text-xs text-black">Home</span>
              </div>
            </Link>
          </div>
        </div>

        <div className="space-y-10">
          {/* <div className="flex items-center justify-center relative -top-7">
            <button
              onClick={handleBack}
              className="px-6 py-1.5 bg-sky-600 text-white rounded absolute left-10 mt-28"
            >
              ⇦ Back
            </button>
          </div> */}

          {/* 🔵 Desktop Back Button */}
          <div className="hidden md:flex items-center justify-center relative -top-7">
            <button
              onClick={handleBack}
              className="px-6 py-1.5 bg-sky-600 text-white rounded absolute left-10 mt-28 text-base font-semibold shadow"
            >
              ⇦ Back
            </button>
          </div>

          {/* 🟢 Mobile Back Button */}
          <div className="block md:hidden absolute rounded-xl -top-1 left-4 z-50">
            <button
              onClick={handleBack}
              className="flex items-center bg-sky-300 px-3 py-1 shadow text-xs font-medium text-black"
            >
              ⇦ Back
            </button>
          </div>

          <div className="flex items-center justify-center relative">
            <TitleBar
              title={
                selectedSubject
                  ? `${selectedSubject.name} - Documents`
                  : "Search Documents"
              }
            />
          </div>

          <div className="max-w-7xl mx-auto space-y-10">
            {/* Filter Card */}
            <Card className="shadow-md ">
              <CardHeader className="border-b bg-gray-300 py-4">
                <div className="flex justify-between items-center">
                  <CardTitle className="text-lg font-semibold text-red-950 tracking-wide">
                    Filters
                  </CardTitle>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setIsFilterExpanded(!isFilterExpanded)}
                  >
                    {isFilterExpanded ? (
                      <X className="h-4 w-4" />
                    ) : (
                      <Search className="h-4 w-4" />
                    )}
                  </Button>
                </div>
              </CardHeader>

              {isFilterExpanded && (
                <CardContent className="p-6 bg-gray-300">
                  <Form {...form}>
                    <form
                      onSubmit={form.handleSubmit(onSubmit)}
                      className="space-y-6 relative"
                    >
                      {/* Document ID and Name */}
                      <div className="grid grid-cols-2 gap-6">
                        <FormField
                          control={form.control}
                          name="document_id"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel className="text-foreground/80">
                                Document ID
                              </FormLabel>
                              <FormControl>
                                <Input
                                  placeholder="Enter Document ID"
                                  className="border-input/20"
                                  {...field}
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={form.control}
                          name="name"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel className="text-foreground/80">
                                Document Name
                              </FormLabel>
                              <FormControl>
                                <Input
                                  placeholder="Enter Document Name"
                                  className="border-input/20"
                                  {...field}
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>

                      {/* Subject and Summary */}
                      <div className="grid grid-cols-2 gap-6">
                        {isLoadingSubjects ? (
                          <InputSkeleton />
                        ) : (
                          <FormField
                            control={form.control}
                            name="subject_id"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel className="text-foreground/80">
                                  Subject
                                </FormLabel>
                                <Select
                                  onValueChange={(value) =>
                                    field.onChange(Number(value))
                                  }
                                  value={field.value?.toString() || ""}
                                >
                                  <FormControl>
                                    <SelectTrigger className="border-input/20">
                                      <SelectValue placeholder="Select Subject" />
                                    </SelectTrigger>
                                  </FormControl>
                                  <SelectContent>
                                    {subjects?.map((subject) => (
                                      <SelectItem
                                        key={subject.id}
                                        value={subject.id.toString()}
                                      >
                                        {subject.name}
                                      </SelectItem>
                                    ))}
                                  </SelectContent>
                                </Select>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                        )}
                        <FormField
                          control={form.control}
                          name="summary"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel className="text-foreground/80">
                                Content/Summary
                              </FormLabel>
                              <FormControl>
                                <Input
                                  placeholder="Search in content..."
                                  className="border-input/20"
                                  {...field}
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>

                      {/* Document Type and Type of Work */}
                      <div className="grid grid-cols-2 gap-6">
                        <FormField
                          control={form.control}
                          name="document_type"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel className="text-foreground/80">
                                Document Type
                              </FormLabel>
                              <Select
                                onValueChange={field.onChange}
                                value={field.value || ""}
                              >
                                <FormControl>
                                  <SelectTrigger className="border-input/20">
                                    <SelectValue placeholder="Select Type" />
                                  </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                  {["Book", "Manuscript", "Article"].map(
                                    (type) => (
                                      <SelectItem
                                        key={type}
                                        value={type.toLowerCase()}
                                      >
                                        {type}
                                      </SelectItem>
                                    )
                                  )}
                                </SelectContent>
                              </Select>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={form.control}
                          name="type_of_work"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel className="text-foreground/80">
                                Type of Work
                              </FormLabel>
                              <Select
                                onValueChange={field.onChange}
                                value={field.value || ""}
                              >
                                <FormControl>
                                  <SelectTrigger className="border-input/20">
                                    <SelectValue placeholder="Select Type" />
                                  </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                  {[
                                    "Prose",
                                    "Poetry",
                                    "Prose and Poetry",
                                    "Compendium",
                                  ].map((type) => (
                                    <SelectItem
                                      key={type}
                                      value={type
                                        .toLowerCase()
                                        .replace(" ", "_")}
                                    >
                                      {type}
                                    </SelectItem>
                                  ))}
                                </SelectContent>
                              </Select>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>

                      {/* Language and Script */}
                      <div className="grid grid-cols-2 gap-6">
                        {isLoadingLanguages ? (
                          <InputSkeleton />
                        ) : (
                          <FormField
                            control={form.control}
                            name="language_id"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel className="text-foreground/80">
                                  Language
                                </FormLabel>
                                <Select
                                  onValueChange={(value) =>
                                    field.onChange(Number(value))
                                  }
                                  value={field.value?.toString() || ""}
                                >
                                  <FormControl>
                                    <SelectTrigger className="border-input/20">
                                      <SelectValue placeholder="Select Language" />
                                    </SelectTrigger>
                                  </FormControl>
                                  <SelectContent>
                                    {languages?.map((language) => (
                                      <SelectItem
                                        key={language.id}
                                        value={language.id.toString()}
                                      >
                                        {language.name}
                                      </SelectItem>
                                    ))}
                                  </SelectContent>
                                </Select>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                        )}
                        {isLoadingScripts ? (
                          <InputSkeleton />
                        ) : (
                          <FormField
                            control={form.control}
                            name="script_id"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel className="text-foreground/80">
                                  Script
                                </FormLabel>
                                <Select
                                  onValueChange={(value) =>
                                    field.onChange(Number(value))
                                  }
                                  value={field.value?.toString() || ""}
                                >
                                  <FormControl>
                                    <SelectTrigger className="border-input/20">
                                      <SelectValue placeholder="Select Script" />
                                    </SelectTrigger>
                                  </FormControl>
                                  <SelectContent>
                                    {scripts?.map((script) => (
                                      <SelectItem
                                        key={script.id}
                                        value={script.id.toString()}
                                      >
                                        {script.name}
                                      </SelectItem>
                                    ))}
                                  </SelectContent>
                                </Select>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                        )}
                      </div>

                      {/* Status and Beginning Line */}
                      <div className="grid grid-cols-2 gap-6">
                        <FormField
                          control={form.control}
                          name="documentStatus"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel className="text-foreground/80">
                                Document Status
                              </FormLabel>
                              <Select
                                onValueChange={field.onChange}
                                value={field.value || ""}
                              >
                                <FormControl>
                                  <SelectTrigger className="border-input/20">
                                    <SelectValue placeholder="Select Status" />
                                  </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                  <SelectItem value="active">Active</SelectItem>
                                  <SelectItem value="inactive">
                                    Inactive
                                  </SelectItem>
                                </SelectContent>
                              </Select>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={form.control}
                          name="beginningLine"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel className="text-foreground/80">
                                Beginning Line
                              </FormLabel>
                              <FormControl>
                                <Input
                                  placeholder="Enter Beginning Line"
                                  className="border-input/20"
                                  {...field}
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>

                      {/* Ending Line and Min Folios */}
                      <div className="grid grid-cols-2 gap-6">
                        <FormField
                          control={form.control}
                          name="endingLine"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel className="text-foreground/80">
                                Ending Line
                              </FormLabel>
                              <FormControl>
                                <Input
                                  placeholder="Enter Ending Line"
                                  className="border-input/20"
                                  {...field}
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={form.control}
                          name="minFolios"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel className="text-foreground/80">
                                Minimum Folios
                              </FormLabel>
                              <FormControl>
                                <Input
                                  type="number"
                                  placeholder="Enter Minimum Folios"
                                  className="border-input/20"
                                  {...field}
                                  onChange={(e) => {
                                    const value = e.target.value
                                      ? Number(e.target.value)
                                      : undefined
                                    field.onChange(value)
                                  }}
                                  value={
                                    field.value === undefined ? "" : field.value
                                  }
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>

                      {/* Max Folios and Author */}
                      <div className="grid grid-cols-2 gap-6">
                        <FormField
                          control={form.control}
                          name="maxFolios"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel className="text-foreground/80">
                                Maximum Folios
                              </FormLabel>
                              <FormControl>
                                <Input
                                  type="number"
                                  placeholder="Enter Maximum Folios"
                                  className="border-input/20"
                                  {...field}
                                  onChange={(e) => {
                                    const value = e.target.value
                                      ? Number(e.target.value)
                                      : undefined
                                    field.onChange(value)
                                  }}
                                  value={
                                    field.value === undefined ? "" : field.value
                                  }
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        {isLoadingAuthors ? (
                          <InputSkeleton />
                        ) : (
                          <FormField
                            control={form.control}
                            name="author_id"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel className="text-foreground/80">
                                  Author
                                </FormLabel>
                                <Select
                                  onValueChange={(value) =>
                                    field.onChange(Number(value))
                                  }
                                  value={field.value?.toString() || ""}
                                >
                                  <FormControl>
                                    <SelectTrigger className="border-input/20">
                                      <SelectValue placeholder="Select Author" />
                                    </SelectTrigger>
                                  </FormControl>
                                  <SelectContent>
                                    {authors?.map((author) => (
                                      <SelectItem
                                        key={author.id}
                                        value={author.id.toString()}
                                      >
                                        {author.name}
                                      </SelectItem>
                                    ))}
                                  </SelectContent>
                                </Select>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                        )}
                      </div>

                      {/* Specific Category */}
                      <div className="grid grid-cols-2 gap-6">
                        {isLoadingCategories ? (
                          <InputSkeleton />
                        ) : (
                          <FormField
                            control={form.control}
                            name="specific_category_id"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel className="text-foreground/80">
                                  Specific Category
                                </FormLabel>
                                <Select
                                  onValueChange={(value) =>
                                    field.onChange(Number(value))
                                  }
                                  value={field.value?.toString() || ""}
                                >
                                  <FormControl>
                                    <SelectTrigger className="border-input/20">
                                      <SelectValue placeholder="Select Specific Category" />
                                    </SelectTrigger>
                                  </FormControl>
                                  <SelectContent>
                                    {categories?.map((category) => (
                                      <SelectItem
                                        key={category.id}
                                        value={category.id.toString()}
                                      >
                                        {category.name}
                                      </SelectItem>
                                    ))}
                                  </SelectContent>
                                </Select>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                        )}
                      </div>

                      {/* Filter Actions */}
                      <div className="sticky bottom-0 flex justify-end space-x-2 p-4 ">
                        <Button
                          type="button"
                          variant="outline"
                          onClick={handleReset}
                        >
                          Reset
                        </Button>
                        <Button type="submit">Apply Filters</Button>
                      </div>
                    </form>
                  </Form>
                </CardContent>
              )}
            </Card>

            {/* Pass the filterParams to DocumentsTable instead of documents */}

            <DocumentsTableWrapper ref={documentsTableRef}>
              <DocumentsTable filterParams={filterParams} />
            </DocumentsTableWrapper>
          </div>
        </div>
      </div>
    </>
  )
}

export default DocumentsPage
