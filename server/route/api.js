const Router = require('express').Router;
const router = new Router();
const getLatestStatus = require('../lib/getLatestStatus');
const getPrimativeProperties = require('../lib/getPrimativeProperties');

router.get('/hosts', (req, res) => {
  getLatestStatus()
    .then(data => {
      res.json(data)
    });
});

router.get('/clients', (req, res) => {
  const clients = [];
  const wss = req.app.get('wss');
  wss.clients.forEach(item => {
    clients.push({
      headers: item.info.headers,
      socket: getPrimativeProperties(item._socket),
      ws: getPrimativeProperties(item),
    });
  });
  res.json(clients);
});

module.exports = router;