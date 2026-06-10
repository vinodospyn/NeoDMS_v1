# Form Field Guide

Standard layout for **labeled text inputs** (`Input`, `Textarea`) across Neo Drive and perspective view. Use shadcn primitives from `components/ui/field.tsx` — do not hand-roll label size or spacing.

## When to use

Use this pattern whenever a visible label sits above (or beside) a text field the user can type into:

- Document forms (perspective view **Forms** tab)
- Settings / metadata forms
- Modal forms with `Input` or `Textarea`

**Not** for:

- Search bars without field labels (toolbar search, tree search)
- `InputGroup` composite controls where the row title is a section heading (e.g. “Invite Members” above a search + add bar)
- Table inline filters

## Standard tokens

| Piece | API | Spacing / type |
|-------|-----|----------------|
| Field stack | `FormFieldGroup` | `space-y-3` between fields |
| Single field | `Field density="form"` | `gap-1.5` between label and control |
| Label | `FieldLabel size="form"` | `text-xs font-medium` |
| Control | `Input` or `Textarea` from `components/ui/*` | Default primitive styles |

## Example

```tsx
import { Field, FieldLabel, FormFieldGroup } from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"

<FormFieldGroup>
  <Field density="form">
    <FieldLabel htmlFor="aadhar-no" size="form">
      Aadhar no
    </FieldLabel>
    <Input id="aadhar-no" placeholder="Enter Aadhar number" />
  </Field>

  <Field density="form">
    <FieldLabel htmlFor="address" size="form">
      Address
    </FieldLabel>
    <Textarea id="address" placeholder="Enter address" />
  </Field>
</FormFieldGroup>
```

## Reference implementation

`features/drive/components/document-form-section.tsx`

## Rules

1. Always use `FormFieldGroup` + `Field density="form"` + `FieldLabel size="form"` for labeled text fields.
2. Do not duplicate `text-xs`, `gap-1.5`, or `space-y-3` on one-off forms — use the field variants.
3. Section headings above composite inputs (e.g. `InputGroup`) may use `Field` + `FieldLabel` with default size when the label describes a control group, not a single text box.
