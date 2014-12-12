var express = require('express');
var router = express.Router();
var controller = require('../controllers/levels');

/* GET users listing. */
router.get('/',       controller.index);
router.get('/:id',    controller.show);
router.post('/',      controller.create);
router.delete('/:id', controller.delete);

module.exports = router;
