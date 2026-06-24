import type {
  WorkspaceCreateRequest,
  WorkspaceListParams,
  WorkspaceListResponse,
  WorkspaceOwnerRequest,
  WorkspaceResponse,
  WorkspaceUpdateRequest,
} from "@/features/workspace/types"
import { apiFetch } from "@/features/workspace/services/api-fetch"

const BASE_PATH = "/api/v1/estore/workspaces"

/**
 * Builds a query string from WorkspaceListParams, excluding undefined values.
 */
function buildQueryString(params: WorkspaceListParams): string {
  const searchParams = new URLSearchParams()

  searchParams.set("page", String(params.page))
  searchParams.set("size", String(params.size))

  if (params.sort) searchParams.set("sort", params.sort)
  if (params.code) searchParams.set("code", params.code)
  if (params.name) searchParams.set("name", params.name)
  if (params.ownerId) searchParams.set("ownerId", params.ownerId)

  return searchParams.toString()
}

/** Fetch a paginated list of workspaces. */
export function listWorkspaces(
  params: WorkspaceListParams
): Promise<WorkspaceListResponse> {
  const query = buildQueryString(params)
  return apiFetch<WorkspaceListResponse>(`${BASE_PATH}?${query}`)
}

/** Fetch a single workspace by ID. */
export function getWorkspace(id: string): Promise<WorkspaceResponse> {
  return apiFetch<WorkspaceResponse>(`${BASE_PATH}/${id}`)
}

/** Create a new workspace. */
export function createWorkspace(
  data: WorkspaceCreateRequest
): Promise<WorkspaceResponse> {
  return apiFetch<WorkspaceResponse>(BASE_PATH, {
    method: "POST",
    body: JSON.stringify(data),
  })
}

/** Update an existing workspace. */
export function updateWorkspace(
  id: string,
  data: WorkspaceUpdateRequest
): Promise<WorkspaceResponse> {
  return apiFetch<WorkspaceResponse>(`${BASE_PATH}/${id}`, {
    method: "PUT",
    body: JSON.stringify(data),
  })
}

/** Delete a workspace. */
export function deleteWorkspace(id: string): Promise<void> {
  return apiFetch<void>(`${BASE_PATH}/${id}`, {
    method: "DELETE",
  })
}

/** Assign an owner to a workspace that has no owner. */
export function assignOwner(
  id: string,
  data: WorkspaceOwnerRequest
): Promise<WorkspaceResponse> {
  return apiFetch<WorkspaceResponse>(`${BASE_PATH}/${id}/assign-owner`, {
    method: "PUT",
    body: JSON.stringify(data),
  })
}

/** Change the owner of a workspace. */
export function changeOwner(
  id: string,
  data: WorkspaceOwnerRequest
): Promise<WorkspaceResponse> {
  return apiFetch<WorkspaceResponse>(`${BASE_PATH}/${id}/change-owner`, {
    method: "PUT",
    body: JSON.stringify(data),
  })
}
