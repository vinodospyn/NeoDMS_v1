import { z } from "zod"

const workspaceCodeSchema = z
  .string()
  .min(1, "Code is required")
  .max(50, "Code must be 50 characters or less")
  .regex(
    /^[A-Za-z0-9_-]+$/,
    "Code can only contain letters, numbers, hyphens, and underscores"
  )

const workspaceNameSchema = z
  .string()
  .min(1, "Name is required")
  .max(255, "Name must be 255 characters or less")

const workspaceDescriptionSchema = z
  .string()
  .max(2000, "Description must be 2000 characters or less")
  .optional()

export const createWorkspaceSchema = z.object({
  code: workspaceCodeSchema,
  name: workspaceNameSchema,
  description: workspaceDescriptionSchema,
})

export const updateWorkspaceSchema = z
  .object({
    name: workspaceNameSchema.optional(),
    description: workspaceDescriptionSchema,
  })
  .refine((data) => data.name !== undefined || data.description !== undefined, {
    message: "At least one field must be provided",
  })

export const workspaceOwnerSchema = z.object({
  ownerId: z.string().uuid("Must be a valid UUID"),
})

export type CreateWorkspaceFormData = z.infer<typeof createWorkspaceSchema>
export type UpdateWorkspaceFormData = z.infer<typeof updateWorkspaceSchema>
export type WorkspaceOwnerFormData = z.infer<typeof workspaceOwnerSchema>
