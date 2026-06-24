"use client"

import { Clock } from "lucide-react"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import {
  Timeline,
  TimelineContent,
  TimelineItem,
  TimelineMarker,
} from "@/components/ui/timeline"
import type { PerspectiveTreeNode } from "@/features/drive/data/mock-perspective-tree"
import type {
  DocumentActivityEvent,
  DocumentActivityPart,
} from "@/features/drive/data/mock-document-activity"
import { getDocumentActivity } from "@/features/drive/lib/document-activity"
import { cn } from "@/lib/utils"

type DocumentActivityTimelineProps = {
  selectedNode: PerspectiveTreeNode | null
  className?: string
}

function ActivityPart({ part }: { part: DocumentActivityPart }) {
  if (part.type === "text") {
    return <span>{part.value}</span>
  }

  return (
    <button
      type="button"
      className={cn(
        "font-semibold underline decoration-border underline-offset-2",
        part.emphasis === "primary" && "text-primary decoration-primary/40"
      )}
    >
      {part.value}
    </button>
  )
}

function DocumentActivityCard({ event }: { event: DocumentActivityEvent }) {
  return (
    <article className="rounded-lg border border-border/70 bg-background p-3">
      <Badge
        variant="outline"
        className="mb-2 h-5 gap-1 rounded-full border-0 bg-primary/10 px-2 text-[10px] font-medium text-primary"
      >
        <Clock className="size-3" strokeWidth={2} />
        {event.timestamp}
      </Badge>

      <p className="text-xs leading-relaxed text-foreground">
        <button
          type="button"
          className="font-semibold underline decoration-border underline-offset-2"
        >
          {event.actorName}
        </button>{" "}
        {event.parts.map((part, index) => (
          <ActivityPart key={`${event.id}-${index}`} part={part} />
        ))}
      </p>
    </article>
  )
}

export function DocumentActivityTimeline({
  selectedNode,
  className,
}: DocumentActivityTimelineProps) {
  const events = getDocumentActivity(selectedNode)

  if (events.length === 0) {
    return (
      <p
        className={cn(
          "py-8 text-center text-xs text-muted-foreground",
          className
        )}
      >
        {selectedNode
          ? "No activity recorded for this item yet."
          : "Select a folder or document to view its activity timeline."}
      </p>
    )
  }

  return (
    <Timeline className={className}>
      {events.map((event) => (
        <TimelineItem key={event.id}>
          <TimelineMarker>
            <Avatar size="sm" className="size-8">
              {event.actorAvatarUrl ? (
                <AvatarImage src={event.actorAvatarUrl} alt={event.actorName} />
              ) : null}
              <AvatarFallback className="bg-muted text-[10px] font-semibold text-muted-foreground">
                {event.actorInitials}
              </AvatarFallback>
            </Avatar>
          </TimelineMarker>

          <TimelineContent>
            <DocumentActivityCard event={event} />
          </TimelineContent>
        </TimelineItem>
      ))}
    </Timeline>
  )
}
