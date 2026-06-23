"use client"

import { useState } from "react"
import type { ZodIssue } from "zod"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import {
  createWorkspaceSchema,
  updateWorkspaceSchema,
} from "@/features/workspace/validations/workspace-schemas"

interface WorkspaceFormProps {
  mode: "create" | "edit"
  defaultValues?: { code?: string; name?: string; description?: string }
  onSubmit: (data: { code?: string; name?: string; description?: string }) => void
  isSubmitting: boolean
  onCancel: () => void
  serverError?: { field: string; message: string }
}

/**
 * Shared form component for creating and editing workspaces.
 * Validates input using Zod schemas and displays field-level errors.
 */
export function WorkspaceForm({
  mode,
  defaultValues,
  onSubmit,
  isSubmitting,
  onCancel,
  serverError,
}: WorkspaceFormProps) {
  const [code, setCode] = useState(defaultValues?.code ?? "")
  const [name, setName] = useState(defaultValues?.name ?? "")
  const [description, setDescription] = useState(defaultValues?.description ?? "")
  const [errors, setErrors] = useState<Record<string, string>>({})

  function getFieldError(field: string): string | undefined {
    if (serverError?.field === field) return serverError.message
    return errors[field]
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setErrors({})

    if (mode === "create") {
      const result = createWorkspaceSchema.safeParse({ code, name, description: description || undefined })
      if (!result.success) {
        const fieldErrors: Record<string, string> = {}
        result.error.issues.forEach((issue: ZodIssue) => {
          const field = issue.path[0]
          if (field && !fieldErrors[String(field)]) {
            fieldErrors[String(field)] = issue.message
          }
        })
        setErrors(fieldErrors)
        return
      }
      onSubmit(result.data)
    } else {
      const result = updateWorkspaceSchema.safeParse({ name, description: description || undefined })
      if (!result.success) {
        const fieldErrors: Record<string, string> = {}
        result.error.issues.forEach((issue: ZodIssue) => {
          const field = issue.path[0]
          if (field && !fieldErrors[String(field)]) {
            fieldErrors[String(field)] = issue.message
          }
        })
        setErrors(fieldErrors)
        return
      }
      onSubmit({ name, description: description || undefined })
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="workspace-code">Code</Label>
        <Input
          id="workspace-code"
          value={code}
          onChange={(e) => setCode(e.target.value)}
          disabled={mode === "edit"}
          placeholder="e.g. my-workspace"
          aria-invalid={!!getFieldError("code")}
        />
        {getFieldError("code") && (
          <p className="text-sm text-destructive">{getFieldError("code")}</p>
        )}
      </div>

      <div className="space-y-2">
        <Label htmlFor="workspace-name">Name</Label>
        <Input
          id="workspace-name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Workspace display name"
          aria-invalid={!!getFieldError("name")}
        />
        {getFieldError("name") && (
          <p className="text-sm text-destructive">{getFieldError("name")}</p>
        )}
      </div>

      <div className="space-y-2">
        <Label htmlFor="workspace-description">Description</Label>
        <Textarea
          id="workspace-description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Optional description"
          aria-invalid={!!getFieldError("description")}
        />
        {getFieldError("description") && (
          <p className="text-sm text-destructive">{getFieldError("description")}</p>
        )}
      </div>

      <div className="flex items-center gap-2 pt-2">
        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting ? "Saving..." : mode === "create" ? "Create Workspace" : "Save Changes"}
        </Button>
        <Button type="button" variant="outline" onClick={onCancel} disabled={isSubmitting}>
          Cancel
        </Button>
      </div>
    </form>
  )
}
