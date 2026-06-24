import { mockDriveItems } from "@/features/drive/data/mock-files"
import type { DriveItem } from "@/features/drive/types"
import { workspaceCodeToSlug } from "@/features/workspace/lib/workspace-slug"
import { mockWorkspaceCatalog } from "@/features/workspace/data/mock-workspaces-nav"

function item(
  partial: DriveItem & { id: string; name: string; type: DriveItem["type"] }
): DriveItem {
  return partial
}

const WORKSPACE_SEED_CONTENT: Record<string, DriveItem[]> = {
  hr: [
    item({
      id: "ws-hr-1",
      name: "Employee Records",
      type: "folder",
      category: "HR",
      workspace: "HR",
      createdAt: "Mar 1, 2026 10:00 AM",
      fileSize: null,
    }),
    item({
      id: "ws-hr-2",
      name: "HR Policy.docx",
      type: "word",
      category: "Policies",
      workspace: "HR",
      createdAt: "Feb 20, 2026 02:15 PM",
      fileSize: "1.1 Mb",
      starred: true,
    }),
    item({
      id: "ws-hr-3",
      name: "Aadhaar.pdf",
      type: "pdf",
      category: "Identity",
      workspace: "HR",
      createdAt: "Feb 27, 2026 02:19 PM",
      fileSize: "758 Kb",
    }),
    item({
      id: "ws-hr-4",
      name: "Onboarding.pptx",
      type: "ppt",
      category: "Training",
      workspace: "HR",
      createdAt: "Feb 18, 2026 11:30 AM",
      fileSize: "3.2 Mb",
    }),
  ],
  finance: [
    item({
      id: "ws-fin-1",
      name: "Budgets",
      type: "folder",
      category: "Finance",
      workspace: "Finance",
      createdAt: "Mar 2, 2026 09:00 AM",
      fileSize: null,
    }),
    item({
      id: "ws-fin-2",
      name: "Budget.xlsx",
      type: "excel",
      category: "Planning",
      workspace: "Finance",
      createdAt: "Feb 27, 2026 02:19 PM",
      fileSize: "890 Kb",
    }),
    item({
      id: "ws-fin-3",
      name: "Q1-Report.pptx",
      type: "ppt",
      category: "Reports",
      workspace: "Finance",
      createdAt: "Feb 27, 2026 02:19 PM",
      fileSize: "4.8 Mb",
    }),
    item({
      id: "ws-fin-4",
      name: "Invoices",
      type: "shared-folder",
      category: "Accounts",
      workspace: "Finance",
      createdAt: "Jan 15, 2026 04:00 PM",
      fileSize: null,
    }),
  ],
  marketing: [
    item({
      id: "ws-mkt-1",
      name: "Campaign Assets",
      type: "folder",
      category: "Marketing",
      workspace: "Marketing",
      createdAt: "Mar 3, 2026 08:30 AM",
      fileSize: null,
    }),
    item({
      id: "ws-mkt-2",
      name: "Brand-Guidelines.pdf",
      type: "pdf",
      category: "Brand",
      workspace: "Marketing",
      createdAt: "Feb 10, 2026 01:00 PM",
      fileSize: "2.4 Mb",
    }),
    item({
      id: "ws-mkt-3",
      name: "Launch-Video.mp4",
      type: "unknown",
      category: "Media",
      workspace: "Marketing",
      createdAt: "Feb 22, 2026 05:45 PM",
      fileSize: "128 Mb",
    }),
  ],
  legal: [
    item({
      id: "ws-leg-1",
      name: "Contracts",
      type: "folder",
      category: "Legal",
      workspace: "Legal",
      createdAt: "Mar 4, 2026 11:00 AM",
      fileSize: null,
    }),
    item({
      id: "ws-leg-2",
      name: "NDA-Template.docx",
      type: "word",
      category: "Templates",
      workspace: "Legal",
      createdAt: "Feb 5, 2026 09:20 AM",
      fileSize: "540 Kb",
    }),
    item({
      id: "ws-leg-3",
      name: "Compliance-Review.pdf",
      type: "pdf",
      category: "Compliance",
      workspace: "Legal",
      createdAt: "Feb 28, 2026 03:10 PM",
      fileSize: "1.8 Mb",
    }),
  ],
  operations: [
    item({
      id: "ws-ops-1",
      name: "SOPs",
      type: "folder",
      category: "Operations",
      workspace: "Operations",
      createdAt: "Mar 5, 2026 07:45 AM",
      fileSize: null,
    }),
    item({
      id: "ws-ops-2",
      name: "Process-Map.xlsx",
      type: "excel",
      category: "Process",
      workspace: "Operations",
      createdAt: "Feb 14, 2026 10:00 AM",
      fileSize: "620 Kb",
    }),
    item({
      id: "ws-ops-3",
      name: "Vendor-Archive.zip",
      type: "zip",
      category: "Vendors",
      workspace: "Operations",
      createdAt: "Feb 25, 2026 06:30 PM",
      fileSize: "12 Mb",
    }),
  ],
  it: [
    item({
      id: "ws-it-1",
      name: "Infrastructure",
      type: "folder",
      category: "IT",
      workspace: "IT",
      createdAt: "Mar 6, 2026 12:00 PM",
      fileSize: null,
    }),
    item({
      id: "ws-it-2",
      name: "Security-Policy.pdf",
      type: "pdf",
      category: "Security",
      workspace: "IT",
      createdAt: "Feb 8, 2026 08:00 AM",
      fileSize: "980 Kb",
      starred: true,
    }),
    item({
      id: "ws-it-3",
      name: "Network-Diagram.png",
      type: "image",
      category: "Documentation",
      workspace: "IT",
      createdAt: "Feb 19, 2026 02:40 PM",
      fileSize: "1.5 Mb",
    }),
  ],
}

export function getWorkspaceContentItems(
  slug: string,
  workspaceName: string
): DriveItem[] {
  if (WORKSPACE_SEED_CONTENT[slug]?.length) {
    return WORKSPACE_SEED_CONTENT[slug]
  }

  const matched = mockDriveItems.filter(
    (entry) => entry.workspace?.toLowerCase() === workspaceName.toLowerCase()
  )
  if (matched.length > 0) return matched

  return [
    item({
      id: `ws-empty-${slug}`,
      name: "Documents",
      type: "folder",
      category: workspaceName,
      workspace: workspaceName,
      createdAt: "Mar 1, 2026 09:00 AM",
      fileSize: null,
    }),
  ]
}

export function getDefaultWorkspaceSlug() {
  return workspaceCodeToSlug(mockWorkspaceCatalog[0].code)
}
