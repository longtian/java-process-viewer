const express = require('express');
const assert = require('assert');
const morgan = require('morgan');
const path = require('path');
const http = require('http');

// constants
const WS_HEARTBEAT = 1000;
assert.ok(process.env.ES, 'ES host must be provided');

const initHeartbeat = require('./lib/initHeartbeat');
const createWSServer = require('./lib/createWSServer');
const apiRouter = require('./route/api');

// app
const app = express();
const server = http.createServer(app);
const wss = createWSServer(server);

app.set('wss', wss);
app.set('view engine', 'ejs');
if (process.env.NODE_ENV !== 'production') {
  const webpackMiddleWare = require('./middleware/webpack');
  app.use(webpackMiddleWare)
} else {
  app.use(express.static(path.join(__dirname, 'dist')));
}
app.use(morgan('dev'));
app.use('/api', apiRouter);
app.get('/', (req, res) => {
  res.render('home');
});

// ipv4 only
server.listen(3000, '0.0.0.0');
initHeartbeat(wss, WS_HEARTBEAT);

// signals
['SIGINT', 'SIGTERM'].forEach(signal => {
  process.on(signal, () => {
    process.exit(0)
  });
});
