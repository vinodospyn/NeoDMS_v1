export type SharePermission = "view-only" | "edit"

export type ShareMember = {
  id: string
  name: string
  location: string
  role: string
  permission: SharePermission
  avatarUrl?: string
}

export type ShareGroup = {
  id: string
  name: string
  memberCount: number
  permission: SharePermission
}

export const mockShareMembers: ShareMember[] = [
  {
    id: "member-1",
    name: "John Smith",
    location: "Trivandrum",
    role: "CEO",
    permission: "view-only",
    avatarUrl:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=80&h=80&fit=crop&crop=face",
  },
  {
    id: "member-2",
    name: "Mario Rodriguez",
    location: "Trivandrum",
    role: "Developer",
    permission: "view-only",
    avatarUrl:
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=80&h=80&fit=crop&crop=face",
  },
  {
    id: "member-3",
    name: "Emily Chen",
    location: "Trivandrum",
    role: "Designer",
    permission: "view-only",
    avatarUrl:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=80&h=80&fit=crop&crop=face",
  },
  {
    id: "member-4",
    name: "Suvarnakumari K R",
    location: "Kochi",
    role: "Project Manager",
    permission: "edit",
    avatarUrl:
      "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=80&h=80&fit=crop&crop=face",
  },
]

export const mockShareGroups: ShareGroup[] = [
  {
    id: "group-1",
    name: "Business Solutions",
    memberCount: 12,
    permission: "view-only",
  },
  {
    id: "group-2",
    name: "Pre-Sales Ospyn",
    memberCount: 8,
    permission: "edit",
  },
  {
    id: "group-3",
    name: "UX Team",
    memberCount: 5,
    permission: "view-only",
  },
  {
    id: "group-4",
    name: "Engineering",
    memberCount: 14,
    permission: "view-only",
  },
]

export const sharePermissionLabels: Record<SharePermission, string> = {
  "view-only": "Viewer",
  edit: "Editor",
}
