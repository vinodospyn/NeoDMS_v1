"use client"

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { DocumentActivityTimeline } from "@/features/drive/components/document-activity-timeline"
import { DocumentStorageOverview } from "@/features/drive/components/document-storage-overview"
import {
  DrivePropertiesGrid,
  type DrivePropertyItem,
} from "@/features/drive/components/drive-property-field"
import type { PerspectiveTreeNode } from "@/features/drive/data/mock-perspective-tree"
import { cn } from "@/lib/utils"

const secondaryTabTriggerClass = cn(
  "h-7 flex-1 rounded-md border border-transparent px-2 text-xs font-medium shadow-none after:hidden",
  "text-muted-foreground data-[state=inactive]:text-muted-foreground",
  "data-[state=active]:border-border/60 data-[state=active]:bg-background data-[state=active]:text-foreground",
  "data-[state=active]:shadow-none data-[state=active]:after:hidden",
  "data-active:border-border/60 data-active:bg-background data-active:text-foreground data-active:shadow-none data-active:after:hidden"
)

type DriveDetailPropertiesSectionProps = {
  items: DrivePropertyItem[]
  selectedNode?: PerspectiveTreeNode | null
  className?: string
}

export function DriveDetailPropertiesSection({
  items,
  selectedNode = null,
  className,
}: DriveDetailPropertiesSectionProps) {
  return (
    <section className={cn("space-y-3", className)}>
      <Tabs defaultValue="properties" className="gap-0">
        <TabsList className="h-9 w-full justify-start gap-1 rounded-lg bg-muted/50 p-1">
          <TabsTrigger value="properties" className={secondaryTabTriggerClass}>
            Properties
          </TabsTrigger>
          <TabsTrigger value="activity" className={secondaryTabTriggerClass}>
            Activity
          </TabsTrigger>
          <TabsTrigger value="storage" className={secondaryTabTriggerClass}>
            Storage
          </TabsTrigger>
          <TabsTrigger value="retention" className={secondaryTabTriggerClass}>
            Retention
          </TabsTrigger>
        </TabsList>

        <TabsContent value="properties" className="mt-3 outline-none">
          <DrivePropertiesGrid items={items} />
        </TabsContent>
        <TabsContent value="activity" className="mt-3 outline-none">
          <DocumentActivityTimeline selectedNode={selectedNode} />
        </TabsContent>
        <TabsContent value="storage" className="mt-3 outline-none">
          <DocumentStorageOverview selectedNode={selectedNode} />
        </TabsContent>
        <TabsContent value="retention" className="mt-3 outline-none">
          <p className="rounded-lg border border-dashed border-border/60 bg-background px-3 py-5 text-center text-xs text-muted-foreground">
            Retention rules coming soon.
          </p>
        </TabsContent>
      </Tabs>
    </section>
  )
}
