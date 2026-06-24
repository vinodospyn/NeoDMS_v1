export type DocumentComment = {
  id: string
  authorName: string
  authorInitials: string
  avatarClassName: string
  message: string
  timestamp: string
  isCurrentUser?: boolean
}

export const mockDocumentComments: Record<string, DocumentComment[]> = {
  aadhaar: [
    {
      id: "aadhaar-c1",
      authorName: "Alex Rivers",
      authorInitials: "AR",
      avatarClassName: "bg-violet-100 text-violet-700",
      message:
        "I've started the initial review on the Identity_Doc. @Sarah, can you double-check the MRZ zone?",
      timestamp: "10:24 AM",
    },
    {
      id: "aadhaar-c2",
      authorName: "Sarah Chen",
      authorInitials: "SC",
      avatarClassName: "bg-sky-100 text-sky-700",
      message:
        "Looking at it now. Everything seems to align with the passport patterns. I'll mark the name as verified.",
      timestamp: "10:26 AM",
    },
    {
      id: "aadhaar-c3",
      authorName: "You",
      authorInitials: "YO",
      avatarClassName: "bg-primary/15 text-primary",
      message: "Thanks Sarah. I'll finalize the save once you're done.",
      timestamp: "10:27 AM",
      isCurrentUser: true,
    },
  ],
  "identity-doc": [
    {
      id: "identity-c1",
      authorName: "Sarah Chen",
      authorInitials: "SC",
      avatarClassName: "bg-sky-100 text-sky-700",
      message: "Please verify the document number before archiving.",
      timestamp: "09:15 AM",
    },
  ],
  "offer-letter": [
    {
      id: "offer-c1",
      authorName: "Rahul R",
      authorInitials: "RR",
      avatarClassName: "bg-amber-100 text-amber-700",
      message: "Offer letter approved. Ready for candidate review.",
      timestamp: "Yesterday",
    },
  ],
}
