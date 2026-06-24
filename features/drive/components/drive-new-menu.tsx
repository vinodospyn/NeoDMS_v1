"use client"

import * as React from "react"
import { FileUp, FolderPlus, FolderUp, Plus } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { useSidebar } from "@/components/ui/sidebar"
import { cn } from "@/lib/utils"

type DriveNewMenuProps = {
  className?: string
  buttonClassName?: string
}

export function DriveNewMenu({ className, buttonClassName }: DriveNewMenuProps) {
  const { state, isMobile } = useSidebar()
  const collapsed = state === "collapsed" && !isMobile
  const fileInputRef = React.useRef<HTMLInputElement>(null)
  const folderInputRef = React.useRef<HTMLInputElement>(null)

  const handleNewFolder = () => {
    // Placeholder until create-folder flow is wired to the API.
  }

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    event.target.value = ""
  }

  const handleFolderUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    event.target.value = ""
  }

  return (
    <div className={className}>
      <input
        ref={fileInputRef}
        type="file"
        multiple
        className="sr-only"
        onChange={handleFileUpload}
        aria-hidden
        tabIndex={-1}
      />
      <input
        ref={folderInputRef}
        type="file"
        multiple
        className="sr-only"
        onChange={handleFolderUpload}
        aria-hidden
        tabIndex={-1}
        {...({ webkitdirectory: "", directory: "" } as React.InputHTMLAttributes<HTMLInputElement>)}
      />

      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            type="button"
            className={cn(
              "h-10 justify-start gap-2 rounded-xl bg-primary px-4 text-sm font-medium text-primary-foreground hover:bg-primary/90",
              collapsed ? "size-9 justify-center px-0" : "w-auto min-w-[6.75rem]",
              buttonClassName
            )}
          >
            <Plus className="size-4 shrink-0" aria-hidden />
            {!collapsed ? <span>New</span> : null}
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent
          align="start"
          sideOffset={8}
          className="min-w-[11.5rem] w-auto p-1.5"
        >
          <DropdownMenuItem
            className="gap-2.5 px-3 py-2"
            onSelect={handleNewFolder}
          >
            <FolderPlus className="size-4 text-muted-foreground" />
            New folder
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem
            className="gap-2.5 px-3 py-2"
            onSelect={(event) => {
              event.preventDefault()
              fileInputRef.current?.click()
            }}
          >
            <FileUp className="size-4 text-muted-foreground" />
            File upload
          </DropdownMenuItem>
          <DropdownMenuItem
            className="gap-2.5 px-3 py-2"
            onSelect={(event) => {
              event.preventDefault()
              folderInputRef.current?.click()
            }}
          >
            <FolderUp className="size-4 text-muted-foreground" />
            Folder upload
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  )
}
