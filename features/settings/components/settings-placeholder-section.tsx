type SettingsPlaceholderSectionProps = {
  title: string
  description?: string
}

export function SettingsPlaceholderSection({
  title,
  description = "This settings section will be connected to Neo Drive APIs. Navigation and routing are wired for the DMS shell.",
}: SettingsPlaceholderSectionProps) {
  return (
    <div className="rounded-xl border border-border/70 bg-background p-6">
      <h2 className="text-lg font-semibold tracking-tight text-foreground">
        {title}
      </h2>
      <p className="mt-2 max-w-2xl text-sm text-muted-foreground">
        {description}
      </p>
    </div>
  )
}
