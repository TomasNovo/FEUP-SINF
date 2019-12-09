'use_strict'

const router = require('express').Router();
const controller = require('../controllers/company');

router.post('/', controller.create);
router.get('/:id', controller.read);
router.get('/', controller.readAll);
router.put('/:id', controller.update);

module.exports = router;