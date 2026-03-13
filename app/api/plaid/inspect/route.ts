import { NextRequest, NextResponse } from "next/server";
import { plaidClient } from "@/lib/plaid";

type PlaidResult<T> = { data: T } | { error: string };

// Temporary endpoint — inspect raw Plaid data to inform schema design
export async function POST(request: NextRequest) {
  const { access_token } = await request.json();

  const wrap = <T>(p: Promise<T>): Promise<PlaidResult<T>> =>
    p.then((data) => ({ data })).catch((e) => ({
      error: JSON.stringify(e?.response?.data ?? e?.message ?? String(e)),
    }));

  const [transactionsRes, accountsRes, holdingsRes] = await Promise.all([
    wrap(plaidClient.transactionsSync({ access_token })),
    wrap(plaidClient.accountsGet({ access_token })),
    wrap(plaidClient.investmentsHoldingsGet({ access_token })),
  ]);

  return NextResponse.json({
    accounts: "data" in accountsRes ? accountsRes.data.data.accounts : null,
    accounts_error: "error" in accountsRes ? accountsRes.error : null,
    transactions: "data" in transactionsRes ? transactionsRes.data.data.added.slice(0, 5) : null,
    total_transactions: "data" in transactionsRes ? transactionsRes.data.data.added.length : null,
    transactions_error: "error" in transactionsRes ? transactionsRes.error : null,
    holdings: "data" in holdingsRes ? holdingsRes.data.data.holdings : null,
    securities: "data" in holdingsRes ? holdingsRes.data.data.securities : null,
    holdings_error: "error" in holdingsRes ? holdingsRes.error : null,
  });
}
