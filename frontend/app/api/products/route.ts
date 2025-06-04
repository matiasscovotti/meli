import { NextResponse } from "next/server";
import { promises as fs } from "fs";
import path from "path";

export async function GET() {
  const filePath = path.join(process.cwd(), "data", "products.json");
  const file = await fs.readFile(filePath, "utf8");
  const products = JSON.parse(file);
  return NextResponse.json(products);
}
