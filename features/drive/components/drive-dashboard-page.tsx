import { appConfig } from "@/config/app"
import { DriveSectionHeader } from "@/features/drive/components/drive-section-header"
import { QuickAccessSection } from "@/features/drive/components/quick-access-section"
import { RecentFilesTable } from "@/features/drive/components/recent-files-table"

function getGreeting(): string {
  const hour = new Date().getHours()
  if (hour < 12) return "Good Morning"
  if (hour < 17) return "Good Afternoon"
  return "Good Evening"
}

export function DriveDashboardPage() {
  const greeting = getGreeting()

  return (
    <div className="mx-auto w-full flex-1 px-6 pb-8">
      <header className="mb-8 pt-2">
        <h1 className="text-2xl font-semibold tracking-tight text-foreground">
          {greeting}, {appConfig.userDisplayName}
        </h1>
        <p className="mt-1.5 text-sm text-muted-foreground">
          Here&apos;s a high-level overview of your enterprise activities today.
        </p>
      </header>

      <QuickAccessSection />

      <section>
        <DriveSectionHeader title="Recent Files" />
        <RecentFilesTable />
      </section>
    </div>
  )
}
