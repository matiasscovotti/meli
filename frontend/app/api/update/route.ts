import { NextResponse } from "next/server";

const API_BASE = "https://api.mercadolibre.com";

export async function POST(req: Request) {
  const { access_token, product } = await req.json();
  if (!access_token) {
    return NextResponse.json({ error: "access_token required" }, { status: 400 });
  }

  const headers = {
    Authorization: `Bearer ${access_token}`,
    "Content-Type": "application/json",
  };

  const url = product.id
    ? `${API_BASE}/items/${product.id}`
    : `${API_BASE}/items`;
  const method = product.id ? "PUT" : "POST";

  const res = await fetch(url, {
    method,
    headers,
    body: JSON.stringify(product),
  });
  const data = await res.json();

  return NextResponse.json(data, { status: res.status });
}
