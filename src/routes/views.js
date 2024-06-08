var express = require('express');
var router = express.Router();

router.get('/', (req, res) => {
  res.render('home', { title: 'Home', layout: 'layouts/main' });
});

router.get('/home', (req, res) => {
  res.render('home', { title: 'Home', layout: 'layouts/main' });
});

router.get('/about', (req, res) => {
  res.render('about', { title: 'About', layout: 'layouts/main' });
});

router.get("/session-info", (req, res) => {
  const info = {
    "req.session.id": req.session.id,
    "req.sessionID": req.sessionID,
    "req.cookies['connect.sid']": req.cookies['connect.sid'],
    "req.session": req.session
  };

  const strInfo = JSON.stringify(info, null, 2);
  res.render('session-info', { title: 'Session-Info', sessionInfo: strInfo, layout: 'layouts/main' });
})

module.exports = router;
