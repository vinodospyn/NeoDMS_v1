"use client"



import {

  CircleAlert,

  FileChartColumnIncreasing,

  MessageSquare,

} from "lucide-react"



import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

import { DocumentCommentsSection } from "@/features/drive/components/document-comments-section"

import { DocumentFormSection } from "@/features/drive/components/document-form-section"

import { DriveDetailPropertiesSection } from "@/features/drive/components/drive-detail-properties-section"

import type { DrivePropertyItem } from "@/features/drive/components/drive-property-field"

import { FileTypeIcon } from "@/features/drive/components/file-type-icon/file-type-icon"

import { SharedWithCard } from "@/features/drive/components/shared-with-card"

import type { PerspectiveTreeNode } from "@/features/drive/data/mock-perspective-tree"

import { getFileKindLabel } from "@/features/drive/lib/file-types"

import { formatPerspectiveSubtitle } from "@/features/drive/lib/perspective-tree"

import { cn } from "@/lib/utils"



type PerspectiveInfoPanelProps = {

  selectedNode: PerspectiveTreeNode | null

  onManageSharing?: () => void

}



const primaryTabTriggerClass = cn(

  "relative flex h-full min-h-0 flex-1 items-center justify-center gap-1.5 rounded-none px-2 py-4",

  "border-0 bg-transparent text-[13px] font-medium shadow-none",

  "text-slate-400",

  "[&_svg]:text-slate-400",

  "after:pointer-events-none after:absolute after:inset-x-0 after:!bottom-0 after:h-0.5 after:bg-primary after:opacity-0",

  "data-[state=active]:bg-transparent data-[state=active]:text-primary data-[state=active]:shadow-none",

  "data-[state=active]:after:!opacity-100 data-[state=active]:[&_svg]:text-primary",

  "data-active:bg-transparent data-active:text-primary data-active:shadow-none",

  "data-active:after:!opacity-100 data-active:[&_svg]:text-primary",

  "dark:data-active:border-transparent dark:data-active:bg-transparent",

  "[&_.info-tab-icon-active]:hidden data-active:[&_.info-tab-icon-active]:flex",

  "[&_.info-tab-icon-inactive]:flex data-active:[&_.info-tab-icon-inactive]:hidden"

)



function buildPropertyItems(kindLabel: string): DrivePropertyItem[] {

  return [

    { label: "Type", value: kindLabel },

    { label: "Owner", value: "Rahul R" },

    { label: "Modified", value: "Apr 4, 2023 by me" },

    { label: "Opened", value: "May 11, 2026 by me" },

    { label: "Created", value: "Aug 27, 2018" },

  ]

}



export function PerspectiveInfoPanel({

  selectedNode,

  onManageSharing,

}: PerspectiveInfoPanelProps) {

  const title = selectedNode?.label ?? "Certificates"

  const subtitle = formatPerspectiveSubtitle(selectedNode?.createdAt ?? "11-02-2026")

  const kindLabel = getFileKindLabel(selectedNode?.kind ?? "folder")

  const isShared = selectedNode?.shared ?? selectedNode?.kind === "shared-folder"

  const propertyItems = buildPropertyItems(kindLabel)



  return (

    <aside className="flex h-full min-h-0 flex-col bg-background">

      <Tabs defaultValue="info" className="flex min-h-0 flex-1 flex-col gap-0">

        <div className="shrink-0 p-3 pb-0">

          <section className="overflow-hidden rounded-xl border border-border/60 bg-background">

            <div className="flex items-start gap-3 px-4 pt-4">

              <FileTypeIcon

                kind={selectedNode?.kind ?? "folder"}

                name={selectedNode?.label}

                shared={isShared}

                variant="brand"

                size="sm"

              />

              <div className="min-w-0 pt-0.5">

                <p className="truncate text-sm font-semibold text-slate-700 dark:text-foreground">

                  {title}

                </p>

                {subtitle ? (

                  <p className="mt-0.5 truncate text-xs text-slate-400">{subtitle}</p>

                ) : null}

              </div>

            </div>



            <TabsList

              variant="line"

              className="mt-4 flex h-[76px] w-full items-stretch justify-start gap-0 rounded-none border-t border-border/60 bg-transparent p-0"

            >

              <TabsTrigger value="info" className={primaryTabTriggerClass}>

                <CircleAlert

                  className="info-tab-icon-inactive size-4 shrink-0"

                  strokeWidth={1.75}

                />

                <span

                  className="info-tab-icon-active hidden size-4 shrink-0 items-center justify-center rounded-full bg-primary text-[10px] font-bold leading-none text-primary-foreground"

                  aria-hidden

                >

                  !

                </span>

                Info

              </TabsTrigger>

              <TabsTrigger value="header-properties" className={primaryTabTriggerClass}>

                <FileChartColumnIncreasing className="size-4 shrink-0" strokeWidth={1.75} />

                Forms

              </TabsTrigger>

              <TabsTrigger value="comments" className={primaryTabTriggerClass}>

                <MessageSquare className="size-4 shrink-0" strokeWidth={1.75} />

                Comments

              </TabsTrigger>

            </TabsList>

          </section>

        </div>



        <TabsContent

          value="info"

          className="mt-3 min-h-0 flex-1 overflow-auto px-3 pb-3 outline-none"

        >

          <div className="space-y-3">

            <SharedWithCard onManageSharing={onManageSharing} />

            <DriveDetailPropertiesSection
              items={propertyItems}
              selectedNode={selectedNode}
            />

          </div>

        </TabsContent>



        <TabsContent

          value="header-properties"

          className="mt-3 min-h-0 flex-1 overflow-auto px-3 pb-3 outline-none"

        >

          <DocumentFormSection selectedNode={selectedNode} />

        </TabsContent>



        <TabsContent

          value="comments"

          className="mt-3 flex min-h-0 flex-1 flex-col px-3 pb-3 pt-1 outline-none"

        >

          <DocumentCommentsSection selectedNode={selectedNode} />

        </TabsContent>

      </Tabs>

    </aside>

  )

}


