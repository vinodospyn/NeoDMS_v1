import * as React from "react"

import { cn } from "@/lib/utils"

function Timeline({
  className,
  children,
  ...props
}: React.ComponentProps<"ol">) {
  return (
    <ol
      data-slot="timeline"
      className={cn("relative flex flex-col gap-4", className)}
      {...props}
    >
      <span
        aria-hidden
        className="absolute top-4 bottom-4 left-4 w-0.5 -translate-x-1/2 bg-border"
      />
      {children}
    </ol>
  )
}

function TimelineItem({
  className,
  ...props
}: React.ComponentProps<"li">) {
  return (
    <li
      data-slot="timeline-item"
      className={cn("relative flex items-start gap-3", className)}
      {...props}
    />
  )
}

function TimelineMarker({
  className,
  children,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="timeline-marker"
      className={cn(
        "relative z-10 flex w-8 shrink-0 justify-center",
        className
      )}
      {...props}
    >
      {children}
    </div>
  )
}

function TimelineContent({
  className,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="timeline-content"
      className={cn("min-w-0 flex-1", className)}
      {...props}
    />
  )
}

export { Timeline, TimelineItem, TimelineMarker, TimelineContent }
