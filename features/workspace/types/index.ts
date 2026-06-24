// === Request Types ===

/**
 * Request payload for creating a new workspace.
 * Sent as the body of POST /api/v1/workspaces.
 */
export interface WorkspaceCreateRequest {
  /** Unique workspace code. 1-50 chars, pattern: ^[A-Za-z0-9_-]+$ */
  code: string;
  /** Display name for the workspace. 1-255 chars. */
  name: string;
  /** Optional workspace description. Max 2000 chars. */
  description?: string;
}

/**
 * Request payload for updating an existing workspace.
 * Sent as the body of PUT /api/v1/workspaces/:id.
 * At least one field must be provided.
 */
export interface WorkspaceUpdateRequest {
  /** Updated display name. 1-255 chars. */
  name?: string;
  /** Updated description. Max 2000 chars. */
  description?: string;
}

/**
 * Request payload for assigning or changing a workspace owner.
 * Sent as the body of PUT /api/v1/workspaces/:id/assign-owner
 * or PUT /api/v1/workspaces/:id/change-owner.
 */
export interface WorkspaceOwnerRequest {
  /** UUID of the user to assign as workspace owner. */
  ownerId: string;
}

// === Response Types ===

/**
 * Full workspace response returned by the API for detail views.
 * Returned by GET /api/v1/workspaces/:id and mutation responses.
 */
export interface WorkspaceResponse {
  /** Unique workspace identifier (UUID). */
  id: string;
  /** Immutable workspace code. */
  code: string;
  /** Display name. */
  name: string;
  /** Optional description. */
  description?: string;
  /** UUID of the assigned owner, or undefined if unassigned. */
  ownerId?: string;
  /** Whether this is the tenant's default workspace. */
  isDefault: boolean;
  /** Whether deletion is permitted for this workspace. */
  isDeleteAllowed: boolean;
  /** ISO 8601 date-time when the workspace was created. */
  createdAt: string;
  /** ISO 8601 date-time when the workspace was last updated. */
  updatedAt?: string;
}

/**
 * Summary workspace response used in list views.
 * Returned as items in WorkspaceListResponse.
 */
export interface WorkspaceSummaryResponse {
  /** Unique workspace identifier (UUID). */
  id: string;
  /** Immutable workspace code. */
  code: string;
  /** Display name. */
  name: string;
  /** Optional description. */
  description?: string;
  /** UUID of the assigned owner. */
  ownerId?: string;
  /** Whether this is the tenant's default workspace. */
  isDefault: boolean;
  /** Whether deletion is permitted for this workspace. */
  isDeleteAllowed?: boolean;
  /** ISO 8601 date-time when the workspace was created. */
  createdAt: string;
}

/**
 * Paginated list response for workspaces.
 * Returned by GET /api/v1/workspaces.
 */
export interface WorkspaceListResponse {
  /** Array of workspace summaries for the current page. */
  items: WorkspaceSummaryResponse[];
  /** Current page number (zero-based). */
  page: number;
  /** Number of items per page. */
  size: number;
  /** Total number of workspace elements across all pages. */
  totalElements: number;
  /** Total number of pages available. */
  totalPages: number;
}

// === Error Types ===

/**
 * Standard API error response following RFC 7807 Problem Details format.
 * Returned by the API for all error responses.
 */
export interface ApiErrorResponse {
  /** URI reference identifying the problem type. */
  type: string;
  /** Short human-readable summary of the problem. */
  title: string;
  /** HTTP status code. */
  status: number;
  /** Application-specific error code for programmatic handling. */
  errorCode: string;
  /** Human-readable explanation specific to this occurrence. */
  detail: string;
}

// === UI State Types ===

/** Allowed sort fields for the workspace list. */
export type WorkspaceSortField = "name" | "code" | "createdAt";

/** Sort direction options. */
export type SortDirection = "asc" | "desc";

/**
 * Parameters for fetching the workspace list.
 * Used by the workspace list hook to construct API query parameters.
 */
export interface WorkspaceListParams {
  /** Page number (zero-based). */
  page: number;
  /** Number of items per page (1-100). */
  size: number;
  /** Sort parameter in "field,direction" format. */
  sort?: `${WorkspaceSortField},${SortDirection}`;
  /** Filter by workspace code. */
  code?: string;
  /** Filter by workspace name. */
  name?: string;
  /** Filter by owner UUID. */
  ownerId?: string;
}
