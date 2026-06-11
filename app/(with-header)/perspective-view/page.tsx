import { Suspense } from "react"

import { PerspectiveViewPage } from "@/features/drive/components/perspective-view/perspective-view-page"

export default function PerspectiveViewRoutePage() {
  return (
    <Suspense
      fallback={
        <div className="flex flex-1 items-center justify-center text-sm text-muted-foreground">
          Loading perspective view…
        </div>
      }
    >
      <PerspectiveViewPage />
    </Suspense>
  )
}
