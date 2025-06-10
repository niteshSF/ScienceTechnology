import { useGetSourcesQuery } from "@/api/sources.api"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

const SourceCardSkeleton = () => {
  return (
    <Card className="shadow-md">
      <CardHeader className="border-b bg-primary/5 py-4">
        <div className="flex justify-between items-center">
          <CardTitle className="text-lg font-semibold text-primary">
            Sources
          </CardTitle>
        </div>
      </CardHeader>
      <CardContent className="p-6">
        <div className="space-y-6">
          {[1, 2, 3].map((index) => (
            <div key={index} className="border-b pb-4 last:border-0 last:pb-0">
              <div className="grid grid-cols-2 gap-x-6 gap-y-4">
                {/* Left Column */}
                <div className="space-y-4">
                  {/* Source Name */}
                  <div className="space-y-2">
                    <div className="font-medium">Name</div>
                    <div className="h-5 w-3/4 bg-gray-200 rounded animate-pulse"></div>
                  </div>
                  {/* Source Type */}
                  <div className="space-y-2">
                    <div className="font-medium">Type</div>
                    <div className="h-5 w-1/2 bg-gray-200 rounded animate-pulse"></div>
                  </div>
                </div>
                {/* Right Column */}
                <div className="space-y-4">
                  {/* Website */}
                  <div className="space-y-2">
                    <div className="font-medium">Website</div>
                    <div className="h-5 w-3/4 bg-gray-200 rounded animate-pulse"></div>
                  </div>
                  {/* Contact Info */}
                  <div className="space-y-2">
                    <div className="font-medium">Contact</div>
                    <div className="h-5 w-3/4 bg-gray-200 rounded animate-pulse"></div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}

const SourceCardError = ({ message }: { message: string }) => {
  return (
    <Card className="shadow-md">
      <CardHeader className="border-b bg-red-50 py-4">
        <div className="flex justify-between items-center">
          <CardTitle className="text-lg font-semibold text-red-500">
            Error Loading Sources
          </CardTitle>
        </div>
      </CardHeader>
      <CardContent className="p-6">
        <p className="text-red-500">{message}</p>
      </CardContent>
    </Card>
  )
}

const SourceCard = ({ document_id }: { document_id: number }) => {
  const { data: sources, isLoading, error } = useGetSourcesQuery(document_id)

  if (isLoading) {
    return <SourceCardSkeleton />
  }

  if (error) {
    return (
      <SourceCardError message="Failed to load sources. Please try again later." />
    )
  }

  if (!sources || sources.length === 0) {
    return <SourceCardError message="No sources found." />
  }

  return (
    <Card className="shadow-md">
      <CardHeader className="border-b bg-cyan-800 py-4">
        <div className="flex justify-between items-center">
          <CardTitle className="text-lg font-semibold text-white">
            Sources ({sources.length})
          </CardTitle>
        </div>
      </CardHeader>
      <CardContent className="p-6 bg-white">
        <div className="space-y-6">
          {sources.map((source) => (
            <div
              key={source.id}
              className="border-b pb-4 last:border-0 last:pb-0"
            >
              <div className="grid grid-cols-2 gap-x-6 gap-y-4">
                {/* Left Column */}
                <div className="space-y-4">
                  {/* Source Name */}
                  <div className="space-y-2">
                    <div className="font-medium">Name</div>
                    <p className="text-muted-foreground">{source.name}</p>
                  </div>
                  {/* Source Type */}
                  {source.type && (
                    <div className="space-y-2">
                      <div className="font-medium">Type</div>
                      <p className="text-muted-foreground capitalize">
                        {source.type}
                      </p>
                    </div>
                  )}
                  {/* Address if available */}
                  {source.address && (
                    <div className="space-y-2">
                      <div className="font-medium">Address</div>
                      <p className="text-muted-foreground">{source.address}</p>
                    </div>
                  )}
                </div>
                {/* Right Column */}
                <div className="space-y-4">
                  {/* Website */}
                  {source.website && (
                    <div className="space-y-2">
                      <div className="font-medium">Website</div>
                      <a
                        href={
                          source.website.startsWith("http")
                            ? source.website
                            : `https://${source.website}`
                        }
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-muted-foreground hover:underline truncate block"
                      >
                        {source.website}
                      </a>
                    </div>
                  )}
                  {/* Contact Info - Email */}
                  {source.email && (
                    <div className="space-y-2">
                      <div className="font-medium">Email</div>
                      <a
                        href={`mailto:${source.email}`}
                        className="text-muted-foreground hover:underline"
                      >
                        {source.email}
                      </a>
                    </div>
                  )}
                  {/* Contact Info - Phone */}
                  {source.phone_no && (
                    <div className="space-y-2">
                      <div className="font-medium">Phone</div>
                      <a
                        href={`tel:${source.phone_no}`}
                        className="text-muted-foreground hover:underline"
                      >
                        {source.phone_no}
                      </a>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}

export default SourceCard
