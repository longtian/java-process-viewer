const express = require('express');
const assert = require('assert');
const morgan = require('morgan');
const path = require('path');
const http = require('http');
const WebSocket = require('ws');
const WS_HEARTBEAT = 1000;

assert.ok(process.env.ES, 'ES host must be provided');

const apiRouter = require('./route/api');

const app = express();

if (process.env.NODE_ENV !== 'production') {
  const webpackMiddleWare = require('./middleware/webpack');
  app.use(webpackMiddleWare)
} else {
  app.use(express.static(path.join(__dirname, 'dist')));
}


app.set('view engine', 'ejs');
app.use(morgan('dev'));

app.use('/api', apiRouter);

app.get('/', (req, res) => {
  res.render('home');
});

const server = http.createServer(app);
const wss = new WebSocket.Server({
  server
});

app.get('/clients', (req, res) => {
  const clients = [];
  wss.clients.forEach(item => {
    clients.push(item.info);
  });
  res.json(clients);
});

const getPrimativeProperties = obj => {
  const result = {};
  for (let i in obj) {
    if (typeof obj[i] !== 'object') {
      result[i] = obj[i]
    }
  }
  return result;
}

wss.on('connection', (ws, req) => {
  const remoteAddress = req.connection.remoteAddress;
  console.log(`new connection from ${remoteAddress}`);
  ws.info = {
    headers: req.headers,
    socket: getPrimativeProperties(ws._socket),
    ws: getPrimativeProperties(ws),
  };
  ws.isAlive = true;
  ws.on('pong', () => {
    ws.isAlive = true;
  });
  ws.on('message', (msg) => {
    console.log(`message from ${remoteAddress} :${msg}`);
    try {
      const payload = JSON.parse(msg);
      if (payload.command && payload.host) {
        wss.clients.forEach(item => {
          if (!item.info.headers['user-agent'] && item.info.socket.remoteAddress === payload.host) {
            item.send(msg);
          }
        })
      } else if (payload.result) {
        console.log('send to browser');
        wss.clients.forEach(item => {
          if (item.info.headers['user-agent']) {
            item.send(msg);
          }
        })
      }
    } catch (e) {
      console.error(e);
    }
  });
});


// ping all clients
setInterval(() => {
  wss.clients.forEach(ws => {
    if (ws.isAlive === false) {
      // connection lost
      return ws.terminate();
    }
    ws.isAlive = false;
    ws.ping('', false, true);
  })
}, WS_HEARTBEAT);

// ipv4 only
server.listen(3000, '0.0.0.0');

['SIGINT', 'SIGTERM'].forEach(signal => {
  process.on(signal, () => {
    process.exit(0)
  });
});
