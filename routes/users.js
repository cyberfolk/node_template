var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/dashboard', function (req, res) {
  res.send('dashboard');
});

router.get('/dashboard2', function (req, res) {
  res.send('dashboard2');
});

module.exports = router;
