"use client"

import * as React from "react"
import { ExternalLink, Folder, X } from "lucide-react"

import { Avatar, AvatarFallback, AvatarGroup, AvatarGroupCount } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import type { DriveItem } from "@/features/drive/types"

type FileQuickViewPanelProps = {
  selectedItem: DriveItem | null
}

function KeyValue({ label, value }: { label: string; value: string }) {
  return (
    <div className="grid grid-cols-2 gap-3 text-xs">
      <p className="text-muted-foreground">{label}</p>
      <p className="text-foreground">{value}</p>
    </div>
  )
}

export function FileQuickViewPanel({ selectedItem }: FileQuickViewPanelProps) {
  const title = selectedItem?.name ?? "Certificates"
  const type = selectedItem?.type ?? "folder"

  return (
    <aside className="flex h-full flex-col border-l bg-background">
      <div className="flex h-12 items-center gap-2 border-b px-3">
        <Folder className="size-4 text-muted-foreground" aria-hidden />
        <p className="min-w-0 flex-1 truncate text-sm font-semibold text-foreground">
          {title}
        </p>
        <Button variant="ghost" size="icon-sm" className="text-muted-foreground" aria-label="Open in new tab">
          <ExternalLink className="size-4" aria-hidden />
        </Button>
        <Button variant="ghost" size="icon-sm" className="text-muted-foreground" aria-label="Close">
          <X className="size-4" aria-hidden />
        </Button>
      </div>

      <div className="min-h-0 flex-1 overflow-y-auto p-3">
        <div className="rounded-xl border bg-muted/20 p-3">
          <p className="text-xs font-semibold text-foreground">Active Collaborators</p>
          <div className="mt-2 flex items-center justify-between gap-2">
            <AvatarGroup>
              {["RR", "SB", "AK", "UX"].map((initials) => (
                <Avatar key={initials} size="sm">
                  <AvatarFallback className="text-[10px]">{initials}</AvatarFallback>
                </Avatar>
              ))}
              <AvatarGroupCount className="text-xs">+15</AvatarGroupCount>
            </AvatarGroup>
          </div>
          <div className="mt-3 space-y-1.5 text-xs">
            <p className="text-foreground">
              <span className="text-muted-foreground">Owner :</span> Rahul R
            </p>
            <p className="text-muted-foreground">
              Shared : Business Solutions, Pre-Sales Ospyn, Suvarnakumari K R, and UX Team...
            </p>
          </div>
          <Button variant="secondary" size="sm" className="mt-3 w-full justify-start">
            Sharing &amp; Permissions
          </Button>
        </div>

        <Tabs defaultValue="properties" className="mt-4">
          <TabsList className="w-full justify-start bg-muted/40">
            <TabsTrigger value="properties">Properties</TabsTrigger>
            <TabsTrigger value="activity">Activity</TabsTrigger>
            <TabsTrigger value="storage">Storage</TabsTrigger>
            <TabsTrigger value="retention">Retention</TabsTrigger>
          </TabsList>

          <TabsContent value="properties" className="pt-3">
            <div className="space-y-3">
              <p className="text-xs font-semibold text-foreground">Properties</p>
              <div className="space-y-2">
                <KeyValue label="Type" value={type === "folder" ? "Google Drive Folder" : type.toUpperCase()} />
                <KeyValue label="Owner" value="Rahul R" />
                <KeyValue label="Modified" value="Apr 4, 2023" />
                <KeyValue label="Opened" value="May 11, 2026" />
                <KeyValue label="Created" value="Aug 27, 2018" />
              </div>
            </div>
          </TabsContent>
          <TabsContent value="activity" className="pt-3">
            <p className="text-sm text-muted-foreground">Activity timeline coming soon.</p>
          </TabsContent>
          <TabsContent value="storage" className="pt-3">
            <p className="text-sm text-muted-foreground">Storage details coming soon.</p>
          </TabsContent>
          <TabsContent value="retention" className="pt-3">
            <p className="text-sm text-muted-foreground">Retention rules coming soon.</p>
          </TabsContent>
        </Tabs>
      </div>
    </aside>
  )
}

