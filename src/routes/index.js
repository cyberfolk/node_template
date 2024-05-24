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

router.get("/session-info", (req, res) => {
  const sessionInfoObj = {
    "req.session.id": req.session.id,
    "req.sessionID": req.sessionID,
    "req.cookies['connect.sid']": req.cookies['connect.sid'],
    "req.session": req.session
  };

  const sessionInfoStr = JSON.stringify(sessionInfoObj, null, 2);
  res.render('./session-info', {
    title: 'Session-Info', sessionInfo: sessionInfoStr, layout: 'layouts/main-layout'
  });
})

// Middleware "catch-all" per gestire le rotte non definite
router.use((req, res, next) => {
  reqStr = `${req.method} ${req.url}`;
  res.render('./404', { title: '404', reqStr: reqStr, layout: 'layouts/main-layout' });
})
module.exports = router;
