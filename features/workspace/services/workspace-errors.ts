import type { ApiErrorResponse } from "@/features/workspace/types"

/**
 * Custom error class for workspace API errors.
 * Wraps the RFC 7807 Problem Details response.
 */
export class WorkspaceApiError extends Error {
  readonly status: number
  readonly errorCode: string
  readonly detail: string
  readonly type: string
  readonly title: string

  constructor(response: ApiErrorResponse) {
    super(response.detail)
    this.name = "WorkspaceApiError"
    this.status = response.status
    this.errorCode = response.errorCode
    this.detail = response.detail
    this.type = response.type
    this.title = response.title
  }
}

/** Maps known API error codes to user-friendly messages. */
export const ERROR_MESSAGES: Record<string, string> = {
  WORKSPACE_NOT_FOUND: "Workspace not found",
  WORKSPACE_CODE_EXISTS: "A workspace with this code already exists",
  WORKSPACE_OWNER_EXISTS:
    "This workspace already has an owner. Use 'Change Owner' instead.",
  WORKSPACE_NO_OWNER:
    "Cannot change owner — no owner is currently assigned. Use 'Assign Owner' instead.",
  WORKSPACE_SAME_OWNER: "The new owner must be different from the current owner",
  WORKSPACE_DEFAULT_CANNOT_DELETE: "The default workspace cannot be deleted",
  WORKSPACE_DELETE_NOT_ALLOWED: "This workspace cannot be deleted",
  OWNER_NOT_FOUND: "The selected user was not found",
}

/**
 * Returns a user-friendly error message for the given error.
 * Falls back to a generic message for unknown error codes.
 */
export function getErrorMessage(error: unknown): string {
  if (error instanceof WorkspaceApiError) {
    return ERROR_MESSAGES[error.errorCode] ?? "An unexpected error occurred"
  }
  return "An unexpected error occurred"
}
