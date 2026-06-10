"use client"

import * as React from "react"
import { Paperclip, Send, UserRound } from "lucide-react"

import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupInput,
} from "@/components/ui/input-group"
import { ScrollArea } from "@/components/ui/scroll-area"
import { appConfig } from "@/config/app"
import type { PerspectiveTreeNode } from "@/features/drive/data/mock-perspective-tree"
import type { DocumentComment } from "@/features/drive/data/mock-document-comments"
import {
  formatCommentTime,
  getDocumentComments,
  isPerspectiveDocument,
} from "@/features/drive/lib/document-comments"
import { cn } from "@/lib/utils"

type DocumentCommentsSectionProps = {
  selectedNode: PerspectiveTreeNode | null
  className?: string
}

function DocumentCommentMessage({ comment }: { comment: DocumentComment }) {
  const isCurrentUser = comment.isCurrentUser

  return (
    <article
      className={cn(
        "flex gap-2.5",
        isCurrentUser ? "flex-row-reverse" : "flex-row"
      )}
    >
      <Avatar size="sm" className="size-8 shrink-0">
        <AvatarFallback
          className={cn(
            "text-[10px] font-semibold",
            comment.avatarClassName
          )}
        >
          {isCurrentUser ? (
            <UserRound className="size-3.5" strokeWidth={2} />
          ) : (
            comment.authorInitials
          )}
        </AvatarFallback>
      </Avatar>

      <div
        className={cn(
          "min-w-0 max-w-[85%]",
          isCurrentUser ? "text-right" : "text-left"
        )}
      >
        <div
          className={cn(
            "mb-1 flex items-center gap-2",
            isCurrentUser && "flex-row-reverse"
          )}
        >
          <p
            className={cn(
              "text-[10px] font-semibold tracking-wide uppercase",
              isCurrentUser ? "text-primary" : "text-foreground"
            )}
          >
            {isCurrentUser ? "You" : comment.authorName}
          </p>
          <p className="text-[10px] text-muted-foreground">
            {comment.timestamp}
          </p>
        </div>

        <p
          className={cn(
            "inline-block rounded-lg px-3 py-2 text-left text-xs leading-relaxed",
            isCurrentUser
              ? "bg-primary/10 text-foreground"
              : "border border-border/70 bg-background text-foreground"
          )}
        >
          {comment.message}
        </p>
      </div>
    </article>
  )
}

export function DocumentCommentsSection({
  selectedNode,
  className,
}: DocumentCommentsSectionProps) {
  const nodeId = selectedNode?.id ?? "none"
  const canComment = isPerspectiveDocument(selectedNode)

  const [commentsByDocument, setCommentsByDocument] = React.useState<
    Record<string, DocumentComment[]>
  >({})
  const [draft, setDraft] = React.useState("")

  React.useEffect(() => {
    if (!selectedNode) {
      return
    }

    setCommentsByDocument((current) => {
      if (current[nodeId]) {
        return current
      }

      return {
        ...current,
        [nodeId]: canComment ? getDocumentComments(selectedNode) : [],
      }
    })
  }, [canComment, nodeId, selectedNode])

  const comments = commentsByDocument[nodeId] ?? []

  const handleSend = React.useCallback(() => {
    const message = draft.trim()
    if (!message || !canComment || !selectedNode) {
      return
    }

    const newComment: DocumentComment = {
      id: `${nodeId}-${Date.now()}`,
      authorName: appConfig.userDisplayName,
      authorInitials: appConfig.userDisplayName
        .split(" ")
        .map((part) => part[0])
        .join("")
        .slice(0, 2)
        .toUpperCase(),
      avatarClassName: "bg-primary/15 text-primary",
      message,
      timestamp: formatCommentTime(),
      isCurrentUser: true,
    }

    setCommentsByDocument((current) => ({
      ...current,
      [nodeId]: [...(current[nodeId] ?? []), newComment],
    }))
    setDraft("")
  }, [canComment, draft, nodeId, selectedNode])

  return (
    <div className={cn("flex min-h-0 flex-1 flex-col", className)}>
      <ScrollArea className="min-h-0 flex-1">
        <div className="space-y-5 py-1">
          {comments.length > 0 ? (
            comments.map((comment) => (
              <DocumentCommentMessage key={comment.id} comment={comment} />
            ))
          ) : (
            <p className="py-8 text-center text-xs text-muted-foreground">
              {canComment
                ? "No comments on this document yet. Start the conversation below."
                : "Select a document to view and add comments."}
            </p>
          )}
        </div>
      </ScrollArea>

      <div className="shrink-0 pt-3">
        <InputGroup className="h-10 rounded-lg border-border/70 bg-background opacity-100">
          <InputGroupAddon align="inline-start" className="pl-3">
            <Paperclip className="size-4 text-muted-foreground" />
          </InputGroupAddon>

          <InputGroupInput
            value={draft}
            onChange={(event) => setDraft(event.target.value)}
            onKeyDown={(event) => {
              if (event.key === "Enter" && !event.shiftKey) {
                event.preventDefault()
                handleSend()
              }
            }}
            placeholder="Message......"
            aria-label="Add a comment"
          />

          <InputGroupAddon align="inline-end" className="pr-1.5">
            <InputGroupButton
              type="button"
              size="icon-sm"
              className="primary-button size-8 rounded-md"
              aria-label="Send comment"
              onClick={handleSend}
            >
              <Send className="size-3.5" />
            </InputGroupButton>
          </InputGroupAddon>
        </InputGroup>
      </div>
    </div>
  )
}
