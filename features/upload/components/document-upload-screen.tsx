import { DocumentUploadHeader } from "@/features/upload/components/document-upload-header"
import { DocumentUploadPage } from "@/features/upload/components/document-upload-page"

export function DocumentUploadScreen() {
  return (
    <div className="flex min-h-svh flex-col bg-background">
      <DocumentUploadHeader />
      <main className="flex flex-1 items-center justify-center px-4 py-6 md:px-6">
        <DocumentUploadPage />
      </main>
    </div>
  )
}

