const port = process.env.PORT || 3000;
const http = require('http');
require('dotenv').config();
const { scheduleLiquidation } = require('./src/liquidation');
const { getPrices, schedulePricing } = require('./src/pricing');

scheduleLiquidation();
schedulePricing();

const server = http.createServer(async (req, res) => {
  console.log(`${new Date().toISOString()} | ${req.method} ${req.url}`);
  if (req.url === '/asset_prices') {
    const headers = {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'OPTIONS, GET',
      'Access-Control-Max-Age': 2592000,
      'Content-Type': 'application/json'
    };
    res.writeHead(200, headers);
    res.end(JSON.stringify(await getPrices()));
  }
  res.statusCode = 200;
  res.end();
});

server.listen(port);
console.log(`Simple Price Feed API server listening on ${port}`)