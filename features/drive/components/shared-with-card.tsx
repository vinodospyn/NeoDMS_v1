"use client"

import { Share2, UserRound, Users } from "lucide-react"

import { Button } from "@/components/ui/button"
import { DriveInfoCard } from "@/features/drive/components/drive-info-card"
import { cn } from "@/lib/utils"

export type SharedWithCardProps = {
  memberCount?: number
  groupCount?: number
  owner?: string
  sharedWith?: string
  manageSharingLabel?: string
  onManageSharing?: () => void
  className?: string
}

export function SharedWithCard({
  memberCount = 10,
  groupCount = 3,
  owner = "Rahul R",
  sharedWith = "Business Solutions, Pre-Sales Ospyn, Suvarnakumari K R, and UX Tea....",
  manageSharingLabel = "Manage Sharing",
  onManageSharing,
  className,
}: SharedWithCardProps) {
  const formattedGroupCount = String(groupCount).padStart(2, "0")

  return (
    <DriveInfoCard className={className}>
      <p className="text-sm font-semibold text-foreground">Shared with</p>

      <div className="mt-3 flex items-stretch gap-3">
        <div className="flex min-w-0 flex-1 items-center gap-2.5">
          <div className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-rose-50">
            <UserRound className="size-4 text-rose-500" strokeWidth={2} />
          </div>
          <div className="min-w-0">
            <p className="text-base leading-none font-semibold text-foreground">
              {memberCount}
            </p>
            <p className="mt-1 text-xs text-muted-foreground">Members</p>
          </div>
        </div>

        <div className="w-px shrink-0 bg-border/80" aria-hidden />

        <div className="flex min-w-0 flex-1 items-center gap-2.5">
          <div className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-amber-50">
            <Users className="size-4 text-amber-500" strokeWidth={2} />
          </div>
          <div className="min-w-0">
            <p className="text-base leading-none font-semibold text-foreground">
              {formattedGroupCount}
            </p>
            <p className="mt-1 text-xs text-muted-foreground">Groups</p>
          </div>
        </div>
      </div>

      <div className="mt-3 space-y-2 border-t border-border/60 pt-3 text-xs leading-relaxed">
        <p>
          <span className="font-semibold text-foreground">Owner : </span>
          <span className="text-foreground">{owner}</span>
        </p>
        <p>
          <span className="font-semibold text-foreground">Shared : </span>
          <span className="text-muted-foreground">{sharedWith}</span>
        </p>
      </div>

      <Button
        type="button"
        size="sm"
        className={cn("primary-button mt-3 h-8 rounded-full px-4 text-xs font-medium")}
        onClick={onManageSharing}
      >
        <Share2 className="size-3.5" />
        {manageSharingLabel}
      </Button>
    </DriveInfoCard>
  )
}
