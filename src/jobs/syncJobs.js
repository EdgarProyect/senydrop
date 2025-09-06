const cron = require('node-cron');
const { Product } = require('../models');
const { createOrUpdateProduct } = require('../services/woocommerceService');
const { createOrUpdateItem } = require('../services/mercadolibreService');
const { log } = require('../utils/logger');

async function syncAllNow() {
  log('Starting full sync...');
  const products = await Product.findAll();
  for (const p of products) {
    try {
      const wcData = await createOrUpdateProduct(p);
      if (wcData && wcData.id) {
        await p.update({ wc_product_id: String(wcData.id) });
      }
    } catch (e) {
      log('WC sync failed for', p.sku, e.message || e);
    }

    try {
      const mlData = await createOrUpdateItem(p);
      if (mlData && mlData.id) {
        await p.update({ ml_item_id: String(mlData.id) });
      }
    } catch (e) {
      log('ML sync failed for', p.sku, e.message || e);
    }
  }
  log('Full sync finished.');
}

function startCron() {
  cron.schedule('*/5 * * * *', () => {
    log('Cron triggered: syncAllNow');
    syncAllNow();
  });
  log('Sync cron scheduled: every 5 minutes');
}

if (require.main === module) {
  (async () => {
    await syncAllNow();
    process.exit(0);
  })();
}

module.exports = { startCron, syncAllNow };