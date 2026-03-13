import { BRAND_COLORS } from "@/lib/constants";
import { PlaidLink } from "@/components/plaid-link";

const cards = [
  { label: "Spending",    value: "—", color: BRAND_COLORS.lavender, oklch: "0.82 0.09 293" },
  { label: "Investments", value: "—", color: BRAND_COLORS.green,    oklch: "0.90 0.09 155" },
  { label: "Net Worth",   value: "—", color: BRAND_COLORS.blue,     oklch: "0.87 0.06 215" },
  { label: "Budgets",     value: "—", color: BRAND_COLORS.yellow,   oklch: "0.92 0.08 95"  },
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
        {cards.map(({ label, value, color, oklch }) => (
          <div
            key={label}
            className="stat-card rounded-lg p-4 space-y-1 cursor-default"
            style={{
              "--c": oklch,
              backgroundColor: `oklch(${oklch} / 18%)`,
              border: `1px solid oklch(${oklch} / 28%)`,
            } as React.CSSProperties}
          >
            <p className="text-xs tracking-widest uppercase text-muted-foreground">{label}</p>
            <p className="text-2xl font-bold" style={{ color }}>{value}</p>
          </div>
        ))}
      </div>

      <div>
        <h3 className="text-xs tracking-widest uppercase text-muted-foreground mb-3">Connect Account</h3>
        <PlaidLink />
      </div>
    </div>
  );
}
