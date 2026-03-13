"use client";

import { useState, FormEvent, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";

export default function LoginPage() {
  return (
    <Suspense>
      <LoginForm />
    </Suspense>
  );
}

function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const from = searchParams.get("from") ?? "/";

  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await fetch("/api/auth", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      });

      if (!res.ok) {
        setError("Wrong password.");
        return;
      }

      router.push(from);
      router.refresh();
    } catch {
      setError("Something went wrong.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="min-h-screen flex items-center justify-center">
      <div className="w-full max-w-sm space-y-8 px-4">
        {/* Logo / title */}
        <div className="text-center space-y-1">
          <h1 className="text-3xl font-bold text-primary text-glow-lavender tracking-widest uppercase">
            Mai Mony
          </h1>
          <p className="text-muted-foreground text-sm tracking-wider">
            personal finance terminal
          </p>
        </div>

        {/* Login card */}
        <form
          onSubmit={handleSubmit}
          className="border border-border rounded-lg p-6 space-y-4 bg-card glow-lavender"
        >
          <div className="space-y-2">
            <label
              htmlFor="password"
              className="block text-xs tracking-widest uppercase text-muted-foreground"
            >
              Access Code
            </label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              autoFocus
              className="w-full bg-background border border-input rounded px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-ring transition"
              placeholder="••••••••"
            />
          </div>

          {error && (
            <p className="text-destructive text-xs">{error}</p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-primary text-primary-foreground rounded px-4 py-2 text-sm font-semibold tracking-widest uppercase hover:opacity-90 disabled:opacity-50 transition glow-lavender"
          >
            {loading ? "Authenticating..." : "Enter"}
          </button>
        </form>
      </div>
    </main>
  );
}
