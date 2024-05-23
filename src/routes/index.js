var express = require('express');
var router = express.Router();

router.get('/', (req, res) => {
  res.render('home', { title: 'Home', layout: 'layouts/main-layout' });
});

router.get('/home', (req, res) => {
  res.render('home', { title: 'Home', layout: 'layouts/main-layout' });
});

router.get('/about', (req, res) => {
  res.render('about', { title: 'About', layout: 'layouts/main-layout' });
});

module.exports = router;
