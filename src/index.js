require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { syncDb } = require('./models');
const productsRouter = require('./routes/products');
const { startCron } = require('./jobs/syncJobs');
const { log } = require('./utils/logger');

const app = express();
app.use(cors());
app.use(express.json());

app.use('/api/products', productsRouter);

const PORT = process.env.PORT || 3000;

(async () => {
  await syncDb();
  app.listen(PORT, () => {
    log(`Senydrop API listening on http://localhost:${PORT}`);
  });
  startCron();
})();