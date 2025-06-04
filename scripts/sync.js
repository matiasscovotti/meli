const fs = require('fs/promises');
// You can point to the sandbox or production API
const API_BASE = process.env.ML_API_BASE || 'https://api.mercadolibre.com';

async function authHeaders(token) {
  return {
    'Authorization': `Bearer ${token}`,
    'Content-Type': 'application/json'
  };
}

async function createProduct(token, product) {
  const res = await fetch(`${API_BASE}/items`, {
    method: 'POST',
    headers: await authHeaders(token),
    body: JSON.stringify(product)
  });
  if (!res.ok) {
    const text = await res.text();
    throw new Error(`Create failed: ${res.status} ${text}`);
  }
  return res.json();
}

async function updateProduct(token, id, product) {
  const res = await fetch(`${API_BASE}/items/${id}`, {
    method: 'PUT',
    headers: await authHeaders(token),
    body: JSON.stringify(product)
  });
  if (!res.ok) {
    const text = await res.text();
    throw new Error(`Update failed: ${res.status} ${text}`);
  }
  return res.json();
}

async function main() {
  const token = process.env.ML_ACCESS_TOKEN;
  if (!token) {
    console.error('ML_ACCESS_TOKEN environment variable is required.');
    console.error('Consulta el README para obtener un token de testeo.');
    process.exit(1);
  }
  const data = await fs.readFile('products.json', 'utf8');
  const products = JSON.parse(data);
  for (const p of products) {
    try {
      let result;
      if (p.id) {
        result = await updateProduct(token, p.id, p);
      } else {
        result = await createProduct(token, p);
        p.id = result.id;
      }
      console.log('Synced product', result.id);
    } catch (err) {
      console.error('Error syncing product', p.id || p.title, err.message);
    }
  }
  await fs.writeFile('products_synced.json', JSON.stringify(products, null, 2));
}

main().catch(err => {
  console.error(err);
  process.exit(1);
});
