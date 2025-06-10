"use client"

import { useState } from "react"
import Image from "next/image"
import Lightbox from "yet-another-react-lightbox"
import "yet-another-react-lightbox/styles.css"
import Fullscreen from "yet-another-react-lightbox/plugins/fullscreen"
import Counter from "yet-another-react-lightbox/plugins/counter"
import Slideshow from "yet-another-react-lightbox/plugins/slideshow"
import Thumbnails from "yet-another-react-lightbox/plugins/thumbnails"
import Zoom from "yet-another-react-lightbox/plugins/zoom"
import "yet-another-react-lightbox/plugins/counter.css"
import "yet-another-react-lightbox/plugins/thumbnails.css"
import { useRouter, useSearchParams } from "next/navigation"
import { useGetDocumentFileQuery } from "@/api/images.api"
import { FileIcon, ChevronLeftIcon, ImageIcon } from "lucide-react"

export default function ArticleImageDisplay() {
  const router = useRouter()
  const searchParams = useSearchParams()

  // Get query params from URL
  const document_id = parseInt(searchParams.get("doc_id") || "1", 10)
  const file_id = parseInt(searchParams.get("file_id") || "1", 10)
  const subject_id = Number(searchParams.get("subject_id"))

    const returnTo = searchParams.get("return_to")

    // State for lightbox & pagination
    const [open, setOpen] = useState(false)
    const [index, setIndex] = useState(0)
    const [currentPage, setCurrentPage] = useState(1)
    const imagesPerPage = 30

    // Fetch data
    const { data, isLoading, error } = useGetDocumentFileQuery(
      document_id,
      file_id
    )

    // Prepare slides for lightbox
    const slides =
      data?.image_paths?.map((path) => ({
        src: `${process.env.NEXT_PUBLIC_API_URL}/${path}`,
      })) || []

    // Pagination
    const totalPages = Math.ceil((slides.length || 0) / imagesPerPage)
    const startIndex = (currentPage - 1) * imagesPerPage
    const endIndex = startIndex + imagesPerPage
    const currentSlides = slides.slice(startIndex, endIndex)

    // Pagination handler
    const handlePageChange = (newPage: number) => {
      if (newPage < 1 || newPage > totalPages) return
      setCurrentPage(newPage)
      setIndex(0)
    }

    // Back button handler uses returnTo or fallback URL
    const handleBack = () => {
      if (returnTo) {
        router.push(
          `/front-pages/articles/${document_id}?from=${encodeURIComponent(
            `/front-pages/articles?subject_id=${subject_id}&tab=images`
          )}&tab=images`
        )
      } else {
        router.push(`/documents/${document_id}?tab=images`)
      }
    }

  // Loading state
  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-gray-600"></div>
      </div>
    )
  }

  // Error state
  if (error) {
    return (
      <div className="max-w-7xl mx-auto p-8 text-center mt-6">
        <div className="bg-gray-100 p-6 rounded-lg">
          <h3 className="text-lg font-medium text-gray-800">
            Error Loading Images
          </h3>
          <p className="mt-2 text-gray-600">
            {(error as Error).message || "Failed to load images"}
          </p>
        </div>
      </div>
    )
  }

  // No images state
  if (!data || !data.image_paths?.length) {
    return (
      <div className="max-w-7xl mx-auto p-8 text-center mt-6">
        <div className="bg-gray-100 p-6 rounded-lg">
          <ImageIcon className="mx-auto h-12 w-12 text-gray-400" />
          <h3 className="mt-2 text-lg font-medium text-gray-900">
            No Images Found
          </h3>
          <p className="mt-1 text-gray-500">
            There are no images available for this document.
          </p>
        </div>
      </div>
    )
  }

  return (
    <div className="max-w-7xl mx-auto mt-6">
      {/* Header */}
      <div className="bg-gray-50 shadow-sm rounded-lg mb-6">
        <div className="px-6 py-5">
          <div className="flex items-center mb-3">
            <button
              onClick={handleBack}
              className="mr-3 p-1 rounded-full hover:bg-gray-200 transition-colors"
              aria-label="Go back"
            >
              <ChevronLeftIcon className="h-5 w-5 text-gray-600" />
            </button>
            <div className="flex items-center">
              <FileIcon className="h-5 w-5 text-gray-600 mr-2" />
              <h3 className="text-lg font-semibold text-gray-900 truncate">
                {data.file_name}.{data.file_type}
              </h3>
            </div>
          </div>

          <div className="flex flex-wrap justify-between items-center">
            <div className="flex items-center space-x-4">
              <div className="px-3 py-1 bg-gray-200 rounded-full text-gray-800 text-sm font-medium">
                {data.no_of_pages} pages
              </div>
              <div className="px-3 py-1 bg-gray-200 rounded-full text-gray-800 text-sm font-medium">
                {slides.length} images
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Gallery Grid */}
      <div className="p-4">
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
          {currentSlides.map((slide, idx) => (
            <div
              key={startIndex + idx}
              className="hover:cursor-pointer relative aspect-[3/4] rounded-md overflow-hidden border border-gray-200 shadow-sm hover:shadow-md transition-shadow"
              onClick={() => {
                setIndex(idx)
                setOpen(true)
              }}
            >
              <Image
                src={slide.src}
                alt={`Page ${startIndex + idx + 1}`}
                fill
                sizes="(max-width: 640px) 50vw, (max-width: 768px) 33vw, (max-width: 1024px) 25vw, 16vw"
                className="object-cover"
                priority={idx < 9}
              />
              <div className="absolute bottom-0 right-0 bg-gray-800 bg-opacity-70 text-white text-xs px-2 py-1 rounded-tl-md">
                {startIndex + idx + 1}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Pagination Controls */}
      {totalPages > 1 && (
        <div className="flex items-center justify-center gap-2 my-6">
          <button
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className="px-3 py-1 border rounded-md disabled:opacity-50 hover:bg-gray-50"
            aria-label="Previous page"
          >
            Previous
          </button>
          <div className="flex gap-1">
            {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
              let pageNum: number
              if (totalPages <= 5) {
                pageNum = i + 1
              } else if (currentPage <= 3) {
                pageNum = i + 1
              } else if (currentPage >= totalPages - 2) {
                pageNum = totalPages - 4 + i
              } else {
                pageNum = currentPage - 2 + i
              }
              return (
                <button
                  key={pageNum}
                  onClick={() => handlePageChange(pageNum)}
                  className={`px-3 py-1 border rounded-md ${
                    currentPage === pageNum
                      ? "bg-gray-700 text-white"
                      : "hover:bg-gray-50"
                  }`}
                  aria-label={`Page ${pageNum}`}
                  aria-current={currentPage === pageNum ? "page" : undefined}
                >
                  {pageNum}
                </button>
              )
            })}
            {totalPages > 5 && currentPage < totalPages - 2 && (
              <>
                <span className="px-2">...</span>
                <button
                  onClick={() => handlePageChange(totalPages)}
                  className={`px-3 py-1 border rounded-md ${
                    currentPage === totalPages
                      ? "bg-gray-700 text-white"
                      : "hover:bg-gray-50"
                  }`}
                  aria-label={`Page ${totalPages}`}
                >
                  {totalPages}
                </button>
              </>
            )}
          </div>
          <button
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            className="px-3 py-1 border rounded-md disabled:opacity-50 hover:bg-gray-50"
            aria-label="Next page"
          >
            Next
          </button>
        </div>
      )}

      {/* Lightbox */}
      <Lightbox
        index={index}
        open={open}
        close={() => setOpen(false)}
        plugins={[Counter, Fullscreen, Slideshow, Thumbnails, Zoom]}
        slides={currentSlides}
      />
    </div>
  )
}
