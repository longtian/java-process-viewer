const Router = require('express').Router;
const router = new Router();
const getLatestStatus = require('../lib/getLatestStatus');

router.get('/hosts', (req, res) => {
  getLatestStatus()
    .then(data => {
      res.json(data)
    });
});

module.exports = router;