var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/users', function(req, res, next) {
  res.send('Users');
});

router.get('/users/detail', function(req, res, next) {
  res.send('Detail');
});

module.exports = router;
