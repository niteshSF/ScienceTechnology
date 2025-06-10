import React from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { Database, Book, FileText, Globe } from "lucide-react"
import Header from "@/components/layouts/header"

export default function DigitalRepositoryPage() {
  return (
    <>
      <div>
        <Header />
      </div>

      <div className="container mx-auto py-8 px-4 md:px-6 lg:px-8">
        <div className="space-y-12">
          {/* Hero Section */}
          <div className="text-center space-y-4">
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-primary">
              Digital Repository
            </h1>
            <Separator className="my-6" />
          </div>

          {/* Main Content Sections */}
          <div className="space-y-12">
            {/* Catalogue Objective Section */}
            <section>
              <Card className="overflow-hidden">
                <CardHeader className="bg-primary/5 flex flex-row items-center gap-2">
                  <Database className="h-6 w-6 text-primary" />
                  <CardTitle>Project Objective</CardTitle>
                </CardHeader>
                <CardContent className="pt-6">
                  <div className="prose max-w-none">
                    <p>
                      The primary objective of this project is to create a{" "}
                      <strong>
                        classified, electronic master descriptive catalogue of
                        Ancient Manuscripts and Books related to Science and
                        Technology
                      </strong>
                      . This catalogue will act as a ready-reckoner, providing
                      immediate access to information about any book or
                      manuscript on Science and Technology. Users will be able
                      to locate works based on various parameters such as
                      language, type of work (commentary, sub-commentary, etc.),
                      nature of the work (original work, translation, poetry,
                      prose, or a combination of both), and whether the work is
                      published or unpublished. However, this catalogue will
                      only provide information about the work, not access to the
                      actual content.
                    </p>
                  </div>
                </CardContent>
              </Card>
            </section>

            {/* Future Enhancement Section */}
            <section>
              <Card className="overflow-hidden">
                <CardHeader className="bg-primary/5 flex flex-row items-center gap-2">
                  <Globe className="h-6 w-6 text-primary" />
                  <CardTitle>Future Enhancement</CardTitle>
                </CardHeader>
                <CardContent className="pt-6">
                  <div className="prose max-w-none">
                    <p>
                      A further enhancement of the project would be to enable
                      the end-user to access the work itself. This would
                      significantly aid scholars, researchers, and students by
                      providing them access to thousands of works from any
                      location around the world. As of now, no single
                      location—whether online or physical libraries—holds a
                      complete digital copy of such a large number of these
                      works.
                    </p>
                  </div>
                </CardContent>
              </Card>
            </section>

            {/* Expanded Scope Section */}
            <section>
              <Card className="overflow-hidden">
                <CardHeader className="bg-primary/5 flex flex-row items-center gap-2">
                  <FileText className="h-6 w-6 text-primary" />
                  <CardTitle>Expanded Scope</CardTitle>
                </CardHeader>
                <CardContent className="pt-6">
                  <div className="prose max-w-none">
                    <p>
                      Initially, the project focused solely on cataloguing
                      manuscripts and books. However, recognizing the importance
                      of articles containing valuable information on various
                      aspects of Science and Technology, many authored by
                      experts but not properly indexed or made available in
                      digital format, the scope was expanded to include these
                      articles as well. This addition broadens the project's
                      value and utility, representing a significant enhancement
                      to its original vision.
                    </p>
                  </div>
                </CardContent>
              </Card>
            </section>

            {/* Conclusion Section */}
            <section>
              <Card className="overflow-hidden">
                <CardHeader className="bg-primary/5 flex flex-row items-center gap-2">
                  <Book className="h-6 w-6 text-primary" />
                  <CardTitle>Comprehensive Approach</CardTitle>
                </CardHeader>
                <CardContent className="pt-6">
                  <div className="prose max-w-none">
                    <p>
                      This comprehensive approach ensures that the project
                      serves as a vital resource, preserving and making
                      accessible the rich legacy of ancient knowledge in Science
                      and Technology for generations to come.
                    </p>
                  </div>
                </CardContent>
              </Card>
            </section>
          </div>
        </div>
      </div>
    </>
  )
}
