"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

const navItems = [
  { href: "/", label: "Dashboard", color: "#C4B5FD" },
  { href: "/transactions", label: "Transactions", color: "#7DD3FC" },
  { href: "/investments", label: "Investments", color: "#86EFAC" },
  { href: "/budgets", label: "Budgets", color: "#FEF08A" },
  { href: "/analyze", label: "AI Analysis", color: "#C4B5FD" },
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
            <NavItem key={href} href={href} label={label} color={color} active={active} />
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

function NavItem({ href, label, color, active }: { href: string; label: string; color: string; active: boolean }) {
  const [hovered, setHovered] = useState(false);

  return (
    <Link
      href={href}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="block px-3 py-2 rounded text-xs tracking-widest uppercase transition hover:bg-muted"
      style={{ color: active || hovered ? color : undefined }}
    >
      <span className={active || hovered ? undefined : "text-muted-foreground"}>
        {label}
      </span>
    </Link>
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
