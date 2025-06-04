# MercadoLibre Product Sync

Este repositorio incluye una interfaz web desarrollada en **Next.js** (TypeScript) que permite sincronizar productos con una cuenta de MercadoLibre. La interfaz utiliza los componentes de **shadcn** y se encuentra en la carpeta `frontend`.

## Requisitos

- Node.js 18+
- npm

## Uso de la interfaz web

Instala las dependencias y ejecuta el servidor de desarrollo:

```bash
cd frontend
npm install
npm run dev
```

Al abrir la aplicación podrás introducir tu `access_token`, ver el listado de productos definido en `frontend/data/products.json` y sincronizarlos con MercadoLibre.

## Script de sincronización por CLI

Si prefieres ejecutar la sincronización desde la línea de comandos, puedes usar el script en `scripts/sync.js`:

```bash
ML_ACCESS_TOKEN=token node scripts/sync.js
```

Recuerda que debes proporcionar tu `access_token` a través de la variable de entorno `ML_ACCESS_TOKEN`.

## Notas

La aplicación usa un pequeño archivo `icon.svg` como favicon en lugar de `favicon.ico` para evitar incluir archivos binarios en el repositorio.
