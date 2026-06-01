"use client"

import * as React from "react"
import { toast } from "sonner"
import { Bar, BarChart, CartesianGrid, XAxis } from "recharts"
import { Bell, Box, ChevronRight, CircleAlert, Loader2, Plus, Search, Settings } from "lucide-react"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Alert, AlertAction, AlertDescription, AlertTitle } from "@/components/ui/alert"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { AspectRatio } from "@/components/ui/aspect-ratio"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "@/components/ui/breadcrumb"
import { Button } from "@/components/ui/button"
import { ButtonGroup, ButtonGroupSeparator, ButtonGroupText } from "@/components/ui/button-group"
import { Calendar } from "@/components/ui/calendar"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel"
import { ChartContainer, ChartLegend, ChartLegendContent, ChartTooltip, ChartTooltipContent, type ChartConfig } from "@/components/ui/chart"
import { Checkbox } from "@/components/ui/checkbox"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"
import { Combobox, ComboboxContent, ComboboxEmpty, ComboboxInput, ComboboxItem, ComboboxList } from "@/components/ui/combobox"
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList, CommandSeparator, CommandShortcut } from "@/components/ui/command"
import {
  ContextMenu,
  ContextMenuCheckboxItem,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuLabel,
  ContextMenuSub,
  ContextMenuSubContent,
  ContextMenuSubTrigger,
  ContextMenuSeparator,
  ContextMenuShortcut,
  ContextMenuTrigger,
} from "@/components/ui/context-menu"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { DirectionProvider } from "@/components/ui/direction"
import { Drawer, DrawerClose, DrawerContent, DrawerDescription, DrawerFooter, DrawerHeader, DrawerTitle, DrawerTrigger } from "@/components/ui/drawer"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Empty, EmptyContent, EmptyDescription, EmptyHeader, EmptyMedia, EmptyTitle } from "@/components/ui/empty"
import { Field, FieldContent, FieldDescription, FieldGroup, FieldLabel, FieldSet, FieldTitle } from "@/components/ui/field"
import { HoverCard, HoverCardContent, HoverCardTrigger } from "@/components/ui/hover-card"
import { Input } from "@/components/ui/input"
import { InputGroup, InputGroupAddon, InputGroupButton, InputGroupInput, InputGroupText } from "@/components/ui/input-group"
import { InputOTP, InputOTPGroup, InputOTPSeparator, InputOTPSlot } from "@/components/ui/input-otp"
import { Item, ItemActions, ItemContent, ItemDescription, ItemGroup, ItemHeader, ItemMedia, ItemTitle } from "@/components/ui/item"
import { Kbd, KbdGroup } from "@/components/ui/kbd"
import { Label } from "@/components/ui/label"
import {
  MenubarCheckboxItem,
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarRadioGroup,
  MenubarRadioItem,
  MenubarSeparator,
  MenubarShortcut,
  MenubarTrigger,
} from "@/components/ui/menubar"
import { NativeSelect, NativeSelectOption } from "@/components/ui/native-select"
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu"
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Progress } from "@/components/ui/progress"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from "@/components/ui/resizable"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Separator } from "@/components/ui/separator"
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarInset,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
} from "@/components/ui/sidebar"
import { Skeleton } from "@/components/ui/skeleton"
import { Slider } from "@/components/ui/slider"
import { Toaster } from "@/components/ui/sonner"
import { Spinner } from "@/components/ui/spinner"
import { Switch } from "@/components/ui/switch"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Textarea } from "@/components/ui/textarea"
import { Toggle } from "@/components/ui/toggle"
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group"
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip"

const chartData = [
  { month: "Jan", value: 12 },
  { month: "Feb", value: 19 },
  { month: "Mar", value: 15 },
  { month: "Apr", value: 24 },
]

const chartConfig = {
  value: {
    label: "Value",
    color: "var(--primary)",
  },
} satisfies ChartConfig

export function UiShowcasePage() {
  const [date, setDate] = React.useState<Date | undefined>(new Date())
  const [otp, setOtp] = React.useState("")
  const [playgroundVariant, setPlaygroundVariant] = React.useState<
    "default" | "secondary" | "outline" | "ghost" | "destructive" | "link"
  >("default")
  const [playgroundSize, setPlaygroundSize] = React.useState<"xs" | "sm" | "default" | "lg">("default")
  const [playgroundLoading, setPlaygroundLoading] = React.useState(false)

  return (
    <div className="mx-auto w-full max-w-7xl space-y-6">
      <Toaster />
      <div>
        <h1 className="text-2xl font-semibold tracking-tight">Complete UI Showcase</h1>
        <p className="text-sm text-muted-foreground">
          Full catalog for all preinstalled shadcn components in this template.
        </p>
      </div>

      <Tabs defaultValue="inputs">
        <TabsList className="flex h-auto flex-wrap">
          <TabsTrigger value="playground">Playground</TabsTrigger>
          <TabsTrigger value="inputs">Inputs & Form</TabsTrigger>
          <TabsTrigger value="overlay">Overlay & Menus</TabsTrigger>
          <TabsTrigger value="data">Data & Layout</TabsTrigger>
          <TabsTrigger value="utility">Utilities</TabsTrigger>
        </TabsList>

        <TabsContent value="playground" className="mt-4 space-y-4">
          <div className="grid gap-4 lg:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Button Playground</CardTitle>
                <CardDescription>Try button variants, sizes, and icon/loading patterns.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid gap-3 sm:grid-cols-2">
                  <div className="space-y-1">
                    <Label htmlFor="playground-variant">Variant</Label>
                    <Select
                      value={playgroundVariant}
                      onValueChange={(value) =>
                        setPlaygroundVariant(
                          value as "default" | "secondary" | "outline" | "ghost" | "destructive" | "link"
                        )
                      }
                    >
                      <SelectTrigger id="playground-variant">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="default">default</SelectItem>
                        <SelectItem value="secondary">secondary</SelectItem>
                        <SelectItem value="outline">outline</SelectItem>
                        <SelectItem value="ghost">ghost</SelectItem>
                        <SelectItem value="destructive">destructive</SelectItem>
                        <SelectItem value="link">link</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-1">
                    <Label htmlFor="playground-size">Size</Label>
                    <Select
                      value={playgroundSize}
                      onValueChange={(value) =>
                        setPlaygroundSize(value as "xs" | "sm" | "default" | "lg")
                      }
                    >
                      <SelectTrigger id="playground-size">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="xs">xs</SelectItem>
                        <SelectItem value="sm">sm</SelectItem>
                        <SelectItem value="default">default</SelectItem>
                        <SelectItem value="lg">lg</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="flex flex-wrap items-center gap-2 rounded-md border p-3">
                  <Button variant={playgroundVariant} size={playgroundSize}>
                    Preview button
                  </Button>
                  <Button variant={playgroundVariant} size={playgroundSize}>
                    <Plus className="size-4" />
                    With icon
                  </Button>
                  <Button
                    variant={playgroundVariant}
                    size={playgroundSize}
                    disabled={playgroundLoading}
                    onClick={() => {
                      setPlaygroundLoading(true)
                      setTimeout(() => setPlaygroundLoading(false), 900)
                    }}
                  >
                    {playgroundLoading ? <Loader2 className="size-4 animate-spin" /> : null}
                    Loading state
                  </Button>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Quick UI Playground</CardTitle>
                <CardDescription>Common patterns devs can copy while building pages.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-1">
                  <Label htmlFor="pg-input">Input + action</Label>
                  <div className="flex gap-2">
                    <Input id="pg-input" placeholder="Search documents..." />
                    <Button variant="outline">Search</Button>
                  </div>
                </div>

                <div className="space-y-1">
                  <Label htmlFor="pg-select">Select + badge</Label>
                  <div className="flex gap-2">
                    <Select defaultValue="active">
                      <SelectTrigger id="pg-select" className="w-44">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="active">Active</SelectItem>
                        <SelectItem value="pending">Pending</SelectItem>
                        <SelectItem value="archived">Archived</SelectItem>
                      </SelectContent>
                    </Select>
                    <Badge variant="secondary">Filter</Badge>
                  </div>
                </div>

                <div className="space-y-2 rounded-md border p-3">
                  <p className="text-sm font-medium">Interaction states</p>
                  <div className="flex items-center gap-4">
                    <div className="flex items-center gap-2">
                      <Switch id="pg-switch" />
                      <Label htmlFor="pg-switch">Enable</Label>
                    </div>
                    <div className="flex items-center gap-2">
                      <Checkbox id="pg-check" />
                      <Label htmlFor="pg-check">Confirm</Label>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="inputs" className="mt-4 space-y-4">
          <div className="grid gap-4 lg:grid-cols-2">
            <Card className="lg:col-span-2">
              <CardHeader>
                <CardTitle>Button Usage Guide</CardTitle>
                <CardDescription>
                  Quick reference for `variant`, `size`, icon patterns, and custom button styling.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-5">
                <div className="space-y-2">
                  <p className="text-sm font-medium">Variants</p>
                  <div className="flex flex-wrap gap-2">
                    <Button variant="default">default</Button>
                    <Button variant="secondary">secondary</Button>
                    <Button variant="outline">outline</Button>
                    <Button variant="ghost">ghost</Button>
                    <Button variant="destructive">destructive</Button>
                    <Button variant="link">link</Button>
                  </div>
                </div>

                <div className="space-y-2">
                  <p className="text-sm font-medium">Sizes</p>
                  <div className="flex flex-wrap items-center gap-2">
                    <Button size="xs">xs</Button>
                    <Button size="sm">sm</Button>
                    <Button size="default">default</Button>
                    <Button size="lg">lg</Button>
                    <Button size="icon" aria-label="icon">
                      <Plus className="size-4" />
                    </Button>
                    <Button size="icon-xs" aria-label="icon-xs">
                      <Plus className="size-3" />
                    </Button>
                    <Button size="icon-sm" aria-label="icon-sm">
                      <Plus className="size-3.5" />
                    </Button>
                    <Button size="icon-lg" aria-label="icon-lg">
                      <Plus className="size-4" />
                    </Button>
                  </div>
                </div>

                <div className="space-y-2">
                  <p className="text-sm font-medium">Icon + text pattern</p>
                  <div className="flex flex-wrap gap-2">
                    <Button>
                      <Plus className="size-4" />
                      Create
                    </Button>
                    <Button variant="outline">
                      Settings
                      <ChevronRight className="size-4" />
                    </Button>
                    <Button className="primary-button">
                      Themed CTA
                    </Button>
                  </div>
                </div>

                <div className="rounded-md border bg-muted/30 p-3 text-xs text-muted-foreground">
                  Use `variant` and `size` props first. For project-specific CTA styling, reuse the
                  global `.primary-button` class instead of creating a new button primitive.
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Base Inputs</CardTitle>
                <CardDescription>`input`, `textarea`, `label`, `checkbox`, `switch`, `radio-group`</CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="space-y-1">
                  <Label htmlFor="name">Workspace name</Label>
                  <Input id="name" placeholder="Acme workspace" />
                </div>
                <div className="space-y-1">
                  <Label htmlFor="desc">Description</Label>
                  <Textarea id="desc" placeholder="Short description..." />
                </div>
                <div className="flex items-center gap-2">
                  <Checkbox id="terms" />
                  <Label htmlFor="terms">Accept terms</Label>
                </div>
                <div className="flex items-center gap-2">
                  <Switch id="auto" />
                  <Label htmlFor="auto">Enable automation</Label>
                </div>
                <RadioGroup defaultValue="team" className="flex gap-4">
                  <div className="flex items-center gap-2">
                    <RadioGroupItem value="team" id="team" />
                    <Label htmlFor="team">Team</Label>
                  </div>
                  <div className="flex items-center gap-2">
                    <RadioGroupItem value="solo" id="solo" />
                    <Label htmlFor="solo">Solo</Label>
                  </div>
                </RadioGroup>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Select Variants</CardTitle>
                <CardDescription>`select` and `native-select`</CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                <Select defaultValue="admin">
                  <SelectTrigger>
                    <SelectValue placeholder="Choose role" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="admin">Admin</SelectItem>
                    <SelectItem value="editor">Editor</SelectItem>
                    <SelectItem value="viewer">Viewer</SelectItem>
                  </SelectContent>
                </Select>

                <NativeSelect defaultValue="one" className="w-full">
                  <NativeSelectOption value="one">Native option one</NativeSelectOption>
                  <NativeSelectOption value="two">Native option two</NativeSelectOption>
                </NativeSelect>

                <InputOTP maxLength={6} value={otp} onChange={setOtp}>
                  <InputOTPGroup>
                    <InputOTPSlot index={0} />
                    <InputOTPSlot index={1} />
                    <InputOTPSlot index={2} />
                  </InputOTPGroup>
                  <InputOTPSeparator />
                  <InputOTPGroup>
                    <InputOTPSlot index={3} />
                    <InputOTPSlot index={4} />
                    <InputOTPSlot index={5} />
                  </InputOTPGroup>
                </InputOTP>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Input Group & Field</CardTitle>
                <CardDescription>`input-group` and `field` helpers</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <InputGroup>
                  <InputGroupAddon>
                    <Search className="size-4" />
                    <InputGroupText>Search</InputGroupText>
                  </InputGroupAddon>
                  <InputGroupInput placeholder="Search components..." />
                  <InputGroupAddon align="inline-end">
                    <InputGroupButton size="icon-xs" variant="ghost">
                      <Settings className="size-4" />
                    </InputGroupButton>
                  </InputGroupAddon>
                </InputGroup>

                <FieldSet>
                  <FieldGroup>
                    <Field>
                      <FieldLabel htmlFor="field-email">Email</FieldLabel>
                      <FieldContent>
                        <Input id="field-email" type="email" placeholder="team@example.com" />
                        <FieldDescription>Shared contact for notifications.</FieldDescription>
                      </FieldContent>
                    </Field>
                    <Field>
                      <FieldTitle>Status</FieldTitle>
                      <FieldContent>
                        <Badge variant="secondary">Active</Badge>
                      </FieldContent>
                    </Field>
                  </FieldGroup>
                </FieldSet>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Combobox</CardTitle>
                <CardDescription>`combobox` searchable select</CardDescription>
              </CardHeader>
              <CardContent>
                <Combobox>
                  <ComboboxInput placeholder="Pick framework..." />
                  <ComboboxContent>
                    <ComboboxEmpty>No result.</ComboboxEmpty>
                    <ComboboxList>
                      <ComboboxItem value="nextjs">Next.js</ComboboxItem>
                      <ComboboxItem value="react">React</ComboboxItem>
                      <ComboboxItem value="svelte">Svelte</ComboboxItem>
                    </ComboboxList>
                  </ComboboxContent>
                </Combobox>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="overlay" className="mt-4 space-y-4">
          <div className="grid gap-4 lg:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Dialog / Alert Dialog / Drawer / Sheet</CardTitle>
              </CardHeader>
              <CardContent className="flex flex-wrap gap-2">
                <Dialog>
                  <DialogTrigger asChild>
                    <Button variant="outline">Open dialog</Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Dialog title</DialogTitle>
                      <DialogDescription>Basic dialog preview.</DialogDescription>
                    </DialogHeader>
                    <DialogFooter>
                      <Button>Confirm</Button>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>

                <AlertDialog>
                  <AlertDialogTrigger asChild>
                    <Button variant="outline">Open alert dialog</Button>
                  </AlertDialogTrigger>
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle>Delete item?</AlertDialogTitle>
                      <AlertDialogDescription>This action cannot be undone.</AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel>Cancel</AlertDialogCancel>
                      <AlertDialogAction>Continue</AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>

                <Drawer>
                  <DrawerTrigger asChild>
                    <Button variant="outline">Open drawer</Button>
                  </DrawerTrigger>
                  <DrawerContent>
                    <DrawerHeader>
                      <DrawerTitle>Drawer title</DrawerTitle>
                      <DrawerDescription>Drawer content preview.</DrawerDescription>
                    </DrawerHeader>
                    <DrawerFooter>
                      <DrawerClose asChild>
                        <Button variant="outline">Close</Button>
                      </DrawerClose>
                    </DrawerFooter>
                  </DrawerContent>
                </Drawer>

                <Sheet>
                  <SheetTrigger asChild>
                    <Button variant="outline">Open sheet</Button>
                  </SheetTrigger>
                  <SheetContent>
                    <SheetHeader>
                      <SheetTitle>Sheet title</SheetTitle>
                      <SheetDescription>Sheet content preview.</SheetDescription>
                    </SheetHeader>
                    <SheetFooter>
                      <SheetClose asChild>
                        <Button variant="outline">Done</Button>
                      </SheetClose>
                    </SheetFooter>
                  </SheetContent>
                </Sheet>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Menus and Popups</CardTitle>
              </CardHeader>
              <CardContent className="flex flex-wrap gap-2">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="outline">Dropdown menu</Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent>
                    <DropdownMenuLabel>Actions</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem>Edit</DropdownMenuItem>
                    <DropdownMenuItem>Share</DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>

                <Popover>
                  <PopoverTrigger asChild>
                    <Button variant="outline">Popover</Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-64 text-sm">Quick popover content.</PopoverContent>
                </Popover>

                <HoverCard>
                  <HoverCardTrigger asChild>
                    <Button variant="outline">Hover card</Button>
                  </HoverCardTrigger>
                  <HoverCardContent className="text-sm">Extra information on hover.</HoverCardContent>
                </HoverCard>

                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button variant="outline">Tooltip</Button>
                  </TooltipTrigger>
                  <TooltipContent>Tooltip content</TooltipContent>
                </Tooltip>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Command</CardTitle>
              </CardHeader>
              <CardContent>
                <Command className="rounded-lg border">
                  <CommandInput placeholder="Type a command..." />
                  <CommandList>
                    <CommandEmpty>No results found.</CommandEmpty>
                    <CommandGroup heading="Navigation">
                      <CommandItem>
                        Dashboard
                        <CommandShortcut>G D</CommandShortcut>
                      </CommandItem>
                      <CommandItem>
                        Settings
                        <CommandShortcut>G S</CommandShortcut>
                      </CommandItem>
                    </CommandGroup>
                    <CommandSeparator />
                    <CommandGroup heading="Actions">
                      <CommandItem>Create project</CommandItem>
                    </CommandGroup>
                  </CommandList>
                </Command>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Context Menu</CardTitle>
                <CardDescription>Right-click interaction surface with nested actions.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                <ContextMenu>
                  <ContextMenuTrigger className="rounded-md border border-dashed bg-muted/30 px-3 py-10 text-center text-sm">
                    Right click this box
                  </ContextMenuTrigger>
                  <ContextMenuContent>
                    <ContextMenuLabel>Actions</ContextMenuLabel>
                    <ContextMenuSeparator />
                    <ContextMenuItem>
                      Rename
                      <ContextMenuShortcut>F2</ContextMenuShortcut>
                    </ContextMenuItem>
                    <ContextMenuSub>
                      <ContextMenuSubTrigger>Share</ContextMenuSubTrigger>
                      <ContextMenuSubContent>
                        <ContextMenuItem>Copy link</ContextMenuItem>
                        <ContextMenuItem>Email</ContextMenuItem>
                      </ContextMenuSubContent>
                    </ContextMenuSub>
                    <ContextMenuCheckboxItem checked>Pin item</ContextMenuCheckboxItem>
                    <ContextMenuItem variant="destructive">Delete</ContextMenuItem>
                  </ContextMenuContent>
                </ContextMenu>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Menubar</CardTitle>
                <CardDescription>Top app menu pattern with checkbox and radio examples.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="rounded-md border p-3">
                  <Menubar>
                    <MenubarMenu>
                      <MenubarTrigger>File</MenubarTrigger>
                      <MenubarContent>
                        <MenubarItem>
                          New
                          <MenubarShortcut>Ctrl+N</MenubarShortcut>
                        </MenubarItem>
                        <MenubarItem>
                          Save
                          <MenubarShortcut>Ctrl+S</MenubarShortcut>
                        </MenubarItem>
                        <MenubarSeparator />
                        <MenubarItem>Open</MenubarItem>
                        <MenubarCheckboxItem checked>Autosave</MenubarCheckboxItem>
                      </MenubarContent>
                    </MenubarMenu>
                    <MenubarMenu>
                      <MenubarTrigger>View</MenubarTrigger>
                      <MenubarContent>
                        <MenubarRadioGroup value="comfortable">
                          <MenubarRadioItem value="compact">Compact</MenubarRadioItem>
                          <MenubarRadioItem value="comfortable">Comfortable</MenubarRadioItem>
                        </MenubarRadioGroup>
                      </MenubarContent>
                    </MenubarMenu>
                  </Menubar>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="data" className="mt-4 space-y-4">
          <div className="grid gap-4 lg:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Table / Pagination / Scroll Area</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <ScrollArea className="h-44 rounded-md border">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Name</TableHead>
                        <TableHead>Status</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      <TableRow>
                        <TableCell>Documents</TableCell>
                        <TableCell>Ready</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>Templates</TableCell>
                        <TableCell>In review</TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </ScrollArea>
                <Pagination>
                  <PaginationContent>
                    <PaginationItem><PaginationPrevious href="#" /></PaginationItem>
                    <PaginationItem><PaginationLink href="#" isActive>1</PaginationLink></PaginationItem>
                    <PaginationItem><PaginationEllipsis /></PaginationItem>
                    <PaginationItem><PaginationNext href="#" /></PaginationItem>
                  </PaginationContent>
                </Pagination>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Chart / Progress / Slider</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <ChartContainer config={chartConfig} className="h-52 w-full">
                  <BarChart data={chartData}>
                    <CartesianGrid vertical={false} />
                    <XAxis dataKey="month" tickLine={false} axisLine={false} />
                    <ChartTooltip content={<ChartTooltipContent />} />
                    <ChartLegend content={<ChartLegendContent />} />
                    <Bar dataKey="value" fill="var(--color-value)" radius={8} />
                  </BarChart>
                </ChartContainer>
                <Progress value={66} />
                <Slider defaultValue={[40]} max={100} step={1} />
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Navigation Components</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <Breadcrumb>
                  <BreadcrumbList>
                    <BreadcrumbItem><BreadcrumbLink href="#">Home</BreadcrumbLink></BreadcrumbItem>
                    <BreadcrumbSeparator />
                    <BreadcrumbItem><BreadcrumbPage>Showcase</BreadcrumbPage></BreadcrumbItem>
                  </BreadcrumbList>
                </Breadcrumb>

                <NavigationMenu viewport={false}>
                  <NavigationMenuList>
                    <NavigationMenuItem>
                      <NavigationMenuTrigger>Products</NavigationMenuTrigger>
                      <NavigationMenuContent>
                        <NavigationMenuLink className="w-52">Contracts</NavigationMenuLink>
                        <NavigationMenuLink className="w-52">Templates</NavigationMenuLink>
                      </NavigationMenuContent>
                    </NavigationMenuItem>
                  </NavigationMenuList>
                </NavigationMenu>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Sidebar (layout primitive)</CardTitle>
              </CardHeader>
              <CardContent>
                <SidebarProvider defaultOpen={false}>
                  <div className="h-60 w-full overflow-hidden rounded-lg border">
                    <Sidebar collapsible="none">
                      <SidebarContent>
                        <SidebarGroup>
                          <SidebarGroupLabel>Menu</SidebarGroupLabel>
                          <SidebarGroupContent>
                            <SidebarMenu>
                              <SidebarMenuItem>
                                <SidebarMenuButton>
                                  <Box className="size-4" />
                                  <span>Overview</span>
                                </SidebarMenuButton>
                              </SidebarMenuItem>
                            </SidebarMenu>
                          </SidebarGroupContent>
                        </SidebarGroup>
                      </SidebarContent>
                    </Sidebar>
                    <SidebarInset className="p-3">
                      <p className="text-sm text-muted-foreground">Static sidebar preview for layout reference.</p>
                    </SidebarInset>
                  </div>
                </SidebarProvider>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="utility" className="mt-4 space-y-4">
          <div className="grid gap-4 lg:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Display Primitives</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center gap-2">
                  <Avatar><AvatarFallback>UI</AvatarFallback></Avatar>
                  <Badge>badge</Badge>
                  <Spinner />
                  <KbdGroup>
                    <Kbd>Ctrl</Kbd><Kbd>K</Kbd>
                  </KbdGroup>
                </div>
                <AspectRatio ratio={16 / 9} className="overflow-hidden rounded-md border bg-muted">
                  <div className="flex h-full items-center justify-center text-sm text-muted-foreground">
                    Aspect ratio 16:9
                  </div>
                </AspectRatio>
                <Skeleton className="h-4 w-2/3" />
                <Separator />
                <Toggle>Toggle</Toggle>
                <ToggleGroup type="single">
                  <ToggleGroupItem value="bold">Bold</ToggleGroupItem>
                  <ToggleGroupItem value="italic">Italic</ToggleGroupItem>
                </ToggleGroup>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Structure Components</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <Accordion type="single" collapsible className="rounded-md border px-3">
                  <AccordionItem value="a">
                    <AccordionTrigger>Accordion</AccordionTrigger>
                    <AccordionContent>Expandable content preview.</AccordionContent>
                  </AccordionItem>
                </Accordion>

                <Collapsible>
                  <CollapsibleTrigger asChild>
                    <Button variant="outline" size="sm">Toggle collapsible</Button>
                  </CollapsibleTrigger>
                  <CollapsibleContent className="mt-2 rounded-md border p-2 text-sm">
                    Hidden content revealed.
                  </CollapsibleContent>
                </Collapsible>

                <Empty className="border">
                  <EmptyHeader>
                    <EmptyMedia variant="icon"><CircleAlert className="size-4" /></EmptyMedia>
                    <EmptyTitle>No data yet</EmptyTitle>
                    <EmptyDescription>Create your first entry to get started.</EmptyDescription>
                  </EmptyHeader>
                  <EmptyContent>
                    <Button size="sm"><Plus className="size-4" />Create</Button>
                  </EmptyContent>
                </Empty>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Item & Button Group</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <ButtonGroup>
                  <Button size="sm">Left</Button>
                  <ButtonGroupSeparator />
                  <Button size="sm" variant="secondary">Middle</Button>
                  <ButtonGroupText>Text</ButtonGroupText>
                </ButtonGroup>

                <ItemGroup>
                  <Item variant="outline">
                    <ItemHeader>
                      <ItemTitle>Item component</ItemTitle>
                      <ItemActions><ChevronRight className="size-4" /></ItemActions>
                    </ItemHeader>
                    <ItemMedia variant="icon"><Bell className="size-4" /></ItemMedia>
                    <ItemContent>
                      <ItemDescription>Reusable row pattern for lists.</ItemDescription>
                    </ItemContent>
                  </Item>
                </ItemGroup>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Feedback + Resizable + Direction + Sonner</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <Alert>
                  <CircleAlert className="size-4" />
                  <AlertTitle>Info</AlertTitle>
                  <AlertDescription>Alert with title and description.</AlertDescription>
                  <AlertAction>Action</AlertAction>
                </Alert>

                <ResizablePanelGroup className="min-h-24 rounded-md border">
                  <ResizablePanel defaultSize={50} className="p-2 text-sm">Left panel</ResizablePanel>
                  <ResizableHandle withHandle />
                  <ResizablePanel defaultSize={50} className="p-2 text-sm">Right panel</ResizablePanel>
                </ResizablePanelGroup>

                <DirectionProvider dir="rtl">
                  <div className="rounded-md border p-2 text-sm">RTL preview via direction provider.</div>
                </DirectionProvider>

                <Button variant="outline" onClick={() => toast.success("Sonner toast works out of the box")}>
                  Show toast
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Calendar & Carousel</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <Calendar mode="single" selected={date} onSelect={setDate} className="rounded-md border" />
                <Carousel className="w-full">
                  <CarouselContent>
                    {["Slide 1", "Slide 2", "Slide 3"].map((slide) => (
                      <CarouselItem key={slide}>
                        <div className="rounded-md border p-6 text-center text-sm">{slide}</div>
                      </CarouselItem>
                    ))}
                  </CarouselContent>
                  <CarouselPrevious />
                  <CarouselNext />
                </Carousel>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>

      <Card>
        <CardHeader>
          <CardTitle>Installed Components Checklist</CardTitle>
          <CardDescription>All UI files in `components/ui` are installed and represented in this showcase.</CardDescription>
        </CardHeader>
        <CardContent className="flex flex-wrap gap-2 text-xs">
          {[
            "accordion","alert","alert-dialog","aspect-ratio","avatar","badge","breadcrumb","button","button-group","calendar","card","carousel","chart","checkbox","collapsible","combobox","command","context-menu","dialog","direction","drawer","dropdown-menu","empty","field","hover-card","input","input-group","input-otp","item","kbd","label","menubar","native-select","navigation-menu","pagination","popover","progress","radio-group","resizable","scroll-area","select","separator","sheet","sidebar","skeleton","slider","sonner","spinner","switch","table","tabs","textarea","toggle","toggle-group","tooltip",
          ].map((name) => (
            <Badge key={name} variant="secondary">{name}</Badge>
          ))}
        </CardContent>
      </Card>
    </div>
  )
}
