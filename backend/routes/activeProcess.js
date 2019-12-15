'use strict';

const router = require('express').Router();
const controller = require('../controllers/activeProcess');

router.post('/', controller.create);

router.get('/:_id', controller.read);

router.get('/', controller.readAll);

router.put('/:_id', controller.update);

router.delete('/:_id', controller.remove);

router.delete('/', controller.removeAll);

module.exports = router;