import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

interface DocumentNameCardProps {
  name: string
  name_in_diacritical: string | null
  name_in_vernacular: string | null
}

const DocumentNameCard = ({
  name,
  name_in_vernacular,
  name_in_diacritical,
}: DocumentNameCardProps) => {
  return (
    <Card className="shadow-md bg-cyan-800">
      <CardHeader className="border-b bg-primary/5 py-4">
        <div className="flex justify-between items-center">
          <CardTitle className="text-lg font-semibold text-white">
            Document Name
          </CardTitle>
        </div>
      </CardHeader>
      <CardContent className="p-6 space-y-4 bg-white">
        <div className="flex">
          <div className="w-1/2 divide-y">
            <div className="px-6 py-4">
              <div className="font-medium mb-1">Name</div>
              <p className="text-gray-600">{name}</p>
            </div>
            <div className="px-6 py-4">
              <div className="font-medium mb-1">Name in Diacritical</div>
              <p className="text-gray-600">{name_in_diacritical || "-"}</p>
            </div>
          </div>
          <div className="w-1/2 border-l">
            <div className="px-6 py-4">
              <div className="font-medium mb-1">Name in Vernacular</div>
              <p className="text-gray-600">{name_in_vernacular || "-"}</p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

export default DocumentNameCard
