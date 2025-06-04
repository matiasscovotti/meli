"use client";
import { useState, useEffect } from "react";
import {
  Table,
  TableHeader,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";

type Product = {
  id?: string;
  title: string;
  price: number;
};

export default function Home() {
  const [token, setToken] = useState("");
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    fetch("/api/products")
      .then((res) => res.json())
      .then(setProducts)
      .catch(console.error);
  }, []);

  const handleChange = (
    index: number,
    field: keyof Product,
    value: string | number,
  ) => {
    const updated = [...products];
    (updated[index] as any)[field] = value;
    setProducts(updated);
  };

  const handleSync = async (product: Product, index: number) => {
    const res = await fetch("/api/update", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ access_token: token, product }),
    });
    if (!res.ok) {
      alert("Error syncing product");
      return;
    }
    const data = await res.json();
    const updated = [...products];
    updated[index].id = data.id;
    setProducts(updated);
  };

  return (
    <div className="max-w-3xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">MercadoLibre Sync</h1>
      <div className="flex gap-2 mb-4">
        <input
          type="text"
          placeholder="Access token"
          className="flex-1 border rounded px-2 py-1"
          value={token}
          onChange={(e) => setToken(e.target.value)}
        />
      </div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>ID</TableHead>
            <TableHead>Title</TableHead>
            <TableHead>Price</TableHead>
            <TableHead></TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {products.map((p, idx) => (
            <TableRow key={idx}>
              <TableCell>{p.id || "-"}</TableCell>
              <TableCell>
                <input
                  type="text"
                  value={p.title}
                  onChange={(e) => handleChange(idx, "title", e.target.value)}
                  className="border rounded px-2 py-1 w-full"
                />
              </TableCell>
              <TableCell>
                <input
                  type="number"
                  value={p.price}
                  onChange={(e) =>
                    handleChange(idx, "price", Number(e.target.value))
                  }
                  className="border rounded px-2 py-1 w-full"
                />
              </TableCell>
              <TableCell>
                <Button onClick={() => handleSync(p, idx)}>Sync</Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
