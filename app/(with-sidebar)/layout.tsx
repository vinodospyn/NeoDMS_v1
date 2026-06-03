import { SidebarHeaderLayout } from "@/components/layout/sidebar-header-layout"
import { AppSidebar } from "@/components/layout/app-sidebar"
import { DocumentsAppHeader } from "@/components/layout/documents-app-header"

export default function WithSidebarLayoutGroup({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <SidebarHeaderLayout
      driveShell
      sidebar={<AppSidebar />}
      header={<DocumentsAppHeader />}
      defaultOpen
      contentClassName="drive-main flex min-h-0 flex-1 flex-col overflow-y-auto "
    >
      {children}
    </SidebarHeaderLayout>
  )
}
