export type DocumentFormFieldType = "text" | "textarea"

export type DocumentFormField = {
  id: string
  label: string
  placeholder: string
  type?: DocumentFormFieldType
  optional?: boolean
}

export type DocumentFormSchema = {
  fields: DocumentFormField[]
}

export const documentFormSchemas: Record<string, DocumentFormSchema> = {
  aadhaar: {
    fields: [
      {
        id: "aadharNo",
        label: "Aadhar no",
        placeholder: "Enter Aadhar number",
      },
      {
        id: "name",
        label: "Name",
        placeholder: "Enter full name",
      },
      {
        id: "dateOfBirth",
        label: "Date of birth",
        placeholder: "Enter date of birth",
      },
      {
        id: "address",
        label: "Address",
        placeholder: "Enter address",
        type: "textarea",
      },
    ],
  },
  "identity-doc": {
    fields: [
      {
        id: "documentId",
        label: "Document ID",
        placeholder: "Enter ID",
      },
      {
        id: "fullName",
        label: "Full Name",
        placeholder: "Enter full name",
      },
      {
        id: "dateOfIssue",
        label: "Date of Issue",
        placeholder: "Enter date",
      },
      {
        id: "notes",
        label: "Notes (optional)",
        placeholder: "Enter notes",
        type: "textarea",
        optional: true,
      },
    ],
  },
  "offer-letter": {
    fields: [
      {
        id: "employeeName",
        label: "Employee name",
        placeholder: "Enter employee name",
      },
      {
        id: "jobTitle",
        label: "Job title",
        placeholder: "Enter job title",
      },
      {
        id: "joiningDate",
        label: "Joining date",
        placeholder: "Enter joining date",
      },
      {
        id: "department",
        label: "Department",
        placeholder: "Enter department",
      },
    ],
  },
}
