import { appConfig } from "@/config/app"
import { DriveSectionHeader } from "@/features/drive/components/drive-section-header"
import { QuickAccessSection } from "@/features/drive/components/quick-access-section"
import { RecentFileCard } from "@/features/drive/components/recent-file-card"
import { recentFileItems } from "@/features/drive/data/mock-dashboard"

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
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
          {recentFileItems.map((item) => (
            <RecentFileCard key={item.id} item={item} />
          ))}
        </div>
      </section>
    </div>
  )
}
