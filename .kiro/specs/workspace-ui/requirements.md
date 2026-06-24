# Requirements Document

## Introduction

The Workspace UI module provides a complete administrative interface for managing workspaces within the ESTORE platform. It enables tenant administrators holding the `ESTORE_TENANT_ADMIN` role to create, view, edit, delete, and manage ownership of workspaces. The module integrates with the backend Workspace API (`/api/v1/workspaces`), enforces tenant isolation, and follows the existing feature-based architecture pattern. All operations produce audit events and follow RFC 7807 error response patterns.

## Glossary

- **Workspace_List_Page**: The page component that displays a paginated, searchable, sortable table of workspaces at the `/workspaces` route
- **Workspace_Detail_Page**: The page component that displays read-only workspace information and audit details at the `/workspaces/[id]` route
- **Workspace_Form**: The shared form component used for both creating and editing workspaces, with Zod schema validation
- **Workspace_Delete_Dialog**: The confirmation dialog shown before deleting a workspace
- **Workspace_Owner_Dialog**: The dialog for assigning or changing a workspace owner
- **Workspace_Service**: The API client layer that handles HTTP communication with the backend Workspace API
- **Validation_Schema**: The Zod-based validation rules applied to form inputs before submission
- **Query_Cache**: The React Query cache layer that manages server state for workspace data
- **Error_Handler**: The error handling logic that maps API error codes to user-friendly messages
- **Permission_Guard**: The UI logic that shows or hides actions based on the user's backend permissions
- **Sidebar_Navigation**: The application sidebar that provides navigation links to workspace management

## Requirements

### Requirement 1: Workspace List Display

**User Story:** As a tenant administrator, I want to view a paginated list of workspaces, so that I can browse and manage all workspaces in my tenant.

#### Acceptance Criteria

1. WHEN a user navigates to the `/workspaces` route, THE Workspace_List_Page SHALL display a table of workspaces with columns for code, name, owner, and creation date
2. WHEN the workspace list is loading for the first time, THE Workspace_List_Page SHALL display 5 skeleton rows with shimmer animation
3. WHEN workspace data is successfully loaded, THE Workspace_List_Page SHALL render one table row per workspace item returned by the API
4. THE Workspace_List_Page SHALL display pagination controls showing current page, total pages, and total elements
5. WHEN the user changes the page, THE Workspace_List_Page SHALL fetch the corresponding page from the API while keeping previous data visible during loading
6. THE Workspace_Service SHALL send pagination parameters where page is zero-based and size is between 1 and 100 inclusive

### Requirement 2: Workspace Search and Filtering

**User Story:** As a tenant administrator, I want to search and filter workspaces, so that I can quickly find specific workspaces in a large list.

#### Acceptance Criteria

1. WHEN a user types in the search input, THE Workspace_List_Page SHALL debounce the input by 300 milliseconds before issuing an API request
2. WHEN a search term is provided, THE Workspace_Service SHALL include the search term as the `name` filter parameter in the API request
3. WHEN a filter value is applied, THE Workspace_List_Page SHALL reset the pagination to page zero
4. WHEN the search input is cleared, THE Workspace_List_Page SHALL fetch the unfiltered workspace list

### Requirement 3: Workspace Sorting

**User Story:** As a tenant administrator, I want to sort the workspace list by different columns, so that I can organize the display according to my needs.

#### Acceptance Criteria

1. WHEN a user clicks a sortable column header, THE Workspace_List_Page SHALL toggle the sort direction and fetch sorted results from the API
2. THE Workspace_Service SHALL only send sort parameters where the field is one of "name", "code", or "createdAt" and the direction is one of "asc" or "desc"
3. WHEN a sort is applied, THE Workspace_List_Page SHALL reset the pagination to page zero
4. WHEN no explicit sort is selected, THE Workspace_List_Page SHALL default to sorting by "createdAt" in descending order

### Requirement 4: Workspace Row Actions

**User Story:** As a tenant administrator, I want quick actions on each workspace row, so that I can efficiently manage workspaces without navigating away from the list.

#### Acceptance Criteria

1. WHEN a workspace row is displayed, THE Workspace_List_Page SHALL show action buttons for view, edit, and delete operations
2. WHILE a workspace has `isDefault` set to true, THE Workspace_List_Page SHALL disable the delete action button for that row
3. WHILE a workspace has `isDeleteAllowed` set to false, THE Workspace_List_Page SHALL disable the delete action button for that row
4. WHEN a user clicks the view action, THE Workspace_List_Page SHALL navigate to the `/workspaces/[id]` detail page

### Requirement 5: Workspace Detail View

**User Story:** As a tenant administrator, I want to view detailed workspace information including audit data, so that I can review workspace configuration and history.

#### Acceptance Criteria

1. WHEN a user navigates to `/workspaces/[id]`, THE Workspace_Detail_Page SHALL display general information including code, name, description, and owner
2. WHEN a user navigates to `/workspaces/[id]`, THE Workspace_Detail_Page SHALL display audit information including creation date and last modification date
3. WHILE the detail page is loading, THE Workspace_Detail_Page SHALL display a card skeleton with field placeholders
4. WHEN a workspace has `isDefault` set to true, THE Workspace_Detail_Page SHALL display a "Default" badge indicator
5. WHEN a workspace has no owner assigned, THE Workspace_Detail_Page SHALL display an "Assign Owner" action
6. WHEN a workspace has an owner assigned, THE Workspace_Detail_Page SHALL display a "Change Owner" action

### Requirement 6: Create Workspace

**User Story:** As a tenant administrator, I want to create new workspaces with validated inputs, so that I can organize content and users into logical groups.

#### Acceptance Criteria

1. WHEN a user navigates to `/workspaces/new`, THE Workspace_Form SHALL display input fields for code, name, and description
2. THE Validation_Schema SHALL require the code field to be between 1 and 50 characters and match the pattern `^[A-Za-z0-9_-]+$`
3. THE Validation_Schema SHALL require the name field to be between 1 and 255 characters
4. THE Validation_Schema SHALL allow the description field to be optional with a maximum of 2000 characters
5. WHEN the user submits the form with invalid data, THE Workspace_Form SHALL display inline validation errors on the corresponding fields without calling the API
6. WHEN the user submits valid form data, THE Workspace_Service SHALL send a POST request to `/api/v1/workspaces` with the form data
7. WHEN the API returns a 201 success response, THE Workspace_Form SHALL display a success toast "Workspace created successfully" and navigate to the workspace list
8. WHEN the API returns a 409 response with error code "WORKSPACE_CODE_EXISTS", THE Workspace_Form SHALL display an inline error "A workspace with this code already exists" on the code field
9. WHILE the form is submitting, THE Workspace_Form SHALL disable the submit button and show a loading spinner

### Requirement 7: Edit Workspace

**User Story:** As a tenant administrator, I want to edit existing workspace details, so that I can update workspace configuration as needs change.

#### Acceptance Criteria

1. WHEN a user navigates to `/workspaces/[id]/edit`, THE Workspace_Form SHALL pre-populate the form fields with the current workspace data
2. WHILE in edit mode, THE Workspace_Form SHALL disable the code field since workspace codes are immutable
3. THE Validation_Schema SHALL require at least one field (name or description) to be provided for update
4. WHEN the user submits valid changes, THE Workspace_Service SHALL send a PUT request to `/api/v1/workspaces/[id]`
5. WHEN the API returns a 200 success response, THE Workspace_Form SHALL display a success toast "Workspace updated successfully" and navigate to the workspace detail page
6. WHEN the API returns a 404 response, THE Workspace_Form SHALL display an error toast "Workspace not found" and navigate to the workspace list

### Requirement 8: Delete Workspace

**User Story:** As a tenant administrator, I want to delete workspaces that are no longer needed, so that I can keep the workspace list clean and organized.

#### Acceptance Criteria

1. WHEN a user triggers the delete action, THE Workspace_Delete_Dialog SHALL display a confirmation dialog with the workspace name and a warning that the action cannot be undone
2. WHEN the user confirms the deletion, THE Workspace_Service SHALL send a DELETE request to `/api/v1/workspaces/[id]`
3. WHEN the API returns a 204 success response, THE Workspace_Delete_Dialog SHALL close, display a success toast "Workspace deleted successfully", and refresh the workspace list
4. IF the API returns error code "WORKSPACE_DEFAULT_CANNOT_DELETE", THEN THE Error_Handler SHALL display "The default workspace cannot be deleted"
5. IF the API returns error code "WORKSPACE_DELETE_NOT_ALLOWED", THEN THE Error_Handler SHALL display "This workspace cannot be deleted"
6. IF the API returns a 404 response during deletion, THEN THE Error_Handler SHALL display "Workspace not found" and refresh the workspace list

### Requirement 9: Owner Management

**User Story:** As a tenant administrator, I want to assign and change workspace owners, so that I can delegate workspace responsibility to appropriate users.

#### Acceptance Criteria

1. WHEN a user triggers the "Assign Owner" action on a workspace with no owner, THE Workspace_Owner_Dialog SHALL display a form to select a new owner
2. WHEN a user triggers the "Change Owner" action on a workspace with an existing owner, THE Workspace_Owner_Dialog SHALL display a form to select a different owner
3. THE Validation_Schema SHALL require the ownerId field to be a valid UUID
4. WHEN assigning an owner, THE Workspace_Service SHALL send a PUT request to `/api/v1/workspaces/[id]/assign-owner`
5. WHEN changing an owner, THE Workspace_Service SHALL send a PUT request to `/api/v1/workspaces/[id]/change-owner`
6. IF the API returns error code "WORKSPACE_OWNER_EXISTS", THEN THE Error_Handler SHALL display "This workspace already has an owner. Use 'Change Owner' instead."
7. IF the API returns error code "WORKSPACE_NO_OWNER", THEN THE Error_Handler SHALL display "Cannot change owner — no owner is currently assigned. Use 'Assign Owner' instead."
8. IF the API returns error code "WORKSPACE_SAME_OWNER", THEN THE Error_Handler SHALL display "The new owner must be different from the current owner"
9. IF the API returns error code "OWNER_NOT_FOUND", THEN THE Error_Handler SHALL display "The selected user was not found"

### Requirement 10: Error Handling

**User Story:** As a tenant administrator, I want clear and actionable error messages, so that I can understand what went wrong and how to resolve it.

#### Acceptance Criteria

1. WHEN an API call fails due to a network error, THE Error_Handler SHALL display a toast "Network error. Please check your connection and try again."
2. WHEN the API returns a 401 response, THE Error_Handler SHALL redirect the user to the login page with the return URL preserved
3. WHEN the API returns a 403 response, THE Error_Handler SHALL display a toast "You don't have permission to perform this action"
4. WHEN the API returns an error with a known error code, THE Error_Handler SHALL display the corresponding user-friendly message from the error code mapping
5. IF the API returns an error with an unknown error code, THEN THE Error_Handler SHALL display a generic message "An unexpected error occurred"
6. THE Error_Handler SHALL never display raw error codes, stack traces, or technical details to the user

### Requirement 11: Loading States

**User Story:** As a tenant administrator, I want visual feedback during loading operations, so that I know the application is processing my request.

#### Acceptance Criteria

1. WHILE the workspace list is loading initially, THE Workspace_List_Page SHALL display skeleton rows with shimmer animation
2. WHILE the workspace detail is loading, THE Workspace_Detail_Page SHALL display a card skeleton with field placeholders
3. WHILE a form is submitting, THE Workspace_Form SHALL display a spinner on the submit button and disable all form inputs
4. WHILE a delete operation is in progress, THE Workspace_Delete_Dialog SHALL display a spinner on the delete button and disable the cancel button
5. WHILE search input is being debounced, THE Workspace_List_Page SHALL display a subtle spinner indicator in the search input

### Requirement 12: Permission-Based UI Rendering

**User Story:** As a tenant administrator, I want the UI to reflect my permissions, so that I only see actions I am authorized to perform.

#### Acceptance Criteria

1. WHILE the user lacks `workspace:create` permission, THE Workspace_List_Page SHALL hide the "New Workspace" button
2. WHILE the user lacks `workspace:update` permission, THE Workspace_List_Page SHALL hide the "Edit" action on workspace rows
3. WHILE the user lacks `workspace:delete` permission, THE Workspace_List_Page SHALL hide the "Delete" action on workspace rows
4. WHILE the user lacks `workspace:assign_owner` permission, THE Workspace_Detail_Page SHALL hide the "Assign Owner" action
5. WHILE the user lacks `workspace:change_owner` permission, THE Workspace_Detail_Page SHALL hide the "Change Owner" action

### Requirement 13: Navigation Integration

**User Story:** As a tenant administrator, I want workspace management accessible from the application sidebar, so that I can navigate to it consistently from anywhere in the application.

#### Acceptance Criteria

1. THE Sidebar_Navigation SHALL display a "Workspaces" link under the administration section
2. WHEN a user clicks the "Workspaces" sidebar link, THE Sidebar_Navigation SHALL navigate to the `/workspaces` route
3. WHEN a user is on any workspace page, THE Workspace_List_Page SHALL display breadcrumb navigation showing the current location context

### Requirement 14: Cache Management

**User Story:** As a tenant administrator, I want workspace data to stay fresh after mutations, so that the displayed data always reflects the current state.

#### Acceptance Criteria

1. WHEN a workspace is successfully created, THE Query_Cache SHALL invalidate the workspace list query and trigger a refetch
2. WHEN a workspace is successfully updated, THE Query_Cache SHALL invalidate both the workspace list query and the specific workspace detail query
3. WHEN a workspace is successfully deleted, THE Query_Cache SHALL invalidate the workspace list query and trigger a refetch
4. WHEN a workspace owner is successfully assigned or changed, THE Query_Cache SHALL invalidate both the workspace list query and the specific workspace detail query
5. THE Query_Cache SHALL use a stale time of 30 seconds to reduce redundant API requests while keeping data reasonably fresh
