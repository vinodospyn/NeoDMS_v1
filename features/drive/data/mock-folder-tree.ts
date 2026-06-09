export type FolderNode = {
  id: string
  label: string
  children?: FolderNode[]
}

export const mockFolderTree: FolderNode[] = [
  {
    id: "onboarding",
    label: "On-boarding",
    children: [
      {
        id: "employees",
        label: "Employees",
        children: [
          { id: "u1210", label: "#1210 Arunkumar" },
          { id: "u1211", label: "#1211 Jane Doe" },
          { id: "u1212", label: "#1212 John Smith" },
        ],
      },
    ],
  },
  { id: "training", label: "Training Materials" },
  { id: "benefits", label: "Benefits" },
  { id: "it", label: "IT Equipment" },
]

