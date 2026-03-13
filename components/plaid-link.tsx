"use client";

import { useCallback, useEffect, useState } from "react";
import { usePlaidLink } from "react-plaid-link";

export function PlaidLink() {
  const [linkToken, setLinkToken] = useState<string | null>(null);
  const [accessToken, setAccessToken] = useState<string | null>(null);
  const [rawData, setRawData] = useState<Record<string, unknown> | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const inspectToken = useCallback(async (token: string) => {
    setLoading(true);
    const inspect = await fetch("/api/plaid/inspect", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ access_token: token }),
    });
    const text = await inspect.text();
    try {
      setRawData(JSON.parse(text));
    } catch {
      setError(`Inspect failed: ${text}`);
    }
    setLoading(false);
  }, []);

  useEffect(() => {
    // Load stored token (survives page refresh without reconnecting)
    fetch("/api/plaid/exchange-token")
      .then((r) => r.json())
      .then((d) => {
        if (d.access_token) {
          setAccessToken(d.access_token);
          return inspectToken(d.access_token);
        }
      })
      .catch(() => {/* no stored token */});

    fetch("/api/plaid/create-link-token", { method: "POST" })
      .then((r) => r.json())
      .then((d) => {
        if (d.link_token) {
          setLinkToken(d.link_token);
        } else {
          setError(JSON.stringify(d));
        }
      })
      .catch((e) => setError(String(e)));
  }, [inspectToken]);

  const onSuccess = useCallback(async (public_token: string) => {
    setLoading(true);
    const res = await fetch("/api/plaid/exchange-token", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ public_token }),
    });
    const { access_token } = await res.json();
    setAccessToken(access_token);
    await inspectToken(access_token);
  }, [inspectToken]);

  const { open, ready } = usePlaidLink({ token: linkToken, onSuccess });

  return (
    <div className="space-y-4">
      <button
        onClick={() => open()}
        disabled={!ready || loading}
        className="px-4 py-2 rounded text-xs tracking-widest uppercase font-semibold transition disabled:opacity-50"
        style={{ backgroundColor: "oklch(0.82 0.09 293 / 20%)", border: "1px solid oklch(0.82 0.09 293 / 40%)", color: "#C4B5FD" }}
      >
        {loading ? "Loading..." : "Connect Account"}
      </button>

      {error && (
        <p className="text-xs text-destructive">Error: {error}</p>
      )}

      {!linkToken && !error && (
        <p className="text-xs text-muted-foreground">Loading link token...</p>
      )}

      {accessToken && (
        <p className="text-xs text-muted-foreground">
          Access token: <span className="text-secondary">{accessToken.slice(0, 20)}...</span>
        </p>
      )}

      {rawData && (
        <pre className="text-xs text-muted-foreground bg-muted rounded p-4 overflow-auto max-h-96">
          {JSON.stringify(rawData, null, 2)}
        </pre>
      )}
    </div>
  );
}
