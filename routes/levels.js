var express = require('express');
var router = express.Router();
var controller = require('../controllers/levels');

/* GET users listing. */
router.get('/',  controller.index);
router.post('/', controller.create);

module.exports = router;
