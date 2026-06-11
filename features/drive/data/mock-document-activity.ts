export type DocumentActivityPart =
  | { type: "text"; value: string }
  | { type: "link"; value: string; emphasis?: "default" | "primary" }

export type DocumentActivityEvent = {
  id: string
  timestamp: string
  actorName: string
  actorInitials: string
  actorAvatarUrl?: string
  parts: DocumentActivityPart[]
}

export const mockDocumentActivity: Record<string, DocumentActivityEvent[]> = {
  aadhaar: [
    {
      id: "aadhaar-a1",
      timestamp: "2 hours ago",
      actorName: "Thomas Lean",
      actorInitials: "TL",
      actorAvatarUrl:
        "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=80&h=80&fit=crop&crop=face",
      parts: [
        { type: "text", value: "commented on " },
        { type: "link", value: "Identity_Doc.pdf" },
      ],
    },
    {
      id: "aadhaar-a2",
      timestamp: "4 hours ago",
      actorName: "Bonnie Green",
      actorInitials: "BG",
      actorAvatarUrl:
        "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=80&h=80&fit=crop&crop=face",
      parts: [
        { type: "text", value: "moved " },
        { type: "link", value: "Jese Leos" },
        { type: "text", value: " to " },
        { type: "link", value: "Group A" },
      ],
    },
    {
      id: "aadhaar-a3",
      timestamp: "1 day ago",
      actorName: "Jese Leos",
      actorInitials: "JL",
      actorAvatarUrl:
        "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=80&h=80&fit=crop&crop=face",
      parts: [
        { type: "text", value: "has renamed " },
        { type: "link", value: "Doc.pdf", emphasis: "primary" },
        { type: "text", value: " to " },
        { type: "link", value: "PAN_Doc.pdf", emphasis: "primary" },
      ],
    },
    {
      id: "aadhaar-a4",
      timestamp: "4 days ago",
      actorName: "Joseph McFall",
      actorInitials: "JM",
      actorAvatarUrl:
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=80&h=80&fit=crop&crop=face",
      parts: [
        { type: "text", value: "commented on " },
        { type: "link", value: "Identity_Doc.pdf" },
      ],
    },
  ],
  "identity-doc": [
    {
      id: "identity-a1",
      timestamp: "3 hours ago",
      actorName: "Sarah Chen",
      actorInitials: "SC",
      parts: [
        { type: "text", value: "verified metadata on " },
        { type: "link", value: "Identity_Doc.pdf" },
      ],
    },
    {
      id: "identity-a2",
      timestamp: "2 days ago",
      actorName: "Rahul R",
      actorInitials: "RR",
      parts: [
        { type: "text", value: "moved " },
        { type: "link", value: "Identity_Doc.pdf", emphasis: "primary" },
        { type: "text", value: " to " },
        { type: "link", value: "Identity Proof" },
      ],
    },
  ],
  "offer-letter": [
    {
      id: "offer-a1",
      timestamp: "Yesterday",
      actorName: "Rahul R",
      actorInitials: "RR",
      parts: [
        { type: "text", value: "shared " },
        { type: "link", value: "Offer_Letter.pdf" },
        { type: "text", value: " with " },
        { type: "link", value: "HR Team" },
      ],
    },
  ],
  "2": [
    {
      id: "cert-a1",
      timestamp: "1 hour ago",
      actorName: "Rahul R",
      actorInitials: "RR",
      parts: [
        { type: "text", value: "uploaded " },
        { type: "link", value: "Aadhaar_Doc.pdf" },
        { type: "text", value: " to " },
        { type: "link", value: "Identity Proof", emphasis: "primary" },
      ],
    },
    {
      id: "cert-a2",
      timestamp: "6 hours ago",
      actorName: "Sarah Chen",
      actorInitials: "SC",
      parts: [
        { type: "text", value: "shared " },
        { type: "link", value: "Certificates", emphasis: "primary" },
        { type: "text", value: " with " },
        { type: "link", value: "Business Solutions" },
      ],
    },
    {
      id: "cert-a3",
      timestamp: "2 days ago",
      actorName: "Thomas Lean",
      actorInitials: "TL",
      actorAvatarUrl:
        "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=80&h=80&fit=crop&crop=face",
      parts: [
        { type: "text", value: "created folder " },
        { type: "link", value: "Latest Documents", emphasis: "primary" },
      ],
    },
    {
      id: "cert-a4",
      timestamp: "5 days ago",
      actorName: "Bonnie Green",
      actorInitials: "BG",
      actorAvatarUrl:
        "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=80&h=80&fit=crop&crop=face",
      parts: [
        { type: "text", value: "moved " },
        { type: "link", value: "Identity Proof" },
        { type: "text", value: " into " },
        { type: "link", value: "Certificates", emphasis: "primary" },
      ],
    },
  ],
  "identity-proof": [
    {
      id: "identity-proof-a1",
      timestamp: "3 hours ago",
      actorName: "Sarah Chen",
      actorInitials: "SC",
      parts: [
        { type: "text", value: "uploaded " },
        { type: "link", value: "Identity_Doc.pdf" },
        { type: "text", value: " to " },
        { type: "link", value: "Identity Proof", emphasis: "primary" },
      ],
    },
    {
      id: "identity-proof-a2",
      timestamp: "Yesterday",
      actorName: "Jese Leos",
      actorInitials: "JL",
      actorAvatarUrl:
        "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=80&h=80&fit=crop&crop=face",
      parts: [
        { type: "text", value: "commented on folder " },
        { type: "link", value: "Identity Proof", emphasis: "primary" },
      ],
    },
    {
      id: "identity-proof-a3",
      timestamp: "3 days ago",
      actorName: "Rahul R",
      actorInitials: "RR",
      parts: [
        { type: "text", value: "created folder " },
        { type: "link", value: "Identity Proof", emphasis: "primary" },
      ],
    },
  ],
  "latest-docs": [
    {
      id: "latest-a1",
      timestamp: "Yesterday",
      actorName: "Rahul R",
      actorInitials: "RR",
      parts: [
        { type: "text", value: "uploaded " },
        { type: "link", value: "Offer_Letter.pdf" },
        { type: "text", value: " to " },
        { type: "link", value: "Latest Documents", emphasis: "primary" },
      ],
    },
    {
      id: "latest-a2",
      timestamp: "4 days ago",
      actorName: "Thomas Lean",
      actorInitials: "TL",
      parts: [
        { type: "text", value: "created folder " },
        { type: "link", value: "Latest Documents", emphasis: "primary" },
      ],
    },
  ],
  "other-docs": [
    {
      id: "other-a1",
      timestamp: "1 week ago",
      actorName: "Joseph McFall",
      actorInitials: "JM",
      parts: [
        { type: "text", value: "created folder " },
        { type: "link", value: "Other Documents", emphasis: "primary" },
      ],
    },
  ],
}

export const defaultFolderActivity: DocumentActivityEvent[] = [
  {
    id: "folder-default-a1",
    timestamp: "2 days ago",
    actorName: "Rahul R",
    actorInitials: "RR",
    parts: [
      { type: "text", value: "updated sharing settings for this folder" },
    ],
  },
  {
    id: "folder-default-a2",
    timestamp: "5 days ago",
    actorName: "Sarah Chen",
    actorInitials: "SC",
    parts: [
      { type: "text", value: "viewed folder contents" },
    ],
  },
]
