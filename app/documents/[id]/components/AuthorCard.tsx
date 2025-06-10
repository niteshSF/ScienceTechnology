import { useGetAuthorQuery } from "@/api/authors.api"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

const AuthorCardSkeleton = () => {
  return (
    <Card className="shadow-md">
      <CardHeader className="border-b bg-primary/5 py-4">
        <div className="flex justify-between items-center">
          <CardTitle className="text-lg font-semibold text-primary">
            Author Details
          </CardTitle>
        </div>
      </CardHeader>
      <CardContent className="p-6">
        <div className="grid grid-cols-2 gap-x-6 gap-y-4">
          {/* Left Column */}
          <div className="space-y-4">
            {/* Author Name */}
            <div className="space-y-2">
              <div className="font-medium">Author Name</div>
              <div className="h-5 w-3/4 bg-gray-200 rounded animate-pulse"></div>
            </div>
          </div>
          {/* Right Column */}
          <div className="space-y-4">
            {/* Author Name in Diacritical */}
            <div className="space-y-2">
              <div className="font-medium">Author Name in Diacritical</div>
              <div className="h-5 w-3/4 bg-gray-200 rounded animate-pulse"></div>
            </div>
            {/* Period of Author */}
            <div className="space-y-2">
              <div className="font-medium">Period of Author</div>
              <div className="h-5 w-3/4 bg-gray-200 rounded animate-pulse"></div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

const AuthorCardError = ({ message }: { message: string }) => {
  return (
    <Card className="shadow-md">
      <CardHeader className="border-b bg-red-50 py-4">
        <div className="flex justify-between items-center">
          <CardTitle className="text-lg font-semibold text-red-500">
            Error Loading Author
          </CardTitle>
        </div>
      </CardHeader>
      <CardContent className="p-6">
        <p className="text-red-500">{message}</p>
      </CardContent>
    </Card>
  )
}

const AuthorCard = ({ id }: { id: number }) => {
  const { data: author, isLoading, error } = useGetAuthorQuery(id)

  if (isLoading) {
    return <AuthorCardSkeleton />
  }

  if (error) {
    return (
      <AuthorCardError message="Failed to load author details. Please try again later." />
    )
  }

  if (!author) {
    return <AuthorCardError message="Author not found." />
  }

  return (
    <div>
      <Card className="shadow-md">
        <CardHeader className="border-b bg-cyan-800 py-4">
          <div className="flex justify-between items-center">
            <CardTitle className="text-lg font-semibold text-white">
              Author Details
            </CardTitle>
          </div>
        </CardHeader>
        <CardContent className="p-6 bg-white">
          <div className="grid grid-cols-2 gap-x-6 gap-y-4">
            {/* Left Column */}
            <div className="space-y-4">
              {/* Author Name */}
              <div className="space-y-2">
                <div className="font-medium">Author Name</div>
                <p className="text-muted-foreground">{author.name}</p>
              </div>
            </div>
            {/* Right Column */}
            <div className="space-y-4">
              {/* Author Name in Diacritical */}
              {author.name_in_diacritical && (
                <div className="space-y-2">
                  <div className="font-medium">Author Name in Diacritical</div>
                  <p className="text-muted-foreground">
                    {author.name_in_diacritical}
                  </p>
                </div>
              )}
              {/* Period of Author */}
              {author.period_of_author && (
                <div className="space-y-2">
                  <div className="font-medium">Period of Author</div>
                  <p className="text-muted-foreground">
                    {author.period_of_author}
                  </p>
                </div>
              )}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

export default AuthorCard
