import { NextRequest, NextResponse } from "next/server";
import { plaidClient } from "@/lib/plaid";

// In-memory store for dev/sandbox — survives hot reloads, resets on server restart
const devStore: { access_token?: string; item_id?: string } = {};

export async function POST(request: NextRequest) {
  const { public_token } = await request.json();

  const response = await plaidClient.itemPublicTokenExchange({ public_token });
  const { access_token, item_id } = response.data;

  devStore.access_token = access_token;
  devStore.item_id = item_id;

  return NextResponse.json({ access_token, item_id });
}

export async function GET() {
  if (!devStore.access_token) {
    return NextResponse.json({ error: "No access token stored" }, { status: 404 });
  }
  return NextResponse.json(devStore);
}
