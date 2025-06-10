import { useGetPublicationsQuery } from "@/api/publications.api"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

const PublicationCardSkeleton = () => {
  return (
    <Card className="shadow-md">
      <CardHeader className="border-b bg-primary/5 py-4">
        <div className="flex justify-between items-center">
          <CardTitle className="text-lg font-semibold text-primary">
            Publications
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
                  {/* Publisher Name */}
                  <div className="space-y-2">
                    <div className="font-medium">Publisher</div>
                    <div className="h-5 w-3/4 bg-gray-200 rounded animate-pulse"></div>
                  </div>
                  {/* Editor Name */}
                  <div className="space-y-2">
                    <div className="font-medium">Editor</div>
                    <div className="h-5 w-2/3 bg-gray-200 rounded animate-pulse"></div>
                  </div>
                </div>
                {/* Right Column */}
                <div className="space-y-4">
                  {/* Year */}
                  <div className="space-y-2">
                    <div className="font-medium">Year of Publication</div>
                    <div className="h-5 w-1/3 bg-gray-200 rounded animate-pulse"></div>
                  </div>
                  {/* Price */}
                  <div className="space-y-2">
                    <div className="font-medium">Price</div>
                    <div className="h-5 w-1/4 bg-gray-200 rounded animate-pulse"></div>
                  </div>
                  {/* Availability */}
                  <div className="space-y-2">
                    <div className="font-medium">Availability</div>
                    <div className="h-5 w-1/2 bg-gray-200 rounded animate-pulse"></div>
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

const PublicationCardError = ({ message }: { message: string }) => {
  return (
    <Card className="shadow-md">
      <CardHeader className="border-b bg-red-50 py-4">
        <div className="flex justify-between items-center">
          <CardTitle className="text-lg font-semibold text-red-500">
            Error Loading Publications
          </CardTitle>
        </div>
      </CardHeader>
      <CardContent className="p-6">
        <p className="text-red-500">{message}</p>
      </CardContent>
    </Card>
  )
}

const PublicationCard = ({ document_id }: { document_id: number }) => {
  const {
    data: publications,
    isLoading,
    error,
  } = useGetPublicationsQuery(document_id)

  if (isLoading) {
    return <PublicationCardSkeleton />
  }

  if (error) {
    return (
      <PublicationCardError message="Failed to load publications. Please try again later." />
    )
  }

  if (!publications || publications.length === 0) {
    return <PublicationCardError message="No publications found." />
  }

  // Function to format currency
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 0,
    }).format(price)
  }

  return (
    <Card className="shadow-md">
      <CardHeader className="border-b bg-cyan-800 py-4">
        <div className="flex justify-between items-center">
          <CardTitle className="text-lg font-semibold text-white">
            Publications ({publications.length})
          </CardTitle>
        </div>
      </CardHeader>
      <CardContent className="p-6 bg-white">
        <div className="space-y-6">
          {publications.map((publication) => (
            <div
              key={publication.id}
              className="border-b pb-4 last:border-0 last:pb-0"
            >
              <div className="grid grid-cols-2 gap-x-6 gap-y-4">
                {/* Left Column */}
                <div className="space-y-4">
                  {/* Publisher Name */}
                  <div className="space-y-2">
                    <div className="font-medium">Publisher</div>
                    <p className="text-muted-foreground">
                      {publication.name_of_publisher}
                    </p>
                  </div>
                  {/* Editor Name */}
                  {publication.name_of_editor && (
                    <div className="space-y-2">
                      <div className="font-medium">Editor</div>
                      <p className="text-muted-foreground">
                        {publication.name_of_editor}
                      </p>
                    </div>
                  )}
                  {/* Address if available */}
                  {publication.address && (
                    <div className="space-y-2">
                      <div className="font-medium">Address</div>
                      <p className="text-muted-foreground">
                        {publication.address}
                      </p>
                    </div>
                  )}
                </div>
                {/* Right Column */}
                <div className="space-y-4">
                  {/* Year of Publication */}
                  {publication.year_of_publication && (
                    <div className="space-y-2">
                      <div className="font-medium">Year of Publication</div>
                      <p className="text-muted-foreground">
                        {publication.year_of_publication}
                      </p>
                    </div>
                  )}
                  {/* Price */}
                  {publication.price !== undefined &&
                    publication.price !== null && (
                      <div className="space-y-2">
                        <div className="font-medium">Price</div>
                        <p className="text-muted-foreground font-medium">
                          {formatPrice(publication.price)}
                        </p>
                      </div>
                    )}
                  {/* Availability */}
                  <div className="space-y-2">
                    <div className="font-medium">Availability</div>
                    <div>
                      {publication.is_avail_in_print ? (
                        <Badge className="bg-green-100 text-green-800 hover:bg-green-200">
                          YES
                        </Badge>
                      ) : (
                        <Badge className="bg-yellow-100 text-yellow-800 hover:bg-yellow-200">
                          NO
                        </Badge>
                      )}
                    </div>
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

export default PublicationCard
