'use strict';

const router = require('express').Router();
const controller = require('../controllers/masterData');

router.post('/', controller.create);

router.get('/:id', controller.read);

router.get('/:id/mapping', controller.getMappedId);

router.get('/', controller.readAll);

router.put('/:id', controller.update);

router.delete('/:id', controller.remove);

module.exports = router;