import { NextResponse } from "next/server";
import { plaidClient } from "@/lib/plaid";
import { CountryCode, Products } from "plaid";

export async function POST() {
  const response = await plaidClient.linkTokenCreate({
    user: { client_user_id: "mai-mony-user" },
    client_name: "Mai Mony",
    products: [Products.Transactions, Products.Investments],
    country_codes: [CountryCode.Us],
    language: "en",
  });

  return NextResponse.json(response.data);
}
