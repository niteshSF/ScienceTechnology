import { useGetDocumentFilesQuery } from "@/api/images.api"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { FileImage, ExternalLink } from "lucide-react"
import Link from "next/link"

const ImagesCardSkeleton = () => {
  return (
    <Card className="shadow-md">
      <CardHeader className="border-b bg-primary/5 py-4">
        <div className="flex justify-between items-center">
          <CardTitle className="text-lg font-semibold text-primary">
            Document Images
          </CardTitle>
        </div>
      </CardHeader>
      <CardContent className="p-6">
        <div className="space-y-6">
          {[1, 2, 3].map((index) => (
            <div key={index} className="border-b pb-4 last:border-0 last:pb-0">
              <div className="flex items-start space-x-4">
                <div className="h-12 w-12 bg-gray-200 rounded flex items-center justify-center animate-pulse">
                  <FileImage className="text-gray-400 opacity-50" size={24} />
                </div>
                <div className="flex-1 space-y-2">
                  <div className="h-5 w-3/4 bg-gray-200 rounded animate-pulse"></div>
                  <div className="flex flex-wrap gap-2">
                    <div className="h-6 w-16 bg-gray-200 rounded animate-pulse"></div>
                    <div className="h-6 w-24 bg-gray-200 rounded animate-pulse"></div>
                  </div>
                </div>
                <div className="h-9 w-24 bg-gray-200 rounded animate-pulse"></div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}

const ImagesCardError = ({ message }: { message: string }) => {
  return (
    <Card className="shadow-md">
      <CardHeader className="border-b bg-red-50 py-4">
        <div className="flex justify-between items-center">
          <CardTitle className="text-lg font-semibold text-red-500">
            Error Loading Images
          </CardTitle>
        </div>
      </CardHeader>
      <CardContent className="p-6">
        <p className="text-red-500">{message}</p>
      </CardContent>
    </Card>
  )
}

const NoImagesFound = () => {
  return (
    <Card className="shadow-md">
      <CardHeader className="border-b bg-primary/5 py-4">
        <div className="flex justify-between items-center">
          <CardTitle className="text-lg font-semibold text-primary">
            Document Images
          </CardTitle>
        </div>
      </CardHeader>
      <CardContent className="p-6">
        <div className="text-center py-8">
          <FileImage className="mx-auto h-12 w-12 text-gray-400" />
          <h3 className="mt-4 text-lg font-medium text-gray-900">
            No images found
          </h3>
          <p className="mt-2 text-sm text-gray-500">
            There are no images available for this document.
          </p>
        </div>
      </CardContent>
    </Card>
  )
}

const getFileTypeColor = (fileType: string) => {
  const type = fileType.toLowerCase()
  if (type.includes("pdf")) return "bg-red-100 text-red-800 hover:bg-red-200"
  if (
    type.includes("jpg") ||
    type.includes("jpeg") ||
    type.includes("png") ||
    type.includes("gif")
  )
    return "bg-blue-100 text-blue-800 hover:bg-blue-200"
  if (type.includes("doc") || type.includes("docx"))
    return "bg-indigo-100 text-indigo-800 hover:bg-indigo-200"
  if (type.includes("xls") || type.includes("xlsx"))
    return "bg-green-100 text-green-800 hover:bg-green-200"
  if (type.includes("ppt") || type.includes("pptx"))
    return "bg-orange-100 text-orange-800 hover:bg-orange-200"
  return "bg-gray-100 text-gray-800 hover:bg-gray-200"
}

interface ImagesCardProps {
  document_id: number
  subject_id: number
}

const ArticleImagesCard = ({ document_id, subject_id }: ImagesCardProps) => {
  const {
    data: images,
    error,
    isLoading,
  } = useGetDocumentFilesQuery(document_id)

  if (isLoading) {
    return <ImagesCardSkeleton />
  }

  if (error) {
    return (
      <ImagesCardError message="Failed to load images. Please try again later." />
    )
  }

  if (!images || images.length === 0) {
    return <NoImagesFound />
  }

  return (
    <Card className="shadow-md">
      <CardHeader className="border-b bg-primary/5 py-4">
        <div className="flex justify-between items-center">
          <CardTitle className="text-lg font-semibold text-primary">
            Document Images ({images.length})
          </CardTitle>
        </div>
      </CardHeader>
      <CardContent className="p-6">
        <div className="space-y-6">
          {images.map((image) => (
            <div
              key={image.id}
              className="border-b pb-4 last:border-0 last:pb-0"
            >
              <div className="flex items-start space-x-4">
                <div className="h-12 w-12 bg-gray-100 rounded flex items-center justify-center">
                  <FileImage className="text-gray-500" size={24} />
                </div>
                <div className="flex-1">
                  <h3 className="font-medium text-gray-900 mb-1">
                    {image.file_name}
                  </h3>
                  <div className="flex flex-wrap gap-2 mb-2">
                    <Badge className={getFileTypeColor(image.file_type)}>
                      {image.file_type.toUpperCase()}
                    </Badge>
                    {image.no_of_pages > 0 && (
                      <Badge variant="outline">
                        {image.no_of_pages}{" "}
                        {image.no_of_pages === 1 ? "page" : "pages"}
                      </Badge>
                    )}
                  </div>
                </div>
                <Link
                  href={`/front-pages/articles/article-files?doc_id=${document_id}&file_id=${
                    image.id
                  }&subject_id=${subject_id}&return_to=${encodeURIComponent(
                    `/front-pages/articles?subject_id=${subject_id}`
                  )}`}
                >
                  <Button variant="outline" size="sm" className="space-x-1">
                    <span>View</span>
                    <ExternalLink size={16} />
                  </Button>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}

export default ArticleImagesCard
