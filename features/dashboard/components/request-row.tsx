"use client"

import { FileText, MoreVertical, Users } from "lucide-react"

import { Avatar, AvatarFallback, AvatarGroup } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { cn } from "@/lib/utils"
import type { Request, RequestStatus } from "@/features/dashboard/types"

const STATUS_LABEL: Record<RequestStatus, string> = {
  "in-progress": "In Progress",
  completed: "Completed",
  draft: "Draft",
  rejected: "Rejected",
}

const STATUS_DOT: Record<RequestStatus, string> = {
  "in-progress": "bg-amber-500",
  completed: "bg-emerald-500",
  draft: "bg-muted-foreground",
  rejected: "bg-rose-500",
}

const CHANNEL_BADGE: Record<Request["channel"], string> = {
  FTP:
    "border-transparent bg-rose-100 text-rose-700 dark:bg-rose-500/15 dark:text-rose-300",
  API:
    "border-transparent bg-violet-100 text-violet-700 dark:bg-violet-500/15 dark:text-violet-300",
  WEB:
    "border-transparent bg-sky-100 text-sky-700 dark:bg-sky-500/15 dark:text-sky-300",
}

const STAMP_KEY_TINT: Record<Request["stampDetailsKey"], string> = {
  JK: "bg-amber-100 text-amber-700 dark:bg-amber-500/15 dark:text-amber-300",
  KA: "bg-emerald-100 text-emerald-700 dark:bg-emerald-500/15 dark:text-emerald-300",
  MH: "bg-rose-100 text-rose-700 dark:bg-rose-500/15 dark:text-rose-300",
  TN: "bg-sky-100 text-sky-700 dark:bg-sky-500/15 dark:text-sky-300",
  DL: "bg-violet-100 text-violet-700 dark:bg-violet-500/15 dark:text-violet-300",
}

const SIGNER_TINTS = [
  "bg-emerald-100 text-emerald-700 dark:bg-emerald-500/20 dark:text-emerald-200",
  "bg-violet-100 text-violet-700 dark:bg-violet-500/20 dark:text-violet-200",
  "bg-amber-100 text-amber-700 dark:bg-amber-500/20 dark:text-amber-200",
  "bg-sky-100 text-sky-700 dark:bg-sky-500/20 dark:text-sky-200",
]

type RequestRowProps = {
  request: Request
}

export function RequestRow({ request }: RequestRowProps) {
  const visibleSigners = request.signers.slice(0, 3)
  const overflow = Math.max(request.signers.length - visibleSigners.length, 0)

  return (
    <>
      <td className="w-[22%] align-middle">
        <div className="flex items-center gap-2">
          <p className="text-sm font-semibold tracking-tight">{request.id}</p>
          <Badge className={cn("text-[10px]", CHANNEL_BADGE[request.channel])}>
            {request.channel}
          </Badge>
        </div>
        <p className="mt-1 text-xs text-muted-foreground">{request.dateTime}</p>
      </td>

      <td className="relative w-[12%] align-middle before:absolute before:top-3 before:bottom-3 before:left-0 before:w-px before:bg-border/80 before:content-['']">
        <p className="text-[11px] text-muted-foreground">Documents</p>
        <div className="mt-1 flex items-center gap-1.5">
          <FileText className="size-4 text-emerald-600" aria-hidden />
          <p className="text-xl leading-none font-medium tabular-nums">
            {String(request.documentsCount).padStart(2, "0")}
          </p>
        </div>
      </td>

      <td className="relative w-[20%] align-middle before:absolute before:top-3 before:bottom-3 before:left-0 before:w-px before:bg-border/80 before:content-['']">
        <p className="text-[11px] text-muted-foreground">Signers</p>
        <div className="mt-1 flex items-center gap-2">
          <AvatarGroup className="-space-x-1.5">
            {visibleSigners.map((signer, idx) => (
              <Avatar
                key={`${signer.name}-${signer.initials}-${idx}`}
                size="sm"
                className="ring-6 ring-background"
              >
                <AvatarFallback
                  className={cn(
                    "text-[6px] font-medium",
                    SIGNER_TINTS[idx % SIGNER_TINTS.length]
                  )}
                >
                  {signer.initials}
                </AvatarFallback>
              </Avatar>
            ))}
          </AvatarGroup>
          <span className="text-xs text-muted-foreground">
            {request.signers.length} signers
            {overflow > 0 ? ` (+${overflow})` : null}
          </span>
        </div>
      </td>

      <td className="relative w-[18%] align-middle before:absolute before:top-3 before:bottom-3 before:left-0 before:w-px before:bg-border/80 before:content-['']">
        <div className="flex items-center gap-2">
          <p className="text-[11px] text-muted-foreground">Stamp Details</p>
          <span
            className={cn(
              "inline-flex h-4 min-w-6 items-center justify-center rounded-sm px-1 text-xs font-semibold",
              STAMP_KEY_TINT[request.stampDetailsKey]
            )}
          >
            {request.stampDetailsKey}
          </span>
        </div>
        <div className="mt-1 flex items-center gap-2">
          <span className="text-lg leading-none font-semibold tabular-nums">
            {request.amount === null ? "--" : `₹${request.amount}`}
          </span>
          {request.amount !== null ? (
            <span className="flex items-center gap-1 text-xs text-muted-foreground">
              <Users className="size-3" />
              {request.partiesCount} Parties
            </span>
          ) : null}
        </div>
      </td>

      <td className="relative w-[24%] align-middle before:absolute before:top-3 before:bottom-3 before:left-0 before:w-px before:bg-border/80 before:content-['']">
        <div className="flex items-center gap-2">
          <span
            className={cn("size-2 rounded-full", STATUS_DOT[request.status])}
            aria-hidden
          />
          <p className="text-sm font-medium">{STATUS_LABEL[request.status]}</p>
        </div>
        <p className="mt-1 text-xs text-muted-foreground">
          {request.lastActionLabel} <span aria-hidden>·</span> {request.lastActionAgo}
        </p>
      </td>

      <td className="relative w-[4%] align-middle text-right before:absolute before:top-3 before:bottom-3 before:left-0 before:w-px before:bg-border/80 before:content-['']">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="outline"
              size="icon-sm"
              className="h-8 w-8 text-muted-foreground"
              aria-label="Request actions"
            >
              <MoreVertical className="size-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            align="end"
            className="w-56 min-w-56 rounded-md border border-border/80 bg-background p-2 shadow-lg"
          >
            <DropdownMenuItem className="rounded-sm px-4 py-2.5 text-sm font-medium text-slate-600 focus:text-slate-700">
              View Details
            </DropdownMenuItem>
            <DropdownMenuItem className="rounded-sm px-4 py-2.5 text-sm font-medium text-slate-600 focus:text-slate-700">
              Download
            </DropdownMenuItem>
            <DropdownMenuItem className="rounded-sm px-4 py-2.5 text-sm font-medium text-slate-600 focus:text-slate-700">
              Audit trail
            </DropdownMenuItem>
            <DropdownMenuItem className="rounded-sm px-4 py-2.5 text-sm font-medium text-slate-600 focus:text-slate-700">
              Send Reminder
            </DropdownMenuItem>
            <DropdownMenuItem className="rounded-sm px-4 py-2.5 text-sm font-medium text-slate-600 focus:text-slate-700">
              View Timeline
            </DropdownMenuItem>
            <DropdownMenuItem className="rounded-sm px-4 py-2.5 text-sm font-medium text-slate-600 focus:text-slate-700">
              Edit
            </DropdownMenuItem>
            <DropdownMenuItem
              variant="destructive"
              className="rounded-sm px-4 py-2.5 text-sm font-medium"
            >
              Delete
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </td>
    </>
  )
}
