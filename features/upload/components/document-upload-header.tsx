"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { X } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"

type DocumentUploadHeaderProps = {
  /** Where to navigate when the user confirms leaving the flow. */
  exitHref?: string
}

export function DocumentUploadHeader({
  exitHref = "/",
}: DocumentUploadHeaderProps) {
  const router = useRouter()
  const [confirmOpen, setConfirmOpen] = useState(false)
  const [isLeaving, setIsLeaving] = useState(false)

  if (isLeaving) {
    // Avoid showing the dialog close animation while navigating away.
    return null
  }

  return (
    <header className="flex h-12 items-center justify-between bg-sidebar px-4 text-xs text-sidebar-foreground md:h-14 md:px-6">
      <div className="flex items-center gap-2">
        <div className="flex size-7 items-center justify-center rounded-md bg-primary text-[10px] font-semibold uppercase tracking-tight md:size-8">
          DN
        </div>
        <div className="flex flex-col">
          <span className="text-[11px] font-medium md:text-xs">Document Upload</span>
          <span className="hidden text-[10px] text-sidebar-foreground/70 md:inline">
            Upload PDFs for e-sign workflows
          </span>
        </div>
      </div>

      <AlertDialog open={confirmOpen} onOpenChange={setConfirmOpen}>
        <Button
          type="button"
          variant="ghost"
          size="icon-sm"
          onClick={() => setConfirmOpen(true)}
          className="text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
          aria-label="Close and go back to dashboard"
        >
          <X className="size-4" />
        </Button>
        <AlertDialogContent size="sm">
          <AlertDialogHeader>
            <AlertDialogTitle>Leave document upload?</AlertDialogTitle>
            <AlertDialogDescription>
              Your selected files or progress may be lost. Are you sure you want to go back to the
              dashboard?
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Stay here</AlertDialogCancel>
            <AlertDialogAction
              variant="destructive"
              onClick={() => {
                setIsLeaving(true)
                router.push(exitHref)
              }}
            >
              Leave page
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </header>
  )
}

