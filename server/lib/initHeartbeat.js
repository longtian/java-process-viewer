const debug = require('debug')('wss');

/**
 * init ping pong check for all clients
 *
 * @param {WebsocketServer}webSocketServer
 * @param {number} interval
 * @returns {number}
 */
const initHeartbeat = (webSocketServer, interval) => {
  const heartbeat = ws => {
    if (ws.isAlive === false) {
      // connection lost
      return ws.terminate();
    }
    ws.isAlive = false;
    ws.ping('', false, true);
  };

  // ping all clients regularly
  const timerId = setInterval(() => {
    webSocketServer.clients.forEach(heartbeat);
  }, interval);

  debug(`heartbeat is set at interval ${interval}`);
  return timerId;
};

module.exports = initHeartbeat;