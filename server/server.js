const express = require('express');
const assert = require('assert');
const morgan = require('morgan');

assert.ok(process.env.ES, 'ES host must be provided');

const webpackMiddleWare = require('./middleware/webpack');
const apiRouter = require('./route/api');

const app = express();

app.set('view engine', 'ejs');
app.use(morgan('dev'));
app.use(webpackMiddleWare)

app.use('/api', apiRouter);

app.get('/', (req, res) => {
  res.render('home');
});

app.listen(3000);
