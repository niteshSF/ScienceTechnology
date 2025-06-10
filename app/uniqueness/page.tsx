import React from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import {
  Database,
  BookOpen,
  Search,
  Image,
  Library,
  GitMerge,
  Users,
  FileText,
} from "lucide-react"
import Header from "@/components/layouts/header"

export default function UniquenessPage() {
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
            Uniqueness of the Project
          </h1>
          <Separator className="my-6" />
        </div>

        {/* Main Content Sections */}
        <div className="space-y-12">
          {/* A. Comprehensive Database Access */}
          <section>
            <Card className="overflow-hidden">
              <CardHeader className="bg-primary/5 flex flex-row items-center gap-2">
                <Database className="h-6 w-6 text-primary" />
                <CardTitle>A. Comprehensive Database Access</CardTitle>
              </CardHeader>
              <CardContent className="pt-6">
                <div className="prose max-w-none">
                  <p>
                    Currently, search engines like Google can lead users to a
                    vast number of results in the field of science and
                    technology. However, these results are scattered across
                    multiple platforms and sources. In contrast, this project
                    brings together important works in the field of Science and
                    Technology into one centralized database, which will
                    continue to grow organically as new data is collected and
                    added.
                  </p>
                </div>
              </CardContent>
            </Card>
          </section>

          {/* B. Collection of Rare and Valuable Works */}
          <section>
            <Card className="overflow-hidden">
              <CardHeader className="bg-primary/5 flex flex-row items-center gap-2">
                <BookOpen className="h-6 w-6 text-primary" />
                <CardTitle>B. Collection of Rare and Valuable Works</CardTitle>
              </CardHeader>
              <CardContent className="pt-6">
                <div className="prose max-w-none">
                  <p>
                    Some books are as valuable as manuscripts, especially those
                    that are rare or out of print, with digital copies often not
                    readily available for students and scholars. This database
                    addresses this gap by collecting texts across three main
                    categories—Books, Articles, and Manuscripts. By not limiting
                    itself to a single category and including digital copies of
                    rare printed books, this project offers a more comprehensive
                    resource.
                  </p>
                </div>
              </CardContent>
            </Card>
          </section>

          {/* C. Advanced Search Capabilities */}
          <section>
            <Card className="overflow-hidden">
              <CardHeader className="bg-primary/5 flex flex-row items-center gap-2">
                <Search className="h-6 w-6 text-primary" />
                <CardTitle>C. Advanced Search Capabilities</CardTitle>
              </CardHeader>
              <CardContent className="pt-6">
                <div className="prose max-w-none">
                  <p>
                    The database allows users to search with various parameters,
                    such as the title (including titles with diacritical marks
                    and in Indian languages), the author's name, type of work
                    (original, commentary, sub-commentary, translation, etc.),
                    language, script, subject, and more. This feature greatly
                    enhances the usability and utility of the database for both
                    students and researchers.
                  </p>
                </div>
              </CardContent>
            </Card>
          </section>

          {/* D. Image-Level Tagging */}
          <section>
            <Card className="overflow-hidden">
              <CardHeader className="bg-primary/5 flex flex-row items-center gap-2">
                <Image className="h-6 w-6 text-primary" />
                <CardTitle>D. Image-Level Tagging</CardTitle>
              </CardHeader>
              <CardContent className="pt-6">
                <div className="prose max-w-none">
                  <p>
                    Based on resource availability, the database might include
                    image-level tagging for various works, further enhancing the
                    user experience and aiding in detailed navigation of
                    manuscripts.
                  </p>
                </div>
              </CardContent>
            </Card>
          </section>

          {/* E. Comprehensive Resource for Students and Researchers */}
          <section>
            <Card className="overflow-hidden">
              <CardHeader className="bg-primary/5 flex flex-row items-center gap-2">
                <Library className="h-6 w-6 text-primary" />
                <CardTitle>
                  E. Comprehensive Resource for Students and Researchers
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-6">
                <div className="prose max-w-none">
                  <p>
                    For students, this database serves as an online library of
                    books and articles, offering a wealth of resources for
                    academic study. For researchers, it acts as a repository of
                    existing literature, along with catalog entries for
                    unpublished manuscripts. This reduces the burden of
                    searching for inaccessible manuscripts and can aid in the
                    preparation of critical editions by providing a central,
                    easily accessible resource.
                  </p>
                </div>
              </CardContent>
            </Card>
          </section>

          {/* F. Workflow Management for Manuscript Publishing */}
          <section>
            <Card className="overflow-hidden">
              <CardHeader className="bg-primary/5 flex flex-row items-center gap-2">
                <GitMerge className="h-6 w-6 text-primary" />
                <CardTitle>
                  F. Workflow Management for Manuscript Publishing
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-6">
                <div className="prose max-w-none">
                  <p>
                    A key feature of this project is the{" "}
                    <strong>workflow management system</strong>{" "}
                    <strong>for publishing unpublished manuscripts</strong>. The
                    process begins with the administrator pushing an unpublished
                    manuscript to a common pool. A team of experts—transcribers,
                    verifiers, publishers, translators, and digitizers—can then
                    work on the manuscript remotely, with each member having
                    specific access based on their role. This process is tracked
                    through a central dashboard, allowing the administrator to
                    monitor progress and the stage each manuscript is at in the
                    publishing process. Manuscripts can be translated into
                    multiple languages and exported in PDF or rich text formats.
                  </p>
                </div>
              </CardContent>
            </Card>
          </section>

          {/* G. Remote Collaboration Support */}
          <section>
            <Card className="overflow-hidden">
              <CardHeader className="bg-primary/5 flex flex-row items-center gap-2">
                <Users className="h-6 w-6 text-primary" />
                <CardTitle>G. Remote Collaboration Support</CardTitle>
              </CardHeader>
              <CardContent className="pt-6">
                <div className="prose max-w-none">
                  <p>
                    The workflow system facilitates a virtual team environment
                    where contributors can work on the same manuscript from
                    different locations around the world. This is an essential
                    feature for enabling global collaboration in completing
                    tasks remotely.
                  </p>
                </div>
              </CardContent>
            </Card>
          </section>

          {/* H. Reporting and Filtering Features */}
          <section>
            <Card className="overflow-hidden">
              <CardHeader className="bg-primary/5 flex flex-row items-center gap-2">
                <FileText className="h-6 w-6 text-primary" />
                <CardTitle>H. Reporting and Filtering Features</CardTitle>
              </CardHeader>
              <CardContent className="pt-6">
                <div className="prose max-w-none">
                  <p>
                    The database includes a "report" feature that allows users
                    to generate status reports or detailed reports based on
                    specific filters. For example, selecting a detailed report
                    for books in the Astronomy subject category will display a
                    comprehensive view of all relevant works in this field,
                    including key details for each.
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
