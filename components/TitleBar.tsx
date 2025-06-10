import { Card, CardContent } from "@/components/ui/card"

interface TitleBarProps {
  title: string
}

const TitleBar = ({ title }: TitleBarProps) => {
  return (
    <Card className="mt-5 -mb-10 max-w-7xl mx-auto">
      <CardContent className="pt-0">
        <h2 className="scroll-m-20 text-3xl font-bold tracking-wide lg:text-3xl text-center underline text-white">
          {title}
        </h2>
      </CardContent>
    </Card>
  )
}

export default TitleBar
