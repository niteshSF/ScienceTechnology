import { useGetScribeQuery } from "@/api/scribes.api"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

const ScribeCardSkeleton = () => {
  return (
    <Card className="shadow-md">
      <CardHeader className="border-b bg-primary/5 py-4">
        <div className="flex justify-between items-center">
          <CardTitle className="text-lg font-semibold text-primary">
            Scribe Details
          </CardTitle>
        </div>
      </CardHeader>
      <CardContent className="p-6">
        <div className="grid grid-cols-2 gap-x-6 gap-y-4">
          {/* Left Column */}
          <div className="space-y-4">
            {/* Scribe Name */}
            <div className="space-y-2">
              <div className="font-medium">Scribe Name</div>
              <div className="h-5 w-3/4 bg-gray-200 rounded animate-pulse"></div>
            </div>
            {/* Scribe Name in Diacritical */}
            <div className="space-y-2">
              <div className="font-medium">Scribe Name in Diacritical</div>
              <div className="h-5 w-3/4 bg-gray-200 rounded animate-pulse"></div>
            </div>
          </div>
          {/* Right Column */}
          <div className="space-y-4">
            {/* Scribe Name in Vernacular */}
            <div className="space-y-2">
              <div className="font-medium">Scribe Name in Vernacular</div>
              <div className="h-5 w-3/4 bg-gray-200 rounded animate-pulse"></div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

const ScribeCardError = ({ message }: { message: string }) => {
  return (
    <Card className="shadow-md">
      <CardHeader className="border-b bg-red-50 py-4">
        <div className="flex justify-between items-center">
          <CardTitle className="text-lg font-semibold text-red-500">
            Error Loading Scribe
          </CardTitle>
        </div>
      </CardHeader>
      <CardContent className="p-6">
        <p className="text-red-500">{message}</p>
      </CardContent>
    </Card>
  )
}

const ScribeCard = ({ id }: { id: number }) => {
  const { data: scribe, isLoading, error } = useGetScribeQuery(id)

  if (isLoading) {
    return <ScribeCardSkeleton />
  }

  if (error) {
    return (
      <ScribeCardError message="Failed to load scribe details. Please try again later." />
    )
  }

  if (!scribe) {
    return <ScribeCardError message="Scribe not found." />
  }

  return (
    <Card className="shadow-md">
      <CardHeader className="border-b bg-cyan-800 py-4">
        <div className="flex justify-between items-center">
          <CardTitle className="text-lg font-semibold text-white">
            Scribe Details
          </CardTitle>
        </div>
      </CardHeader>
      <CardContent className="p-6 bg-white">
        <div className="grid grid-cols-2 gap-x-6 gap-y-4">
          {/* Left Column */}
          <div className="space-y-4">
            {/* Scribe Name */}
            <div className="space-y-2">
              <div className="font-medium">Scribe Name</div>
              <p className="text-muted-foreground">{scribe.name}</p>
            </div>
            {/* Scribe Name in Diacritical */}
            {scribe.name_in_diacritical && (
              <div className="space-y-2">
                <div className="font-medium">Scribe Name in Diacritical</div>
                <p className="text-muted-foreground">
                  {scribe.name_in_diacritical}
                </p>
              </div>
            )}
          </div>
          {/* Right Column */}
          <div className="space-y-4">
            {/* Scribe Name in Vernacular */}
            {scribe.name_in_vernacular && (
              <div className="space-y-2">
                <div className="font-medium">Scribe Name in Vernacular</div>
                <p className="text-muted-foreground">
                  {scribe.name_in_vernacular}
                </p>
              </div>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

export default ScribeCard
