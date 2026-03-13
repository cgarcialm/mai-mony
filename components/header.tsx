export function Header() {
  return (
    <header className="h-12 shrink-0 border-b border-border bg-card flex items-center px-6 gap-2">
      <span className="text-xs tracking-widest uppercase text-muted-foreground">
        personal finance terminal
      </span>
      <span className="ml-auto flex gap-1.5 items-center">
        <span className="w-1.5 h-1.5 rounded-full bg-secondary" />
        <span className="w-1.5 h-1.5 rounded-full bg-accent" />
        <span className="w-1.5 h-1.5 rounded-full bg-primary" />
      </span>
    </header>
  );
}
