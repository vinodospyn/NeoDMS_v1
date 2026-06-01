type SectionPageProps = {
  title: string
  description: string
}

export function SectionPage({ title, description }: SectionPageProps) {
  return (
    <div className="mx-auto w-full max-w-4xl px-6 md:px-8">
      <div className="rounded-lg border bg-background p-6">
      <h1 className="text-2xl font-semibold tracking-tight">{title}</h1>
      <p className="mt-2 text-sm text-muted-foreground">{description}</p>
      </div>
    </div>
  )
}
