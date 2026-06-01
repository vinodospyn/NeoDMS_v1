type DriveSectionHeaderProps = {
  title: string
  viewMoreHref?: string
}

export function DriveSectionHeader({
  title,
  viewMoreHref = "#",
}: DriveSectionHeaderProps) {
  return (
    <div className="mb-4 flex items-center justify-between gap-3">
      <h2 className="text-base font-semibold text-foreground">{title}</h2>
      <a href={viewMoreHref} className="drive-link text-sm font-medium hover:underline">
        View more
      </a>
    </div>
  )
}
