"use client";

import { useState } from "react";

const cards = [
  { label: "Spending",    value: "—", color: "#C4B5FD", oklch: "0.82 0.09 293" },
  { label: "Investments", value: "—", color: "#86EFAC", oklch: "0.90 0.09 155" },
  { label: "Net Worth",   value: "—", color: "#7DD3FC", oklch: "0.87 0.06 215" },
  { label: "Budgets",     value: "—", color: "#FEF08A", oklch: "0.92 0.08 95"  },
];

export default function DashboardPage() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-semibold text-primary text-glow-lavender tracking-wider">
          Dashboard
        </h2>
        <p className="text-muted-foreground text-sm mt-1">
          Your financial overview will appear here.
        </p>
      </div>

      <div className="grid grid-cols-2 gap-4 max-w-lg">
        {cards.map((card) => (
          <StatCard key={card.label} {...card} />
        ))}
      </div>
    </div>
  );
}

function StatCard({ label, value, color, oklch }: { label: string; value: string; color: string; oklch: string }) {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="rounded-lg p-4 space-y-1 transition-all duration-200 cursor-default"
      style={{
        backgroundColor: `oklch(${oklch} / ${hovered ? "28%" : "18%"})`,
        border: `1px solid oklch(${oklch} / ${hovered ? "55%" : "28%"})`,
        boxShadow: hovered ? `0 0 16px oklch(${oklch} / 25%)` : "none",
        transform: hovered ? "translateY(-1px)" : "none",
      }}
    >
      <p className="text-xs tracking-widest uppercase text-muted-foreground">{label}</p>
      <p className="text-2xl font-bold transition-colors" style={{ color }}>{value}</p>
    </div>
  );
}
