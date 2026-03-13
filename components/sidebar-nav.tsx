"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { BRAND_COLORS } from "@/lib/constants";

const navItems = [
  { href: "/",             label: "Dashboard",   color: BRAND_COLORS.lavender },
  { href: "/transactions", label: "Transactions", color: BRAND_COLORS.blue },
  { href: "/investments",  label: "Investments",  color: BRAND_COLORS.green },
  { href: "/budgets",      label: "Budgets",      color: BRAND_COLORS.yellow },
  { href: "/analyze",      label: "AI Analysis",  color: BRAND_COLORS.lavender },
];

export function SidebarNav() {
  const pathname = usePathname();

  return (
    <aside className="w-52 shrink-0 border-r border-border bg-sidebar flex flex-col">
      {/* Brand */}
      <div className="px-4 py-5">
        <span className="text-lg font-bold tracking-widest uppercase">
          <span className="text-primary text-glow-lavender">Mai</span>{" "}
          <span className="text-secondary text-glow-green">Mony</span>
        </span>
      </div>

      {/* Nav */}
      <nav className="flex-1 px-2 py-4 space-y-1">
        {navItems.map(({ href, label, color }) => {
          const active = pathname === href;
          return (
            <Link
              key={href}
              href={href}
              className="nav-item block px-3 py-2 rounded text-xs tracking-widest uppercase transition hover:bg-muted text-muted-foreground"
              style={{
                "--nav-color": color,
                ...(active ? { color } : {}),
              } as React.CSSProperties}
            >
              {label}
            </Link>
          );
        })}
      </nav>

      {/* Sign out */}
      <div className="px-4 py-4 border-t border-border">
        <SignOutButton />
      </div>
    </aside>
  );
}

function SignOutButton() {
  async function signOut() {
    await fetch("/api/auth", { method: "DELETE" });
    window.location.href = "/login";
  }

  return (
    <button
      type="button"
      onClick={signOut}
      className="w-full text-left text-xs tracking-widest uppercase text-muted-foreground hover:text-destructive transition"
    >
      Sign Out
    </button>
  );
}
