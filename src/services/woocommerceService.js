const WooCommerceRestApi = require('@woocommerce/woocommerce-rest-api').default;
require('dotenv').config();
const { log } = require('../utils/logger');

const wc = new WooCommerceRestApi({
  url: process.env.WC_URL,
  consumerKey: process.env.WC_CONSUMER_KEY,
  consumerSecret: process.env.WC_CONSUMER_SECRET,
  version: 'wc/v3',
  queryStringAuth: true
});

const createOrUpdateProduct = async (product) => {
  try {
    const payload = {
      name: product.title,
      type: 'simple',
      regular_price: String(product.price),
      sku: product.sku,
      stock_quantity: product.stock,
      description: product.description,
      images: (JSON.parse(product.images || '[]')).map(url => ({ src: url }))
    };

    if (product.wc_product_id) {
      const resp = await wc.put(`products/${product.wc_product_id}`, payload);
      log('Updated WC product', resp.data.id);
      return resp.data;
    } else {
      const resp = await wc.post('products', payload);
      log('Created WC product', resp.data.id);
      return resp.data;
    }
  } catch (err) {
    log('WC error', err.response ? err.response.data : err.message);
    throw err;
  }
};

module.exports = { createOrUpdateProduct, wc };