import React from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { Info, BookOpen, Database, Globe } from "lucide-react"
import Header from "@/components/layouts/header"

export default function AboutPage() {
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
            About Project
          </h1>
          <Separator className="my-6" />
        </div>

        {/* Main Content Sections */}
        <div className="space-y-12">
          {/* Overview Section */}
          <section>
            <Card className="overflow-hidden">
              <CardHeader className="bg-primary/5 flex flex-row items-center gap-2">
                <Info className="h-6 w-6 text-primary" />
                <CardTitle>Overview</CardTitle>
              </CardHeader>
              <CardContent className="pt-6">
                <div className="prose max-w-none">
                  <p>
                    Modern India is witnessing a unique blend of tradition and
                    modernity, both domestically and on the international stage.
                    On one hand, Indian Information Technology is being
                    celebrated as a global powerhouse, and on the other,
                    traditional Indian knowledge systems like Ayurveda, Yoga,
                    and more are gaining serious recognition and application.
                    The contribution of ancient Bharatiya civilizations to the
                    fields of Science and Technology is vast and invaluable.
                    Today, the world is turning its attention to these treasure
                    troves of knowledge preserved in ancient manuscripts,
                    seeking to integrate them into contemporary applications.
                    There is, therefore, an urgent need to collate, preserve,
                    and digitize these manuscripts for access by the scientific
                    community, students, and anyone interested in this
                    knowledge. The digital repository is an initiative aimed at
                    preserving and presenting these ancient, rare manuscripts in
                    digital format.
                  </p>
                </div>
              </CardContent>
            </Card>
          </section>

          {/* Heritage Section */}
          <section>
            <Card className="overflow-hidden">
              <CardHeader className="bg-primary/5 flex flex-row items-center gap-2">
                <BookOpen className="h-6 w-6 text-primary" />
                <CardTitle>India's Scientific Heritage</CardTitle>
              </CardHeader>
              <CardContent className="pt-6">
                <div className="prose max-w-none">
                  <p>
                    India has a rich and highly productive scientific heritage.
                    It houses one of the largest collections of scientific
                    manuscripts of any civilization in the world. While an exact
                    count of these manuscripts remains elusive, estimates
                    suggest that there are between 20,000 and 100,000
                    manuscripts. Many of these are housed in institutions such
                    as Oriental Manuscript Libraries, Indological Research
                    Institutions, universities, mutts, and archives, with some
                    still in private collections. Manuscripts are also preserved
                    in libraries across the world in countries such as the U.K.,
                    France, Germany, the U.S., and in Asian nations like Sri
                    Lanka, Nepal, Burma, Bhutan, China (Tibet), and Thailand.
                  </p>
                </div>
              </CardContent>
            </Card>
          </section>

          {/* Initiative Section */}
          <section>
            <Card className="overflow-hidden">
              <CardHeader className="bg-primary/5 flex flex-row items-center gap-2">
                <Database className="h-6 w-6 text-primary" />
                <CardTitle>Project Initiative</CardTitle>
              </CardHeader>
              <CardContent className="pt-6">
                <div className="prose max-w-none">
                  <p>
                    Unfortunately, there is no comprehensive or detailed data
                    regarding the number, extent, or distribution of these
                    scientific manuscripts. The scientific texts currently
                    available in published form represent less than 2% of the
                    total scientific literature contained in manuscripts. This
                    project aims to create a comprehensive bibliography of
                    manuscripts related to Science and Technology. It is a
                    pioneering initiative designed to allow users to search,
                    identify, and locate manuscripts and books in the field of
                    science and technology.
                  </p>
                </div>
              </CardContent>
            </Card>
          </section>

          {/* Significance Section */}
          <section>
            <Card className="overflow-hidden">
              <CardHeader className="bg-primary/5 flex flex-row items-center gap-2">
                <Globe className="h-6 w-6 text-primary" />
                <CardTitle>Project Goals and Impact</CardTitle>
              </CardHeader>
              <CardContent className="pt-6">
                <div className="prose max-w-none">
                  <p>
                    This digital initiative will serve as a valuable resource
                    for scholars, researchers, and anyone interested in
                    exploring the rich tradition of Bharatiya science and
                    technology. By making this information widely accessible,
                    the project hopes to encourage academic contributions that
                    bring this invaluable knowledge into the public domain.
                  </p>
                  <p className="mt-4">
                    To address the critical gap in knowledge, the current
                    project will develop{" "}
                    <strong>
                      a comprehensive, classified, electronic master catalogue
                      of all manuscripts and books on Science and Technology
                    </strong>
                    . This catalogue will contain detailed information about
                    works written in Sanskrit, English, and various regional
                    languages of India. The project will support scholars and
                    researchers in their respective fields, facilitating further
                    studies and the discovery of previously unknown theories in
                    science and technology. It will also help raise global
                    awareness about the original contributions of ancient India
                    to the scientific world and encourage further research into
                    both the practical and theoretical aspects of Indian systems
                    of science and technology.
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
