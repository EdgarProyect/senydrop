const express = require('express');
const router = express.Router();
const { Product } = require('../models');
const { log } = require('../utils/logger');

router.get('/', async (req, res) => {
  const products = await Product.findAll();
  res.json(products);
});

router.post('/', async (req, res) => {
  try {
    const { sku, title, description, price, stock, images } = req.body;
    const p = await Product.create({
      sku, title, description, price, stock, images: JSON.stringify(images || [])
    });
    res.json(p);
  } catch (err) {
    log('err create product', err);
    res.status(500).json({ error: err.message });
  }
});

router.put('/:sku', async (req, res) => {
  const { sku } = req.params;
  const update = req.body;
  const p = await Product.findOne({ where: { sku } });
  if (!p) return res.status(404).json({ error: 'Not found' });
  await p.update(update);
  res.json(p);
});

module.exports = router;