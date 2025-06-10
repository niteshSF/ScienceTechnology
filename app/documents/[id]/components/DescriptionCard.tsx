import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

interface DescriptionCardProps {
  summary: string | null
  table_of_contents: string | null
}

const DescriptionCard = ({
  summary,
  table_of_contents,
}: DescriptionCardProps) => {
  return (
    <Card className="shadow-md ">
      <CardHeader className="border-b bg-cyan-800 py-4">
        <div className="flex justify-between items-center">
          <CardTitle className="text-lg font-semibold text-white">
            Description
          </CardTitle>
        </div>
      </CardHeader>
      <CardContent className="p-6 space-y-4 bg-white">
        {/* Summary */}
        {summary && (
          <div className="space-y-2">
            <div className="font-medium ">Summary</div>
            <p className="text-muted-foreground">{summary}</p>
          </div>
        )}
        {/* Table of Contents */}
        {table_of_contents && (
          <div className="space-y-2">
            <div className="font-medium">Table of Contents</div>
            <div className="text-muted-foreground whitespace-pre-line">
              {table_of_contents}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  )
}

export default DescriptionCard
