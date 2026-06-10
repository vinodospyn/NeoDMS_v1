import { cn } from "@/lib/utils"

export type DrivePropertyItem = {
  label: string
  value: string
}

type DrivePropertyFieldProps = {
  label: string
  value: string
  className?: string
}

export function DrivePropertyField({
  label,
  value,
  className,
}: DrivePropertyFieldProps) {
  return (
    <div className={cn("min-w-0", className)}>
      <p className="text-xs text-muted-foreground">{label}</p>
      <p className="mt-1 text-xs font-medium text-foreground">{value}</p>
    </div>
  )
}

type DrivePropertiesGridProps = {
  title?: string
  items: DrivePropertyItem[]
  className?: string
}

export function DrivePropertiesGrid({
  title = "Properties",
  items,
  className,
}: DrivePropertiesGridProps) {
  return (
    <div className={className}>
      {title ? (
        <p className="text-sm font-semibold text-foreground">{title}</p>
      ) : null}
      <div
        className={cn(
          "grid grid-cols-2 gap-x-4 gap-y-4",
          title ? "mt-3" : null
        )}
      >
        {items.map((item) => (
          <DrivePropertyField
            key={item.label}
            label={item.label}
            value={item.value}
          />
        ))}
      </div>
    </div>
  )
}
