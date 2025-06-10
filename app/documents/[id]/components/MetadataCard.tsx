import { useGetLanguageQuery } from "@/api/languages.api"
import { useGetScriptQuery } from "@/api/scripts.api"
import { useGetSpecificCategoryQuery } from "@/api/specific_category.api"
import { useGetSubjectQuery } from "@/api/subjects.api"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { File, FileText, Scroll } from "lucide-react"

const MetadataCardSkeleton = () => {
  return (
    <Card className="shadow-md">
      <CardHeader className="border-b bg-primary/5 py-4">
        <div className="flex justify-between items-center">
          <CardTitle className="text-lg font-semibold text-primary">
            Work Details
          </CardTitle>
        </div>
      </CardHeader>
      <CardContent className="p-6">
        <div className="grid grid-cols-2 gap-x-6 gap-y-4">
          {/* Left Column */}
          <div className="space-y-4">
            {/* Document Type */}
            <div className="space-y-2">
              <div className="font-medium">Document Type</div>
              <div className="h-5 w-3/4 bg-gray-200 rounded animate-pulse"></div>
            </div>
            {/* Type of Work */}
            <div className="space-y-2">
              <div className="font-medium">Type of Work</div>
              <div className="h-5 w-3/4 bg-gray-200 rounded animate-pulse"></div>
            </div>
            {/* Language */}
            <div className="space-y-2">
              <div className="font-medium">Language</div>
              <div className="h-5 w-3/4 bg-gray-200 rounded animate-pulse"></div>
            </div>
          </div>
          {/* Right Column */}
          <div className="space-y-4">
            {/* Script */}
            <div className="space-y-2">
              <div className="font-medium">Script</div>
              <div className="h-5 w-3/4 bg-gray-200 rounded animate-pulse"></div>
            </div>
            {/* Subject */}
            <div className="space-y-2">
              <div className="font-medium">Subject</div>
              <div className="h-5 w-3/4 bg-gray-200 rounded animate-pulse"></div>
            </div>
            {/* Specific Category */}
            <div className="space-y-2">
              <div className="font-medium">Specific Category</div>
              <div className="h-5 w-3/4 bg-gray-200 rounded animate-pulse"></div>
            </div>
          </div>
          {/* Tags - Full Width */}
          <div className="col-span-2 space-y-2">
            <div className="font-medium">Tags</div>
            <div className="flex flex-wrap gap-2">
              {[1, 2, 3].map((_, index) => (
                <div
                  key={index}
                  className="h-6 w-16 bg-gray-200 rounded animate-pulse"
                ></div>
              ))}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

interface MetadataCardProps {
  document_type: string
  type_of_work: string | null
  tags: string[]

  language_id: number
  script_id: number
  subject_id: number
  specific_category_id: number
}

const MetadataCard = ({
  document_type,
  type_of_work,
  tags,
  language_id,
  script_id,
  subject_id,
  specific_category_id,
}: MetadataCardProps) => {
  const { data: subject, isLoading: isLoadingSubject } =
    useGetSubjectQuery(subject_id)
  const { data: language, isLoading: isLoadingLanguage } =
    useGetLanguageQuery(language_id)
  const { data: script, isLoading: isLoadingScript } =
    useGetScriptQuery(script_id)
  const { data: category, isLoading: isLoadingCategory } =
    useGetSpecificCategoryQuery(specific_category_id)

  // Helper function to get document type icon
  const getDocumentTypeIcon = () => {
    if (!document) return <File className="h-4 w-4" />

    switch (document_type.toLowerCase()) {
      case "manuscript":
        return <Scroll className="h-4 w-4" />
      case "book":
        return <FileText className="h-4 w-4" />
      default:
        return <File className="h-4 w-4" />
    }
  }
  const isLoading =
    (language_id && isLoadingLanguage) ||
    (script_id && isLoadingScript) ||
    (subject_id && isLoadingSubject) ||
    (specific_category_id && isLoadingCategory)

  if (isLoading) {
    return <MetadataCardSkeleton />
  }

  return (
    <Card className="shadow-md bg-cyan-800">
      <CardHeader className="border-b bg-primary/5 py-4">
        <div className="flex justify-between items-center">
          <CardTitle className="text-lg font-semibold text-white">
            Metadata Details
          </CardTitle>
        </div>
      </CardHeader>
      <CardContent className="p-6 bg-white">
        <div className="grid grid-cols-2 gap-x-6 gap-y-4">
          {/* Left Column */}
          <div className="space-y-4">
            {/* Document Type */}
            {document_type && (
              <div className="space-y-2">
                <div className="font-medium">Document Type</div>
                <p className="text-muted-foreground flex items-center">
                  {getDocumentTypeIcon()}
                  <span className="ml-2">
                    {document_type.charAt(0).toUpperCase() +
                      document_type.slice(1)}
                  </span>
                </p>
              </div>
            )}
            {/* Type of Work */}
            {type_of_work && (
              <div className="space-y-2">
                <div className="font-medium">Type of Work</div>
                <p className="text-muted-foreground">
                  {type_of_work
                    .replace(/_/g, " ")
                    .replace(/\b\w/g, (l) => l.toUpperCase())}
                </p>
              </div>
            )}
            {/* Language */}
            {language && (
              <div className="space-y-2">
                <div className="font-medium">Language</div>
                <p className="text-muted-foreground">{language.name}</p>
              </div>
            )}
          </div>
          {/* Right Column */}
          <div className="space-y-4">
            {/* Script */}
            {script && (
              <div className="space-y-2">
                <div className="font-medium">Script</div>
                <p className="text-muted-foreground">{script.name}</p>
              </div>
            )}
            {/* Subject */}
            {subject && (
              <div className="space-y-2">
                <div className="font-medium">Subject</div>
                <p className="text-muted-foreground">{subject.name}</p>
              </div>
            )}
            {/* Specific Category */}
            {category && (
              <div className="space-y-2">
                <div className="font-medium">Specific Category</div>
                <p className="text-muted-foreground">{category.name}</p>
              </div>
            )}
          </div>
          {/* Tags - Full Width */}
          {tags && tags.length > 0 && (
            <div className="col-span-2 space-y-2">
              <div className="font-medium">Tags</div>
              <div className="flex flex-wrap gap-2">
                {tags.map((tag, index) => (
                  <Badge key={index} variant="secondary">
                    {tag}
                  </Badge>
                ))}
              </div>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  )
}

export default MetadataCard
