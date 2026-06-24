# Implementation Plan: Workspace UI Module

## Overview

Implement a complete workspace management feature module using the feature-based architecture pattern (matching `features/drive`). The module provides CRUD operations, owner management, paginated list with search/sort/filter, and permission-based UI rendering. Built with Next.js 16 App Router, React 19, shadcn/ui, React Query, and Zod validation.

## Tasks

- [x] 1. Install dependencies and set up project structure
  - [x] 1.1 Install required packages (@tanstack/react-query, zod, fast-check for testing)
    - Run `pnpm add @tanstack/react-query zod` to add runtime dependencies
    - Run `pnpm add -D fast-check vitest @testing-library/react @testing-library/jest-dom jsdom` for testing
    - _Requirements: 14.1, 14.2 (React Query for cache management)_

  - [x] 1.2 Create workspace feature module directory structure
    - Create `features/workspace/` with subdirectories: `components/`, `hooks/`, `services/`, `types/`, `validations/`
    - Create `features/workspace/__tests__/` directory for tests
    - _Requirements: All (establishes feature module foundation)_

  - [x] 1.3 Set up React Query provider in the app layout
    - Add `QueryClientProvider` wrapper in `app/layout.tsx` or a dedicated providers component
    - Configure default query client options (staleTime: 30000ms per Requirement 14.5)
    - _Requirements: 14.5_

- [x] 2. Implement types and validation schemas
  - [x] 2.1 Create TypeScript types and interfaces
    - Define `WorkspaceCreateRequest`, `WorkspaceUpdateRequest`, `WorkspaceOwnerRequest` request types
    - Define `WorkspaceResponse`, `WorkspaceSummaryResponse`, `WorkspaceListResponse` response types
    - Define `ApiErrorResponse` error type
    - Define `WorkspaceSortField`, `SortDirection`, `WorkspaceListParams` UI state types
    - Write in `features/workspace/types/index.ts`
    - _Requirements: 1.1, 6.1, 7.1, 9.1_

  - [x] 2.2 Create Zod validation schemas
    - Implement `createWorkspaceSchema` with code (1-50 chars, alphanumeric + hyphens/underscores), name (1-255 chars), description (optional, max 2000 chars)
    - Implement `updateWorkspaceSchema` with refinement requiring at least one field
    - Implement `workspaceOwnerSchema` with UUID validation for ownerId
    - Write in `features/workspace/validations/workspace-schemas.ts`
    - _Requirements: 6.2, 6.3, 6.4, 7.3, 9.3_

  - [ ]* 2.3 Write property test for form validation correctness
    - **Property 2: Form Validation Correctness**
    - Test that code field passes if and only if it matches `^[A-Za-z0-9_-]+$` with length 1-50
    - Test that name field passes if and only if length is 1-255
    - Test that description field passes if and only if undefined or length at most 2000
    - **Validates: Requirements 6.2, 6.3, 6.4**

  - [ ]* 2.4 Write property test for owner ID validation
    - **Property 10: Owner ID Validation**
    - Test that ownerId passes validation if and only if it is a valid UUID format
    - **Validates: Requirement 9.3**

  - [ ]* 2.5 Write property test for update schema requires at least one field
    - **Property 11: Update Schema Requires At Least One Field**
    - Test that update validation fails when both name and description are undefined or empty
    - **Validates: Requirement 7.3**

- [x] 3. Implement API service layer and error handling
  - [x] 3.1 Create the WorkspaceApiError class and error message mapping
    - Implement `WorkspaceApiError` extending Error with `status`, `errorCode`, `detail`, `type`, `title` fields
    - Implement `ERROR_MESSAGES` mapping from error codes to user-friendly strings
    - Implement utility function to get display message from error code
    - Write in `features/workspace/services/workspace-errors.ts`
    - _Requirements: 10.4, 10.5, 10.6_

  - [x] 3.2 Create the base API fetch utility
    - Implement `apiFetch<T>` function that handles auth token injection, JSON parsing, 204 handling, and error throwing
    - Handle non-2xx responses by parsing RFC 7807 body and throwing `WorkspaceApiError`
    - Implement fallback error body when JSON parse fails
    - Write in `features/workspace/services/api-fetch.ts`
    - _Requirements: 10.1, 10.2, 10.3_

  - [x] 3.3 Create workspace service API client functions
    - Implement `listWorkspaces(params)` → GET /api/v1/workspaces with query params
    - Implement `getWorkspace(id)` → GET /api/v1/workspaces/:id
    - Implement `createWorkspace(data)` → POST /api/v1/workspaces
    - Implement `updateWorkspace(id, data)` → PUT /api/v1/workspaces/:id
    - Implement `deleteWorkspace(id)` → DELETE /api/v1/workspaces/:id
    - Implement `assignOwner(id, data)` → PUT /api/v1/workspaces/:id/assign-owner
    - Implement `changeOwner(id, data)` → PUT /api/v1/workspaces/:id/change-owner
    - Write in `features/workspace/services/workspace-service.ts`
    - _Requirements: 1.6, 6.6, 7.4, 8.2, 9.4, 9.5_

  - [ ]* 3.4 Write property test for error message safety
    - **Property 4: Error Message Safety**
    - Test that for any API error response, the displayed message is always a mapped user-friendly message or generic fallback, and never contains raw error codes, stack traces, or technical details
    - **Validates: Requirements 10.4, 10.5, 10.6**

  - [ ]* 3.5 Write property test for pagination parameter bounds
    - **Property 6: Pagination Parameter Bounds**
    - Test that for any pagination parameters sent to the API, page >= 0 and 1 <= size <= 100
    - **Validates: Requirement 1.6**

  - [ ]* 3.6 Write property test for sort parameter validity
    - **Property 7: Sort Parameter Validity**
    - Test that for any sort parameter sent, the field is one of "name", "code", "createdAt" and direction is "asc" or "desc"
    - **Validates: Requirement 3.2**

- [ ] 4. Implement React Query hooks
  - [x] 4.1 Create workspace list query hook
    - Implement `useWorkspaces(params: WorkspaceListParams)` with `placeholderData: keepPreviousData` for smooth pagination
    - Query key: `["workspaces", params]`
    - Write in `features/workspace/hooks/use-workspaces.ts`
    - _Requirements: 1.5, 14.5_

  - [~] 4.2 Create single workspace query hook
    - Implement `useWorkspace(id: string)` with `enabled: !!id` guard
    - Query key: `["workspace", id]`
    - Write in `features/workspace/hooks/use-workspace.ts`
    - _Requirements: 5.1, 5.2_

  - [~] 4.3 Create mutation hooks for create, update, and delete
    - Implement `useCreateWorkspace()` with onSuccess invalidating `["workspaces"]`
    - Implement `useUpdateWorkspace(id)` with onSuccess invalidating `["workspaces"]` and `["workspace", id]`
    - Implement `useDeleteWorkspace()` with onSuccess invalidating `["workspaces"]`
    - Write in `features/workspace/hooks/use-create-workspace.ts`, `use-update-workspace.ts`, `use-delete-workspace.ts`
    - _Requirements: 14.1, 14.2, 14.3_

  - [~] 4.4 Create owner management mutation hooks
    - Implement `useAssignOwner(id)` with onSuccess invalidating workspace and list queries
    - Implement `useChangeOwner(id)` with onSuccess invalidating workspace and list queries
    - Write in `features/workspace/hooks/use-workspace-owner.ts`
    - _Requirements: 14.4_
    - **Note:** Owner management is fully implemented. Backend user existence validation depends on IAM integration (pending). Use TODO markers in integration tests.

- [~] 5. Checkpoint - Ensure all foundation code compiles
  - Ensure all tests pass, ask the user if questions arise.

- [x] 6. Implement workspace list components
  - [x] 6.1 Create workspace list toolbar component
    - Implement search input with 300ms debounce
    - Include "New Workspace" button (hidden when user lacks `workspace:create` permission)
    - Show subtle spinner indicator while debouncing
    - Write in `features/workspace/components/workspace-list-toolbar.tsx`
    - _Requirements: 2.1, 11.5, 12.1_

  - [x] 6.2 Create workspace list table component
    - Implement data table with columns: code, name, owner, created date
    - Implement sortable column headers (name, code, createdAt) that toggle direction
    - Implement row actions: view, edit, delete (with permission-based visibility)
    - Disable delete button when `isDefault === true` or `isDeleteAllowed === false`
    - Display 5 skeleton rows during initial loading
    - Implement pagination footer bar with page navigation
    - Write in `features/workspace/components/workspace-list-table.tsx`
    - _Requirements: 1.1, 1.2, 1.3, 1.4, 3.1, 3.3, 4.1, 4.2, 4.3, 4.4, 11.1, 12.2, 12.3_

  - [x] 6.3 Create workspace list page component
    - Compose toolbar and table components
    - Manage list state: page, size, sort, search term
    - Wire `useWorkspaces` hook with params
    - Default sort: `createdAt,desc`
    - Reset to page 0 on filter/sort change
    - Write in `features/workspace/components/workspace-list-page.tsx`
    - _Requirements: 1.5, 2.3, 3.3, 3.4_

  - [ ]* 6.4 Write property test for table row count matches API response
    - **Property 1: Table Row Count Matches API Response**
    - Test that for any workspace list response with N items, the table renders exactly N data rows
    - **Validates: Requirement 1.3**

  - [ ]* 6.5 Write property test for delete button protection
    - **Property 5: Delete Button Protection**
    - Test that for any workspace where `isDefault` is true OR `isDeleteAllowed` is false, the delete action is disabled
    - **Validates: Requirements 4.2, 4.3**

- [ ] 7. Implement workspace form and create/edit pages
  - [~] 7.1 Create shared workspace form component
    - Implement form with code, name, description fields
    - Wire Zod schema validation (createWorkspaceSchema for create, updateWorkspaceSchema for edit)
    - Disable code field in edit mode
    - Show inline validation errors on submit with invalid data (no API call)
    - Show loading spinner on submit button and disable form while submitting
    - Handle 409 error by setting inline error on code field
    - Write in `features/workspace/components/workspace-form.tsx`
    - _Requirements: 6.1, 6.2, 6.3, 6.4, 6.5, 6.8, 6.9, 7.2, 7.3, 11.3_

  - [~] 7.2 Create workspace create page component
    - Wire form with `useCreateWorkspace` mutation
    - On success: show toast "Workspace created successfully", navigate to /workspaces
    - On 409 WORKSPACE_CODE_EXISTS: show inline error on code field
    - On other errors: show error toast
    - Write in `features/workspace/components/workspace-create-page.tsx`
    - _Requirements: 6.6, 6.7, 6.8_

  - [~] 7.3 Create workspace edit page component
    - Fetch workspace data with `useWorkspace(id)` and pre-populate form
    - Wire form with `useUpdateWorkspace` mutation
    - On success: show toast "Workspace updated successfully", navigate to detail page
    - On 404: show toast "Workspace not found", navigate to list
    - Write in `features/workspace/components/workspace-edit-page.tsx`
    - _Requirements: 7.1, 7.4, 7.5, 7.6_

  - [ ]* 7.4 Write property test for client validation precedes API call
    - **Property 3: Client Validation Precedes API Call**
    - Test that for any form submission with invalid data (failing Zod schema), no HTTP request is issued
    - **Validates: Requirement 6.5**

- [ ] 8. Implement workspace detail and dialog components
  - [~] 8.1 Create workspace detail page component
    - Display general information: code, name, description, owner
    - Display audit information: creation date, last modification date
    - Show "Default" badge when `isDefault` is true
    - Show "Assign Owner" action when `ownerId` is null; show "Change Owner" when `ownerId` is set
    - Show edit/delete actions based on permissions
    - Display card skeleton while loading
    - Write in `features/workspace/components/workspace-detail-page.tsx`
    - _Requirements: 5.1, 5.2, 5.3, 5.4, 5.5, 5.6, 11.2, 12.4, 12.5_

  - [~] 8.2 Create workspace delete dialog component
    - Implement AlertDialog with workspace name and warning message
    - Wire with `useDeleteWorkspace` mutation
    - On success: close dialog, show success toast, list refreshes automatically
    - Handle business rule errors: WORKSPACE_DEFAULT_CANNOT_DELETE, WORKSPACE_DELETE_NOT_ALLOWED
    - Handle 404: show toast, list refreshes
    - Show spinner on delete button and disable cancel while in progress
    - Write in `features/workspace/components/workspace-delete-dialog.tsx`
    - _Requirements: 8.1, 8.2, 8.3, 8.4, 8.5, 8.6, 11.4_

  - [~] 8.3 Create workspace owner dialog component
    - Implement dialog with ownerId UUID input field
    - Support two modes: "assign" (for workspaces with no owner) and "change" (for workspaces with existing owner)
    - Wire with `useAssignOwner` / `useChangeOwner` hooks
    - Handle error codes: WORKSPACE_OWNER_EXISTS, WORKSPACE_NO_OWNER, WORKSPACE_SAME_OWNER, OWNER_NOT_FOUND
    - Show success toast on completion
    - Write in `features/workspace/components/workspace-owner-dialog.tsx`
    - _Requirements: 9.1, 9.2, 9.3, 9.4, 9.5, 9.6, 9.7, 9.8, 9.9_
    - **Note:** Owner management is fully implemented. Backend user existence validation depends on IAM integration (pending). Use TODO markers in integration tests.

  - [~] 8.4 Create workspace status badge component
    - Display "Default" badge for workspaces with `isDefault === true`
    - Write in `features/workspace/components/workspace-status-badge.tsx`
    - _Requirements: 5.4_

  - [ ]* 8.5 Write property test for owner action correctness
    - **Property 8: Owner Action Correctness**
    - Test that if `ownerId` is null, "Assign Owner" is shown and "Change Owner" is hidden; if `ownerId` is not null, "Change Owner" is shown and "Assign Owner" is hidden
    - **Validates: Requirements 5.5, 5.6**

- [~] 9. Checkpoint - Ensure all component tests pass
  - Ensure all tests pass, ask the user if questions arise.

- [ ] 10. Create App Router pages and navigation integration
  - [x] 10.1 Create workspace list route page
    - Create `app/(with-sidebar)/workspaces/page.tsx` that renders `WorkspaceListPage`
    - Replace existing hardcoded workspace child routes (finance, human-resource, marketing)
    - Add breadcrumb: Settings > Workspace Management
    - _Requirements: 1.1, 13.3_

  - [~] 10.2 Create workspace create route page
    - Create `app/(with-sidebar)/workspaces/new/page.tsx` that renders `WorkspaceCreatePage`
    - Add breadcrumb: Settings > Workspaces > New Workspace
    - _Requirements: 6.1_

  - [~] 10.3 Create workspace detail route page
    - Create `app/(with-sidebar)/workspaces/[id]/page.tsx` that renders `WorkspaceDetailPage`
    - Extract `id` param from route and pass to component
    - Add breadcrumb: Settings > Workspaces > {workspace name}
    - _Requirements: 5.1_

  - [~] 10.4 Create workspace edit route page
    - Create `app/(with-sidebar)/workspaces/[id]/edit/page.tsx` that renders `WorkspaceEditPage`
    - Extract `id` param from route and pass to component
    - Add breadcrumb: Settings > Workspaces > {workspace name} > Edit
    - _Requirements: 7.1_

  - [x] 10.5 Update sidebar navigation to include workspace management link
    - Add "Workspaces" link under the administration/settings section in sidebar navigation config
    - Ensure it navigates to `/workspaces`
    - Remove hardcoded workspace children (Finance, Human Resource, Marketing) from nav config
    - _Requirements: 13.1, 13.2_

- [ ] 11. Implement permission-based UI rendering
  - [~] 11.1 Implement permission guard logic for workspace actions
    - Create utility/hook that checks user permissions for workspace operations
    - Gate create button, edit action, delete action, assign owner, change owner based on corresponding permissions
    - Write in `features/workspace/hooks/use-workspace-permissions.ts`
    - _Requirements: 12.1, 12.2, 12.3, 12.4, 12.5_

  - [ ]* 11.2 Write property test for permission-based UI rendering
    - **Property 9: Permission-Based UI Rendering**
    - Test that UI actions are visible if and only if the user holds the corresponding permission
    - **Validates: Requirements 12.1, 12.2, 12.3, 12.4, 12.5**

- [~] 12. Final checkpoint - Ensure all tests pass
  - Ensure all tests pass, ask the user if questions arise.

## Notes

- Tasks marked with `*` are optional and can be skipped for faster MVP
- Each task references specific requirements for traceability
- Checkpoints ensure incremental validation
- Property tests validate universal correctness properties from the design document
- Unit tests validate specific examples and edge cases
- The project already has `zod` in node_modules (likely a transitive dependency) but it should be added as an explicit dependency
- The existing `features/drive/` module serves as the architecture reference pattern
- Existing hardcoded workspace routes (finance, human-resource, marketing) will be replaced by dynamic routing
- Owner Management (Assign/Change Owner) is fully designed and implemented. Backend validation of user existence via IAM is pending integration. E2E tests for owner operations should include TODO markers noting IAM dependency.

## Task Dependency Graph

```json
{
  "waves": [
    { "id": 0, "tasks": ["1.1", "1.2"] },
    { "id": 1, "tasks": ["1.3", "2.1"] },
    { "id": 2, "tasks": ["2.2", "3.1"] },
    { "id": 3, "tasks": ["2.3", "2.4", "2.5", "3.2"] },
    { "id": 4, "tasks": ["3.3"] },
    { "id": 5, "tasks": ["3.4", "3.5", "3.6", "4.1", "4.2"] },
    { "id": 6, "tasks": ["4.3", "4.4"] },
    { "id": 7, "tasks": ["6.1", "6.2", "8.4"] },
    { "id": 8, "tasks": ["6.3", "7.1"] },
    { "id": 9, "tasks": ["6.4", "6.5", "7.2", "7.3"] },
    { "id": 10, "tasks": ["7.4", "8.1"] },
    { "id": 11, "tasks": ["8.2", "8.3", "8.5"] },
    { "id": 12, "tasks": ["10.1", "10.2", "10.3", "10.4"] },
    { "id": 13, "tasks": ["10.5", "11.1"] },
    { "id": 14, "tasks": ["11.2"] }
  ]
}
```
