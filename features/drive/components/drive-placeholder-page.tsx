import { SectionPage } from "@/components/common/section-page"

type DrivePlaceholderPageProps = {
  title: string
}

export function DrivePlaceholderPage({ title }: DrivePlaceholderPageProps) {
  return (
    <div className="mx-auto w-full max-w-[1400px] px-6 md:px-8">
      <SectionPage
        title={title}
        description="This section will be connected to Neo Drive APIs. The route and navigation are wired for the DMS shell."
      />
    </div>
  )
}
