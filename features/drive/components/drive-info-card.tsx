import { cn } from "@/lib/utils"

type DriveInfoCardProps = {
  children: React.ReactNode
  className?: string
}

export function DriveInfoCard({ children, className }: DriveInfoCardProps) {
  return (
    <section
      className={cn(
        "rounded-xl border border-border/70 bg-background p-3.5",
        className
      )}
    >
      {children}
    </section>
  )
}
