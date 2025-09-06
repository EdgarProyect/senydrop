const axios = require('axios');
require('dotenv').config();
const { log } = require('../utils/logger');

const ML_API = 'https://api.mercadolibre.com';

async function refreshAccessToken() {
  const data = new URLSearchParams();
  data.append('grant_type', 'refresh_token');
  data.append('client_id', process.env.ML_CLIENT_ID);
  data.append('client_secret', process.env.ML_CLIENT_SECRET);
  data.append('refresh_token', process.env.ML_REFRESH_TOKEN);

  const resp = await axios.post(`${ML_API}/oauth/token`, data.toString(), {
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
  });
  log('ML token refreshed');
  return resp.data;
}

async function createOrUpdateItem(product) {
  try {
    const token = process.env.ML_ACCESS_TOKEN;
    if (!token) throw new Error('ML_ACCESS_TOKEN missing in .env');

    const itemPayload = {
      title: product.title,
      category_id: "MLA3530",
      price: product.price,
      currency_id: "ARS",
      available_quantity: product.stock,
      buying_mode: "buy_it_now",
      listing_type_id: "gold_special",
      condition: "new",
      description: { plain_text: product.description },
      pictures: (JSON.parse(product.images || '[]')).map(url => ({ source: url }))
    };

    if (product.ml_item_id) {
      const resp = await axios.put(`${ML_API}/items/${product.ml_item_id}?access_token=${token}`, itemPayload);
      log('Updated ML item', resp.data.id || product.ml_item_id);
      return resp.data;
    } else {
      const resp = await axios.post(`${ML_API}/items?access_token=${token}`, itemPayload);
      log('Created ML item', resp.data.id);
      return resp.data;
    }
  } catch (err) {
    log('ML error', err.response ? err.response.data : err.message);
    throw err;
  }
}

module.exports = { refreshAccessToken, createOrUpdateItem };