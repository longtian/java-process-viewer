const WebSocket = require('ws');
const debug = require('debug')('wss');
const CONSTANTS = require('../constants');

/**
 *
 * @param {HttpServer} server
 * @returns {WebSocket.Server}
 */
const createWSServer = (server) => {
  const wss = new WebSocket.Server({
    server,
    path: '/ws'
  });
  wss.on('connection', (ws, req) => {
    const remoteAddress = req.connection.remoteAddress;
    debug(`new connection from ${remoteAddress}`);
    ws.info = {
      headers: req.headers
    };
    ws.isBrowser = !!req.headers['user-agent'];
    ws.isAlive = true;
    ws.on('pong', () => {
      ws.isAlive = true;
    });
    ws.on('message', (msg) => {
      debug(`message from ${remoteAddress} :${msg}`);
      try {
        const {
          type,
          payload
        } = JSON.parse(msg);
        switch (type) {
          // forward command to execute to remote host
          case CONSTANTS.EXEC:
            wss.clients.forEach(client => {
              if (!client.isBrowser && client._socket.remoteAddress === payload.host) {
                client.send(msg);
              }
            });
            break;
          // forward execution result to all browsers
          case CONSTANTS.EXEC_RESULT:
            wss.clients.forEach(client => {
              if (client.isBrowser) {
                client.send(msg);
              }
            });
            break;
          default:
            debug('unknown message');
        }
      } catch (e) {
        debug(e);
      }
    });
  });
  return wss;
};

module.exports = createWSServer;