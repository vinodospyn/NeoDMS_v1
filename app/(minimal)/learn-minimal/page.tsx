import Link from "next/link"
import { X } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function LearnChromelessPage() {
  return (
    <div className="flex min-h-svh items-center justify-center p-6">
      <div className="relative w-full max-w-2xl rounded-xl border bg-background p-8">
        <Button asChild variant="ghost" size="icon-sm" className="absolute top-4 right-4">
          <Link href="/dashboard" aria-label="Close and go back to dashboard">
            <X className="size-4" />
          </Link>
        </Button>

        <h1 className="text-2xl font-semibold">Minimal Layout Learning Page</h1>
        <p className="mt-2 text-sm text-muted-foreground">
          This page has no sidebar and no header because it is inside the minimal layout route group.
        </p>
        <p className="mt-4 text-sm">
          Click the close icon on top-right to go back to the dashboard.
        </p>
      </div>
    </div>
  )
}
