var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res) {
  res.render('index', { title: 'Express' });
});

router.post('/url', function(req, res) {
  res.end(JSON.stringify(req.body));
});

module.exports = router;
