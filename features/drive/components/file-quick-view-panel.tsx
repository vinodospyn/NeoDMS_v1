"use client"

import { ExternalLink, X } from "lucide-react"

import {
  Avatar,
  AvatarFallback,
  AvatarGroup,
  AvatarGroupCount,
} from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Separator } from "@/components/ui/separator"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { FileTypeIcon } from "@/features/drive/components/file-type-icon/file-type-icon"
import {
  getFileKindLabel,
  resolveFileKind,
} from "@/features/drive/lib/file-types"
import { explorerPanelHeaderClass } from "@/features/drive/lib/explorer-layout"
import type { DriveItem } from "@/features/drive/types"

type FileQuickViewPanelProps = {
  selectedItem: DriveItem | null
  onClose?: () => void
}

function KeyValue({ label, value }: { label: string; value: string }) {
  return (
    <div className="grid grid-cols-[minmax(0,5rem)_1fr] gap-x-3 gap-y-0.5 text-xs">
      <p className="text-muted-foreground">{label}</p>
      <p className="font-medium text-foreground">{value}</p>
    </div>
  )
}

export function FileQuickViewPanel({
  selectedItem,
  onClose,
}: FileQuickViewPanelProps) {
  const title = selectedItem?.name ?? "Certificates"
  const fileKind = resolveFileKind(
    selectedItem?.name,
    selectedItem?.type ?? "folder"
  )

  return (
    <aside className="flex h-full flex-col bg-background">
      <header className={explorerPanelHeaderClass}>
        <FileTypeIcon
          name={selectedItem?.name}
          explicitType={selectedItem?.type}
          variant="compact"
          size="md"
        />
        <p className="min-w-0 flex-1 truncate text-sm font-semibold tracking-tight text-foreground">
          {title}
        </p>
        <Button
          variant="ghost"
          size="icon-sm"
          className="text-muted-foreground hover:text-foreground"
          aria-label="Open in new tab"
        >
          <ExternalLink className="size-4" aria-hidden />
        </Button>
        <Button
          variant="ghost"
          size="icon-sm"
          className="text-muted-foreground hover:text-foreground"
          aria-label="Close certificates panel"
          onClick={onClose}
        >
          <X className="size-4" aria-hidden />
        </Button>
      </header>

      <ScrollArea className="min-h-0 flex-1">
        <div className="space-y-4 p-3.5">
          <section className="rounded-lg border border-border/60 bg-muted/15 p-3">
            <p className="text-xs font-semibold text-foreground">
              Active collaborators
            </p>
            <div className="mt-2.5 flex items-center gap-2">
              <AvatarGroup>
                {["RR", "SB", "AK", "UX"].map((initials) => (
                  <Avatar key={initials} size="sm">
                    <AvatarFallback className="text-[10px]">
                      {initials}
                    </AvatarFallback>
                  </Avatar>
                ))}
                <AvatarGroupCount className="text-xs">+15</AvatarGroupCount>
              </AvatarGroup>
            </div>
            <div className="mt-2.5 space-y-1 text-xs leading-relaxed">
              <p>
                <span className="text-muted-foreground">Owner </span>
                <span className="font-medium text-foreground">Rahul R</span>
              </p>
              <p className="text-muted-foreground">
                Shared with Business Solutions, Pre-Sales Ospyn, Suvarnakumari
                K R, and UX Team…
              </p>
            </div>
            <Button
              variant="secondary"
              size="sm"
              className="mt-3 h-8 w-full text-xs font-medium"
            >
              Sharing &amp; permissions
            </Button>
          </section>

          <Separator className="bg-border/50" />

          <Tabs defaultValue="properties" className="gap-0">
            <TabsList className="h-8 w-full justify-start gap-0.5 rounded-md bg-muted/40 p-0.5">
              <TabsTrigger
                value="properties"
                className="h-7 flex-1 rounded px-1.5 text-xs"
              >
                Properties
              </TabsTrigger>
              <TabsTrigger
                value="activity"
                className="h-7 flex-1 rounded px-1.5 text-xs"
              >
                Activity
              </TabsTrigger>
              <TabsTrigger
                value="storage"
                className="h-7 flex-1 rounded px-1.5 text-xs"
              >
                Storage
              </TabsTrigger>
              <TabsTrigger
                value="retention"
                className="h-7 flex-1 rounded px-1.5 text-xs"
              >
                Retention
              </TabsTrigger>
            </TabsList>

            <TabsContent value="properties" className="mt-3 outline-none">
              <p className="mb-2 text-xs font-semibold text-foreground">
                Details
              </p>
              <div className="space-y-2 rounded-lg border border-border/50 bg-background p-3">
                <KeyValue label="Type" value={getFileKindLabel(fileKind)} />
                <KeyValue label="Owner" value="Rahul R" />
                <KeyValue label="Modified" value="Apr 4, 2023" />
                <KeyValue label="Opened" value="May 11, 2026" />
                <KeyValue label="Created" value="Aug 27, 2018" />
              </div>
            </TabsContent>
            <TabsContent value="activity" className="mt-3 outline-none">
              <p className="rounded-lg border border-dashed border-border/50 bg-muted/10 px-3 py-5 text-center text-xs text-muted-foreground">
                Activity timeline coming soon.
              </p>
            </TabsContent>
            <TabsContent value="storage" className="mt-3 outline-none">
              <p className="rounded-lg border border-dashed border-border/50 bg-muted/10 px-3 py-5 text-center text-xs text-muted-foreground">
                Storage details coming soon.
              </p>
            </TabsContent>
            <TabsContent value="retention" className="mt-3 outline-none">
              <p className="rounded-lg border border-dashed border-border/50 bg-muted/10 px-3 py-5 text-center text-xs text-muted-foreground">
                Retention rules coming soon.
              </p>
            </TabsContent>
          </Tabs>
        </div>
      </ScrollArea>
    </aside>
  )
}
