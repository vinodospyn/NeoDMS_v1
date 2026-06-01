"use client"

import * as React from "react"

import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination"
import {
  Table,
  TableBody,
  TableContainer,
  TableFooterBar,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { RequestRow } from "@/features/dashboard/components/request-row"
import { RequestSort, RequestsFilters } from "@/features/dashboard/components/requests-filters"
import { useRequests } from "@/features/dashboard/hooks/use-requests"

const ROWS_PER_PAGE = 8

export function NeoTable() {
  const { data: requests } = useRequests()
  const [search, setSearch] = React.useState("")
  const [sort, setSort] = React.useState<RequestSort>("newest")
  const [page, setPage] = React.useState(1)

  const filtered = React.useMemo(() => {
    const term = search.trim().toLowerCase()
    const list = term
      ? requests.filter((req) =>
          [req.id, req.channel, req.lastActionLabel].some((field) =>
            field.toLowerCase().includes(term)
          )
        )
      : requests

    const sorted = [...list]
    switch (sort) {
      case "oldest":
        return sorted.reverse()
      case "amount-desc":
        return sorted.sort((a, b) => (b.amount ?? 0) - (a.amount ?? 0))
      case "amount-asc":
        return sorted.sort((a, b) => (a.amount ?? 0) - (b.amount ?? 0))
      case "newest":
      default:
        return sorted
    }
  }, [requests, search, sort])

  const totalPages = Math.max(1, Math.ceil(filtered.length / ROWS_PER_PAGE))
  const safePage = Math.min(page, totalPages)
  const paginatedRequests = React.useMemo(() => {
    const startIndex = (safePage - 1) * ROWS_PER_PAGE
    return filtered.slice(startIndex, startIndex + ROWS_PER_PAGE)
  }, [filtered, safePage])

  const pageStart = filtered.length === 0 ? 0 : (safePage - 1) * ROWS_PER_PAGE + 1
  const pageEnd = Math.min(safePage * ROWS_PER_PAGE, filtered.length)

  const handleSearchChange = (value: string) => {
    setSearch(value)
    setPage(1)
  }

  const handleSortChange = (value: RequestSort) => {
    setSort(value)
    setPage(1)
  }

  return (
    <section className="space-y-4">
      <TableContainer>
        <div className="border-b px-3 py-3 sm:px-4">
          <RequestsFilters
            search={search}
            onSearchChange={handleSearchChange}
            sort={sort}
            onSortChange={handleSortChange}
          />
        </div>
        {filtered.length === 0 ? (
          <div className="px-4 py-10 text-center text-sm text-muted-foreground">
            No requests found.
          </div>
        ) : (
          <Table className="min-w-[980px]">
            <TableHeader>
              <TableRow className="hover:bg-transparent">
                <TableHead>Request</TableHead>
                <TableHead>Documents</TableHead>
                <TableHead>Signers</TableHead>
                <TableHead>Stamp</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {paginatedRequests.map((request) => (
                <TableRow key={request.id}>
                  <RequestRow request={request} />
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}
        {filtered.length > 0 ? (
          <TableFooterBar>
            <p className="text-sm text-muted-foreground">
              Showing {pageStart}-{pageEnd} of {filtered.length} requests
            </p>
            <Pagination className="mx-0 w-auto justify-end">
              <PaginationContent>
                <PaginationItem>
                  <PaginationPrevious
                    href="#"
                    onClick={(event) => {
                      event.preventDefault()
                      setPage((currentPage) => Math.max(currentPage - 1, 1))
                    }}
                    aria-disabled={safePage === 1}
                    className={safePage === 1 ? "pointer-events-none opacity-50" : ""}
                  />
                </PaginationItem>
                {Array.from({ length: totalPages }, (_, index) => index + 1).map(
                  (pageNumber) => (
                    <PaginationItem key={pageNumber}>
                      <PaginationLink
                        href="#"
                        isActive={pageNumber === safePage}
                        onClick={(event) => {
                          event.preventDefault()
                          setPage(pageNumber)
                        }}
                      >
                        {pageNumber}
                      </PaginationLink>
                    </PaginationItem>
                  )
                )}
                <PaginationItem>
                  <PaginationNext
                    href="#"
                    onClick={(event) => {
                      event.preventDefault()
                      setPage((currentPage) =>
                        Math.min(currentPage + 1, totalPages)
                      )
                    }}
                    aria-disabled={safePage === totalPages}
                    className={
                      safePage === totalPages ? "pointer-events-none opacity-50" : ""
                    }
                  />
                </PaginationItem>
              </PaginationContent>
            </Pagination>
          </TableFooterBar>
        ) : null}
      </TableContainer>
    </section>
  )
}
