import { redirect } from "next/navigation"

/** Legacy URL — dashboard now lives at `/`. */
export default function SampleSidebarRedirectPage() {
  redirect("/")
}
