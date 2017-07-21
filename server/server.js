const express = require('express');
const assert = require('assert');
const morgan = require('morgan');
const path = require('path');

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

app.listen(3000);
