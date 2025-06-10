import { useGetNMMDetailsListQuery } from "@/api/nmm.api"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

const NMMDetailsSkeleton = () => {
  return (
    <Card className="shadow-md">
      <CardHeader className="border-b bg-primary/5 py-4">
        <div className="flex justify-between items-center">
          <CardTitle className="text-lg font-semibold text-primary">
            Manuscript Details
          </CardTitle>
        </div>
      </CardHeader>
      <CardContent className="p-6">
        <div className="space-y-6">
          {/* Basic Information */}
          <div className="border-b pb-4">
            <h3 className="font-medium text-lg mb-4">Basic Information</h3>
            <div className="grid grid-cols-2 gap-x-6 gap-y-4">
              {/* Left Column */}
              <div className="space-y-4">
                {["Collection Name", "Catalogue No.", "Documentation"].map(
                  (label) => (
                    <div key={label} className="space-y-2">
                      <div className="font-medium">{label}</div>
                      <div className="h-5 w-3/4 bg-gray-200 rounded animate-pulse"></div>
                    </div>
                  ),
                )}
              </div>
              {/* Right Column */}
              <div className="space-y-4">
                {["Source of Catalogue", "Catalogue Details", "Colophon"].map(
                  (label) => (
                    <div key={label} className="space-y-2">
                      <div className="font-medium">{label}</div>
                      <div className="h-5 w-3/4 bg-gray-200 rounded animate-pulse"></div>
                    </div>
                  ),
                )}
              </div>
            </div>
          </div>

          {/* Manuscript Characteristics */}
          <div className="border-b pb-4">
            <h3 className="font-medium text-lg mb-4">
              Manuscript Characteristics
            </h3>
            <div className="grid grid-cols-2 gap-x-6 gap-y-4">
              {/* Left Column */}
              <div className="space-y-4">
                {[
                  "Illustrations",
                  "Condition",
                  "Beginning Line",
                  "Ending Line",
                ].map((label) => (
                  <div key={label} className="space-y-2">
                    <div className="font-medium">{label}</div>
                    <div className="h-5 w-3/4 bg-gray-200 rounded animate-pulse"></div>
                  </div>
                ))}
              </div>
              {/* Right Column */}
              <div className="space-y-4">
                {[
                  "Lines Per Page",
                  "Characters Per Page",
                  "Ink/Pigment",
                  "Path",
                ].map((label) => (
                  <div key={label} className="space-y-2">
                    <div className="font-medium">{label}</div>
                    <div className="h-5 w-3/4 bg-gray-200 rounded animate-pulse"></div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Digitization Information */}
          <div>
            <h3 className="font-medium text-lg mb-4">
              Digitization Information
            </h3>
            <div className="grid grid-cols-2 gap-x-6 gap-y-4">
              {/* Left Column */}
              <div className="space-y-4">
                {["Digitized By", "Camera Make", "Camera Model"].map(
                  (label) => (
                    <div key={label} className="space-y-2">
                      <div className="font-medium">{label}</div>
                      <div className="h-5 w-3/4 bg-gray-200 rounded animate-pulse"></div>
                    </div>
                  ),
                )}
              </div>
              {/* Right Column */}
              <div className="space-y-4">
                {["Image Dimensions", "Resolution", "Digitized Date"].map(
                  (label) => (
                    <div key={label} className="space-y-2">
                      <div className="font-medium">{label}</div>
                      <div className="h-5 w-3/4 bg-gray-200 rounded animate-pulse"></div>
                    </div>
                  ),
                )}
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

const NMMDetailsError = ({ message }: { message: string }) => {
  return (
    <Card className="shadow-md">
      <CardHeader className="border-b bg-red-50 py-4">
        <div className="flex justify-between items-center">
          <CardTitle className="text-lg font-semibold text-red-500">
            Error Loading NMM Details
          </CardTitle>
        </div>
      </CardHeader>
      <CardContent className="p-6">
        <p className="text-red-500">{message}</p>
      </CardContent>
    </Card>
  )
}

const NMMDetailsCard = ({ document_id }: { document_id: number }) => {
  const {
    data: nmmDetails,
    isLoading,
    error,
  } = useGetNMMDetailsListQuery(document_id)

  if (isLoading) {
    return <NMMDetailsSkeleton />
  }

  if (error) {
    return (
      <NMMDetailsError message="Failed to load NMM details. Please try again later." />
    )
  }

  if (!nmmDetails || nmmDetails.length === 0) {
    return <NMMDetailsError message="No NMM details found." />
  }

  return (
    <Card className="shadow-md">
      <CardHeader className="border-b bg-cyan-800 py-4">
        <div className="flex justify-between items-center">
          <CardTitle className="text-lg font-semibold text-white">
            NMM Details ({nmmDetails.length})
          </CardTitle>
        </div>
      </CardHeader>
      <CardContent className="p-6 bg-white opacity-80">
        <div className="space-y-8">
          {nmmDetails.map((details, index) => (
            <div
              key={index}
              className={
                index < nmmDetails.length - 1 ? "border-b pb-6 mb-6" : ""
              }
            >
              <div className="space-y-6">
                {/* Basic Information */}
                <div className="border-b pb-4">
                  <h3 className="font-medium text-lg mb-4 text-cyan-800 underline">
                    Basic Information 
                  </h3>
                  <div className="grid grid-cols-2 gap-x-6 gap-y-4">
                    {/* Left Column */}
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <div className="font-medium">Collection Name</div>
                        <p className="text-muted-foreground">
                          {details.name_of_collection || "—"}
                        </p>
                      </div>
                      <div className="space-y-2">
                        <div className="font-medium">Catalogue No.</div>
                        <p className="text-muted-foreground">
                          {details.catalogue_no || "—"}
                        </p>
                      </div>
                      <div className="space-y-2">
                        <div className="font-medium">Documentation</div>
                        <p className="text-muted-foreground">
                          {details.documentation || "—"}
                        </p>
                      </div>
                      <div className="space-y-2">
                        <div className="font-medium">Created Date</div>
                        <p className="text-muted-foreground">
                          {details.median_created_date || "—"}
                        </p>
                      </div>
                    </div>
                    {/* Right Column */}
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <div className="font-medium">Source of Catalogue</div>
                        <p className="text-muted-foreground">
                          {details.source_of_catalogue || "—"}
                        </p>
                      </div>
                      <div className="space-y-2">
                        <div className="font-medium">Catalogue Details</div>
                        <p className="text-muted-foreground">
                          {details.catalogue_details || "—"}
                        </p>
                      </div>
                      <div className="space-y-2">
                        <div className="font-medium">Colophon</div>
                        <p className="text-muted-foreground">
                          {details.colophon || "—"}
                        </p>
                      </div>
                      <div className="space-y-2">
                        <div className="font-medium">Attributes</div>
                        <div className="flex flex-wrap gap-2">
                          {details.edited && (
                            <Badge variant="outline">Edited</Badge>
                          )}
                          {details.decorated && (
                            <Badge variant="outline">Decorated</Badge>
                          )}
                          {details.illustrations && (
                            <Badge variant="outline">Illustrated</Badge>
                          )}
                          {details.bound && (
                            <Badge variant="outline">
                              Bound: {details.bound}
                            </Badge>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Manuscript Characteristics */}
                <div className="border-b pb-4">
                  <h3 className="font-medium text-lg mb-4 text-cyan-800 underline">
                    Manuscript Characteristics
                  </h3>
                  <div className="grid grid-cols-2 gap-x-6 gap-y-4">
                    {/* Left Column */}
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <div className="font-medium">Illustrations</div>
                        <p className="text-muted-foreground">
                          {details.no_of_illustrations || "—"}
                        </p>
                      </div>
                      <div className="space-y-2">
                        <div className="font-medium">Condition</div>
                        <p className="text-muted-foreground">
                          {details.condn_of_manuscript || "—"}
                        </p>
                      </div>
                      <div className="space-y-2">
                        <div className="font-medium">Beginning Line</div>
                        <p className="text-muted-foreground">
                          {details.beginning_line || "—"}
                        </p>
                      </div>
                      <div className="space-y-2">
                        <div className="font-medium">Ending Line</div>
                        <p className="text-muted-foreground">
                          {details.ending_line || "—"}
                        </p>
                      </div>
                      <div className="space-y-2">
                        <div className="font-medium">Red Marking</div>
                        <p className="text-muted-foreground">
                          {details.red_marking || "—"}
                        </p>
                      </div>
                    </div>
                    {/* Right Column */}
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <div className="font-medium">Lines Per Page</div>
                        <p className="text-muted-foreground">
                          {details.lines_per_page || "—"}
                        </p>
                      </div>
                      <div className="space-y-2">
                        <div className="font-medium">Characters Per Page</div>
                        <p className="text-muted-foreground">
                          {details.characters_per_page || "—"}
                        </p>
                      </div>
                      <div className="space-y-2">
                        <div className="font-medium">Ink/Pigment</div>
                        <p className="text-muted-foreground">
                          {details.ink_or_pigment || "—"}
                        </p>
                      </div>
                      <div className="space-y-2">
                        <div className="font-medium">Path</div>
                        <p className="text-muted-foreground">
                          {details.patha || "—"}
                        </p>
                      </div>
                      <div className="space-y-2">
                        <div className="font-medium">Remarks</div>
                        <p className="text-muted-foreground">
                          {details.miscellaneous_remarks || "—"}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Digitization Information */}
                <div>
                  <h3 className="font-medium text-lg mb-4 text-cyan-800 underline">
                    Digitization Information
                  </h3>
                  <div className="grid grid-cols-2 gap-x-6 gap-y-4">
                    {/* Left Column */}
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <div className="font-medium">Digitized By</div>
                        <p className="text-muted-foreground">
                          {details.digitized_by || "—"}
                        </p>
                      </div>
                      <div className="space-y-2">
                        <div className="font-medium">Camera Make</div>
                        <p className="text-muted-foreground">
                          {details.camera_make || "—"}
                        </p>
                      </div>
                      <div className="space-y-2">
                        <div className="font-medium">Camera Model</div>
                        <p className="text-muted-foreground">
                          {details.camera_model || "—"}
                        </p>
                      </div>
                    </div>
                    {/* Right Column */}
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <div className="font-medium">Image Dimensions</div>
                        <p className="text-muted-foreground">
                          {details.avg_img_width && details.avg_img_height
                            ? `${details.avg_img_width} × ${details.avg_img_height}`
                            : "—"}
                        </p>
                      </div>
                      <div className="space-y-2">
                        <div className="font-medium">Resolution</div>
                        <p className="text-muted-foreground">
                          {details.x_resolution && details.y_resolution
                            ? `${details.x_resolution} × ${details.y_resolution}`
                            : "—"}
                        </p>
                      </div>
                      <div className="space-y-2">
                        <div className="font-medium">Digitized Date</div>
                        <p className="text-muted-foreground">
                          {details.median_digitised_date || "—"}
                        </p>
                      </div>
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

export default NMMDetailsCard
