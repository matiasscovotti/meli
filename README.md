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

Al abrir la aplicación podrás introducir tu `access_token`, ver el listado de productos definido en `frontend/data/products.json` y sincronizarlos con MercadoLibre. Para pruebas iniciales puedes utilizar un **token de testeo**.

## Obtener un token de testeo

1. Ingresa a la [consola de desarrolladores de MercadoLibre](https://developers.mercadolibre.com.ar/) y crea una aplicación si aún no la tienes.
2. Dentro de tu aplicación genera un *usuario de prueba*.
3. Con el `APP_ID` y `APP_SECRET` de tu aplicación solicita el token ejecutando:

   ```bash
   curl -X POST "https://api.mercadolibre.com/oauth/token" \
     -d "grant_type=client_credentials" \
     -d "client_id=APP_ID" \
     -d "client_secret=APP_SECRET"
   ```

El comando devolverá un JSON con el campo `access_token` que podrás usar en esta aplicación o en el script CLI.

## Script de sincronización por CLI

Si prefieres ejecutar la sincronización desde la línea de comandos, puedes usar el script en `scripts/sync.js`:

```bash
ML_ACCESS_TOKEN=token_de_prueba node scripts/sync.js
```

Recuerda que debes proporcionar tu `access_token` (puede ser el token de testeo) a través de la variable de entorno `ML_ACCESS_TOKEN`.

## Notas

La aplicación usa un pequeño archivo `icon.svg` como favicon en lugar de `favicon.ico` para evitar incluir archivos binarios en el repositorio.
