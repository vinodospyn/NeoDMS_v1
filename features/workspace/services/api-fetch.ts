import type { ApiErrorResponse } from "@/features/workspace/types"
import { WorkspaceApiError } from "@/features/workspace/services/workspace-errors"

function normalizeApiBaseUrl(raw: string | undefined): string {
  const value = raw?.trim() ?? ""
  if (!value) return ""

  if (/^https?:\/\//i.test(value)) {
    return value.replace(/\/+$/, "")
  }

  return `http://${value.replace(/^\/+|\/+$/g, "")}`
}

const API_BASE_URL = normalizeApiBaseUrl(process.env.NEXT_PUBLIC_API_URL)

/**
 * Retrieves the current auth token.
 * TODO: Replace with actual auth provider integration (e.g. next-auth session).
 */
async function getAuthToken(): Promise<string> {
  // Placeholder: in a real app this would come from the auth session/context
  return ""
}

/**
 * Base fetch utility for workspace API calls.
 * Attaches auth headers, handles errors, and parses JSON responses.
 */
export async function apiFetch<T>(
  url: string,
  options?: RequestInit
): Promise<T> {
  const token = await getAuthToken()

  const headers: HeadersInit = {
    "Content-Type": "application/json",
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
    ...((options?.headers as Record<string, string>) ?? {}),
  }

  const response = await fetch(`${API_BASE_URL}${url}`, {
    ...options,
    headers,
  })

  if (!response.ok) {
    const error: ApiErrorResponse = await response.json().catch(() => ({
      type: "about:blank",
      title: "Request failed",
      status: response.status,
      errorCode: "UNKNOWN_ERROR",
      detail: response.statusText,
    }))
    throw new WorkspaceApiError(error)
  }

  if (response.status === 204) {
    return undefined as T
  }

  return response.json() as Promise<T>
}
