"use client"

import * as React from "react"

import { Field, FieldLabel, FormFieldGroup } from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import type { PerspectiveTreeNode } from "@/features/drive/data/mock-perspective-tree"
import { getDocumentFormSchema } from "@/features/drive/lib/document-forms"
import { cn } from "@/lib/utils"

type DocumentFormSectionProps = {
  selectedNode: PerspectiveTreeNode | null
  className?: string
}

export function DocumentFormSection({
  selectedNode,
  className,
}: DocumentFormSectionProps) {
  const schema = getDocumentFormSchema(selectedNode)
  const nodeId = selectedNode?.id ?? "none"

  const [formValues, setFormValues] = React.useState<
    Record<string, Record<string, string>>
  >({})

  const currentValues = formValues[nodeId] ?? {}

  const updateFieldValue = React.useCallback(
    (fieldId: string, value: string) => {
      setFormValues((current) => ({
        ...current,
        [nodeId]: {
          ...current[nodeId],
          [fieldId]: value,
        },
      }))
    },
    [nodeId]
  )

  if (!schema) {
    return (
      <section
        className={cn(
          "rounded-xl border border-dashed border-border/60 bg-background px-4 py-8 text-center",
          className
        )}
      >
        <p className="text-sm font-medium text-foreground">No form available</p>
        <p className="mt-1 text-xs text-muted-foreground">
          Select a document to fill its form.
        </p>
      </section>
    )
  }

  return (
    <FormFieldGroup className={className}>
      {schema.fields.map((field) => {
        const fieldId = `${nodeId}-${field.id}`
        const value = currentValues[field.id] ?? ""

        return (
          <Field key={field.id} density="form">
            <FieldLabel htmlFor={fieldId} size="form">
              {field.label}
            </FieldLabel>
            {field.type === "textarea" ? (
              <Textarea
                id={fieldId}
                value={value}
                onChange={(event) =>
                  updateFieldValue(field.id, event.target.value)
                }
                placeholder={field.placeholder}
              />
            ) : (
              <Input
                id={fieldId}
                value={value}
                onChange={(event) =>
                  updateFieldValue(field.id, event.target.value)
                }
                placeholder={field.placeholder}
              />
            )}
          </Field>
        )
      })}
    </FormFieldGroup>
  )
}
