import { MinimalLayout } from "@/components/layout/minimal-layout"

export default function MinimalLayoutGroup({
  children,
}: {
  children: React.ReactNode
}) {
  return <MinimalLayout>{children}</MinimalLayout>
}
