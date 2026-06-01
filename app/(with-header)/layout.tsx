import { HeaderLayout } from "@/components/layout/header-layout"
import { DashboardNavbar } from "@/components/layout/dashboard-navbar"

export default function WithHeaderLayoutGroup({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <HeaderLayout
      header={
        <DashboardNavbar showSidebarTrigger={false} />
      }
      contentClassName="flex-1 overflow-y-auto p-6"
    >
      {children}
    </HeaderLayout>
  )
}
