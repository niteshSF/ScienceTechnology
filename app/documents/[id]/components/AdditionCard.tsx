import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

interface AdditionalCard {
  contrib_to_subject: string | null
  uniqueness_of_work: string | null
  other_details: string | null
}

const AdditionalCard = ({
  contrib_to_subject,
  uniqueness_of_work,
  other_details,
}: AdditionalCard) => {
  return (
    <Card className="shadow-md">
      <CardHeader className="border-b bg-cyan-800 py-4">
        <div className="flex justify-between items-center">
          <CardTitle className="text-lg font-semibold text-white">
            Additional Details
          </CardTitle>
        </div>
      </CardHeader>
      <CardContent className="p-6 space-y-4 bg-white">
        {/* Contribution to Subject */}
        {contrib_to_subject && (
          <div className="space-y-2">
            <div className="font-medium">Contribution to Subject</div>
            <p className="text-muted-foreground">{contrib_to_subject}</p>
          </div>
        )}
        {/* Uniqueness of Work */}
        {uniqueness_of_work && (
          <div className="space-y-2">
            <div className="font-medium">Uniqueness of Work</div>
            <p className="text-muted-foreground">{uniqueness_of_work}</p>
          </div>
        )}
        {/* Other Details */}
        {other_details && (
          <div className="space-y-2">
            <div className="font-medium">Other Details</div>
            <p className="text-muted-foreground">{other_details}</p>
          </div>
        )}
      </CardContent>
    </Card>
  )
}

export default AdditionalCard
