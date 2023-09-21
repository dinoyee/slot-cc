const { Router } = require('express');

const router = Router();

/* GET index page. */
router.get('/', (req, res) => {
  res.render('index', {
    title: 'Express'
  });
});

router.get('/cc', (req, res) => {
  res.render('canvas', {
    layout: false
  });
});

module.exports = router;
