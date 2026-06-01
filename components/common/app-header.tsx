type AppHeaderProps = {
  title: string
  rightSlot?: React.ReactNode
}

export function AppHeader({ title, rightSlot }: AppHeaderProps) {
  return (
    <header className="flex h-16 shrink-0 items-center border-b bg-background px-6">
      <h1 className="text-lg font-semibold tracking-tight">{title}</h1>
      {rightSlot ? <div className="ml-auto">{rightSlot}</div> : null}
    </header>
  )
}
