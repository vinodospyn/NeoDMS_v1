import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { UploadCloud } from "lucide-react"

export function DocumentUploadPage() {
  return (
    <div className="mx-auto flex w-full max-w-5xl flex-1 flex-col gap-6 py-4 md:py-6 lg:py-8">
      <header className="space-y-1">
        <h1 className="text-2xl font-semibold tracking-tight md:text-3xl">Document Upload</h1>
        <p className="text-sm text-muted-foreground">
          Upload up to 10 PDF files. Max size 25 MB each.
        </p>
      </header>

      <Card className="border-dashed bg-muted/40">
        <CardHeader className="pb-2">
          <CardTitle className="sr-only">Upload area</CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col items-center justify-center gap-4 py-10 md:py-14">
          <div className="flex size-14 items-center justify-center rounded-full bg-primary/5 text-primary">
            <UploadCloud className="size-7" />
          </div>
          <div className="text-center">
            <p className="text-base font-medium">Drag &amp; drop your document</p>
            <p className="mt-1 text-sm text-muted-foreground">
              or click to browse from your computer
            </p>
          </div>
          <Button variant="outline" className="mt-2 rounded-full px-6">
            Browse files
          </Button>
        </CardContent>
        <CardFooter className="flex flex-col gap-3 border-t bg-background/60 px-4 py-3.5 md:flex-row md:items-center md:justify-between">
          <div className="flex flex-1 flex-col gap-2 md:flex-row md:gap-3">
            <Button variant="outline" className="flex-1 justify-center md:flex-none md:px-6">
              Browse Template
            </Button>
            <Button variant="outline" className="flex-1 justify-center md:flex-none md:px-6">
              Import from Cloud
            </Button>
          </div>
          <Button
            disabled
            className="w-full justify-center rounded-full md:w-auto md:px-8"
          >
            Proceed to E‑Sign
          </Button>
        </CardFooter>
      </Card>
    </div>
  )
}

