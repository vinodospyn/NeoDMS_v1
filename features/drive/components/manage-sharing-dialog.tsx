"use client"

import * as React from "react"
import { Plus } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogTitle,
} from "@/components/ui/dialog"
import { Field, FieldLabel } from "@/components/ui/field"
import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupInput,
} from "@/components/ui/input-group"
import {
  NativeSelect,
  NativeSelectOption,
} from "@/components/ui/native-select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { FileTypeIcon } from "@/features/drive/components/file-type-icon/file-type-icon"
import { ShareRecipientRow } from "@/features/drive/components/share-recipient-row"
import {
  mockShareGroups,
  mockShareMembers,
  type ShareGroup,
  type ShareMember,
  type SharePermission,
} from "@/features/drive/data/mock-manage-sharing"
import type { DriveFileKind } from "@/features/drive/lib/file-types"
import { cn } from "@/lib/utils"

const sharingTabTriggerClass = cn(
  "h-8 flex-1 rounded-md border border-transparent px-2 text-sm font-medium shadow-none after:hidden",
  "text-muted-foreground",
  "data-[state=active]:border-border/60 data-[state=active]:bg-background data-[state=active]:text-foreground",
  "data-[state=active]:shadow-sm data-[state=active]:after:hidden",
  "data-active:border-border/60 data-active:bg-background data-active:text-foreground data-active:shadow-sm data-active:after:hidden"
)

export type ManageSharingDialogProps = {
  open: boolean
  onOpenChange: (open: boolean) => void
  title: string
  subtitle?: string
  kind?: DriveFileKind
  name?: string
  shared?: boolean
}

function InviteSearchBar({
  inviteLabel,
  searchPlaceholder,
  filterId,
}: {
  inviteLabel: string
  searchPlaceholder: string
  filterId: string
}) {
  return (
    <Field className="gap-2.5">
      <FieldLabel className="text-sm font-semibold text-foreground">
        {inviteLabel}
      </FieldLabel>

      <InputGroup className="h-10">
        <InputGroupAddon
          align="inline-start"
          className="border-r border-input pr-1 pl-1.5"
        >
          <NativeSelect
            id={filterId}
            size="sm"
            defaultValue="all"
            className="w-[4.5rem] [&_[data-slot=native-select]]:border-0 [&_[data-slot=native-select]]:bg-transparent [&_[data-slot=native-select]]:pr-6 [&_[data-slot=native-select]]:pl-1 [&_[data-slot=native-select]]:shadow-none [&_[data-slot=native-select]]:focus-visible:ring-0"
            aria-label={`${inviteLabel} filter`}
          >
            <NativeSelectOption value="all">All</NativeSelectOption>
            <NativeSelectOption value="members">Members</NativeSelectOption>
            <NativeSelectOption value="groups">Groups</NativeSelectOption>
          </NativeSelect>
        </InputGroupAddon>

        <InputGroupInput placeholder={searchPlaceholder} aria-label={inviteLabel} />

        <InputGroupAddon align="inline-end" className="border-l border-input pr-1">
          <InputGroupButton className="px-2.5 text-sm font-medium text-foreground">
            <Plus className="size-3.5" />
            Add
          </InputGroupButton>
        </InputGroupAddon>
      </InputGroup>
    </Field>
  )
}

export function ManageSharingDialog({
  open,
  onOpenChange,
  title,
  subtitle,
  kind = "folder",
  name,
  shared = false,
}: ManageSharingDialogProps) {
  const [members, setMembers] = React.useState<ShareMember[]>(mockShareMembers)
  const [groups, setGroups] = React.useState<ShareGroup[]>(mockShareGroups)

  React.useEffect(() => {
    if (open) {
      setMembers(mockShareMembers)
      setGroups(mockShareGroups)
    }
  }, [open])

  const updateMemberPermission = (id: string, permission: SharePermission) => {
    setMembers((current) =>
      current.map((member) =>
        member.id === id ? { ...member, permission } : member
      )
    )
  }

  const removeMember = (id: string) => {
    setMembers((current) => current.filter((member) => member.id !== id))
  }

  const updateGroupPermission = (id: string, permission: SharePermission) => {
    setGroups((current) =>
      current.map((group) =>
        group.id === id ? { ...group, permission } : group
      )
    )
  }

  const removeGroup = (id: string) => {
    setGroups((current) => current.filter((group) => group.id !== id))
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        showCloseButton
        className="flex flex-col gap-0 overflow-hidden rounded-2xl p-0 sm:max-h-[90vh] sm:min-h-[520px] sm:max-w-[480px]"
      >
        <div className="border-b border-border/60 px-5 py-4">
          <div className="flex items-start gap-3 pr-8">
            <FileTypeIcon
              kind={kind}
              name={name ?? title}
              shared={shared}
              variant="brand"
              size="sm"
            />
            <div className="min-w-0">
              <DialogTitle className="truncate text-base font-semibold text-foreground">
                {title}
              </DialogTitle>
              {subtitle ? (
                <p className="mt-0.5 truncate text-xs text-muted-foreground">
                  {subtitle}
                </p>
              ) : null}
            </div>
          </div>
        </div>

        <Tabs defaultValue="members" className="min-h-0 flex-1 gap-0">
          <TabsList className="mx-5 mt-4 h-10 w-[calc(100%-2.5rem)] justify-start gap-1 rounded-lg bg-muted/50 p-1">
            <TabsTrigger value="members" className={sharingTabTriggerClass}>
              Members
            </TabsTrigger>
            <TabsTrigger value="groups" className={sharingTabTriggerClass}>
              Groups
            </TabsTrigger>
          </TabsList>

          <TabsContent value="members" className="mt-0 outline-none">
            <div className="space-y-1 px-5 pt-4 pb-6">
              <InviteSearchBar
                inviteLabel="Invite Members"
                searchPlaceholder="Search"
                filterId="invite-members-filter"
              />

              <div className="mt-2 divide-y divide-border/50">
                {members.map((member) => (
                  <ShareRecipientRow
                    key={member.id}
                    name={member.name}
                    detail={`${member.location} | ${member.role}`}
                    permission={member.permission}
                    avatarUrl={member.avatarUrl}
                    onPermissionChange={(permission) =>
                      updateMemberPermission(member.id, permission)
                    }
                    onRemove={() => removeMember(member.id)}
                  />
                ))}
              </div>
            </div>
          </TabsContent>

          <TabsContent value="groups" className="mt-0 outline-none">
            <div className="space-y-1 px-5 pt-4 pb-6">
              <InviteSearchBar
                inviteLabel="Invite Groups"
                searchPlaceholder="Search groups"
                filterId="invite-groups-filter"
              />

              <div className="mt-2 divide-y divide-border/50">
                {groups.map((group) => (
                  <ShareRecipientRow
                    key={group.id}
                    name={group.name}
                    detail={`${group.memberCount} members`}
                    permission={group.permission}
                    avatarFallback={group.name.slice(0, 2).toUpperCase()}
                    onPermissionChange={(permission) =>
                      updateGroupPermission(group.id, permission)
                    }
                    onRemove={() => removeGroup(group.id)}
                  />
                ))}
              </div>
            </div>
          </TabsContent>
        </Tabs>

        <div className="mt-auto border-t border-dashed border-border/70 px-5 py-5">
          <Button
            type="button"
            className="primary-button h-10 w-full rounded-xl text-sm font-semibold"
            onClick={() => onOpenChange(false)}
          >
            Share
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}
