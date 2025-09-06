# Senydrop Hub - Prototipo

## Setup
1. Clonar/crear carpeta y pegar archivos.
2. `npm install`
3. Editar `.env` y pegar WC keys y ML keys/tokens.
4. `npm run start` -> levanta API y cron (sync cada 5 minutos).
5. Para test manual: `npm run sync` ejecuta sincronización inmediato.

## Endpoints
- GET `/api/products` -> listar
- POST `/api/products` -> crear (body json: sku,title,description,price,stock,images[])
- PUT `/api/products/:sku` -> actualizar
