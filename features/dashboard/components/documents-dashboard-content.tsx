import { Button } from "@/components/ui/button"
import Link from "next/link"

export function DocumentsDashboardContent() {
  return (
    <div className="mx-auto w-full max-w-6xl space-y-5">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight">Dashboard</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Starter landing page for your product modules. Keep this page focused on real app entry
          points and business context.
        </p>
        <div className="mt-3 flex flex-wrap gap-2">
          <Button asChild variant="outline">
            <Link href="/learn-minimal">Open minimal screen</Link>
          </Button>
          <Button asChild variant="outline">
            <Link href="/">Open DMS dashboard</Link>
          </Button>
        </div>
      </div>

      <div className="rounded-lg border bg-background p-5">
        <h2 className="text-base font-semibold">Suggested template structure</h2>
        <p className="mt-2 text-sm text-muted-foreground">
          Use dedicated routes for feature modules (billing, settings, users, reports) and keep
          this dashboard focused on real product navigation and key actions.
        </p>
        <div className="mt-4 grid gap-2 text-sm">
          <div className="rounded-md border bg-muted/30 p-3">
            <p className="font-medium">Feature module pages</p>
            <p className="text-muted-foreground">Build business flows and API-driven content here.</p>
          </div>
          <div className="rounded-md border bg-muted/30 p-3">
            <p className="font-medium">Navigation clarity</p>
            <p className="text-muted-foreground">Guide users quickly to the top business workflows.</p>
          </div>
          <div className="rounded-md border bg-muted/30 p-3">
            <p className="font-medium">Layout examples</p>
            <p className="text-muted-foreground">Use minimal, with-header, and with-sidebar routes.</p>
          </div>
        </div>
      </div>
    </div>
  )
}
