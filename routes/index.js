var models      = require('../models');
var express     = require('express');
var router      = express.Router();
var controller  = require('../controllers/levels');

/* GET home page. */
router.get('/', controller.index);

module.exports = router;
