"use client"

import { Trash2 } from "lucide-react"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  sharePermissionLabels,
  type SharePermission,
} from "@/features/drive/data/mock-manage-sharing"
import { cn } from "@/lib/utils"

type ShareRecipientRowProps = {
  name: string
  detail: string
  permission: SharePermission
  avatarUrl?: string
  avatarFallback?: string
  onPermissionChange?: (permission: SharePermission) => void
  onRemove?: () => void
  className?: string
}

export function ShareRecipientRow({
  name,
  detail,
  permission,
  avatarUrl,
  avatarFallback,
  onPermissionChange,
  onRemove,
  className,
}: ShareRecipientRowProps) {
  const initials =
    avatarFallback ??
    name
      .split(" ")
      .map((part) => part[0])
      .join("")
      .slice(0, 2)
      .toUpperCase()

  return (
    <div
      className={cn(
        "flex items-center gap-3 py-2.5",
        className
      )}
    >
      <Avatar size="sm" className="size-9">
        {avatarUrl ? <AvatarImage src={avatarUrl} alt={name} /> : null}
        <AvatarFallback className="bg-muted text-[10px] font-medium text-muted-foreground">
          {initials}
        </AvatarFallback>
      </Avatar>

      <div className="min-w-0 flex-1">
        <p className="truncate text-sm font-semibold text-foreground">{name}</p>
        <p className="truncate text-xs text-muted-foreground">{detail}</p>
      </div>

      <Select
        value={permission}
        onValueChange={(value) =>
          onPermissionChange?.(value as SharePermission)
        }
      >
        <SelectTrigger
          size="sm"
          className="h-8 w-[4.75rem] shrink-0 rounded-lg border-border/70 bg-muted/30 px-2 text-xs font-medium shadow-none"
        >
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          {Object.entries(sharePermissionLabels).map(([value, label]) => (
            <SelectItem key={value} value={value}>
              {label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      <Button
        type="button"
        variant="ghost"
        size="icon-sm"
        className="size-8 shrink-0 rounded-lg bg-rose-50 text-rose-500 hover:bg-rose-100 hover:text-rose-600"
        aria-label={`Remove ${name}`}
        onClick={onRemove}
      >
        <Trash2 className="size-4" strokeWidth={1.75} />
      </Button>
    </div>
  )
}
