const Router = require('express').Router;
const router = new Router();
const getLatestStatus = require('../lib/getLatestStatus');

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
      isBrowser: item.isBrowser,
      isAlive: item.isAlive,
      bytesRead: item._socket.bytesRead,
      bytesWritten: item._socket.bytesWritten,
      remoteAddress: item._socket.remoteAddress,
      remotePort: item._socket.remotePort,
      remotrHost: `${item._socket.remoteAddress}:${item._socket.remotePort}`,
      protocolVersion: item.protocolVersion,
      bytesReceived: item.bytesReceived,
    });
  });
  res.json(clients);
});

module.exports = router;