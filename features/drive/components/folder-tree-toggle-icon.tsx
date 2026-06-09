import { cn } from "@/lib/utils"

type FolderTreeToggleIconProps = {
  className?: string
}

/** Folder-tree toggle glyph (matches Neo Drive explorer mock). */
export function FolderTreeToggleIcon({ className }: FolderTreeToggleIconProps) {
  return (
    <svg
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={cn("size-5", className)}
      aria-hidden
    >
      <path
        d="M4 4.5V15.5"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
      <path
        d="M4 7.5H9"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
      <path
        d="M4 12H9"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
      <path
        d="M10.5 5.75H15.25C15.94 5.75 16.5 6.31 16.5 7V8.25C16.5 8.94 15.94 9.5 15.25 9.5H10.5C9.81 9.5 9.25 8.94 9.25 8.25V7C9.25 6.31 9.81 5.75 10.5 5.75Z"
        stroke="currentColor"
        strokeWidth="1.25"
      />
      <path
        d="M10.5 10.75H15.25C15.94 10.75 16.5 11.31 16.5 12V13.25C16.5 13.94 15.94 14.5 15.25 14.5H10.5C9.81 14.5 9.25 13.94 9.25 13.25V12C9.25 11.31 9.81 10.75 10.5 10.75Z"
        stroke="currentColor"
        strokeWidth="1.25"
      />
    </svg>
  )
}
