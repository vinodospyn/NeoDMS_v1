import Link from "next/link"

import { QuickAccessCard } from "@/features/drive/components/quick-access-card"
import { quickAccessItems } from "@/features/drive/data/mock-dashboard"

export function QuickAccessSection() {
  return (
    <section className="mb-10" aria-labelledby="quick-access-heading">
      <div className="mb-5 flex items-center justify-between gap-4">
        <h2
          id="quick-access-heading"
          className="text-base font-semibold text-[#111827]"
        >
          Quick access
        </h2>
        <Link
          href="/sample-sidebar/quick-access"
          className="drive-link text-sm font-medium hover:underline"
        >
          View more
        </Link>
      </div>

      <div className="grid grid-cols-1 gap-4 min-[480px]:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 xl:gap-5">
        {quickAccessItems.map((item) => (
          <QuickAccessCard key={item.id} item={item} />
        ))}
      </div>
    </section>
  )
}
